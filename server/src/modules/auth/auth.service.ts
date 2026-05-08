import { ApiError } from '../../common/errors/ApiError';
import { eventBus } from '../../events/event-bus';
import { toAuthResponse } from './auth.mapper';
import { authRepository } from './auth.repository';
import type { LoginInput, RegisterInput } from './auth.types';
import { createAccessToken } from './jwt.service';
import { passwordService } from './password.service';
import { refreshTokenService } from './refresh-token.service';

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export const authService = {
  async register(input: RegisterInput) {
    const email = normalizeEmail(input.email);
    const existing = await authRepository.findUserByEmail(email);

    if (existing) {
      throw ApiError.conflict('Email is already registered');
    }

    const passwordHash = await passwordService.hash(input.password);
    const user = await authRepository.createUser({
      name: input.name.trim(),
      email,
      passwordHash,
    });
    const token = createAccessToken({ sub: user.id, email: user.email, name: user.name });
    const refreshToken = await refreshTokenService.issue(user.id);

    eventBus.emit('user.registered', {
      userId: user.id,
      email: user.email,
      name: user.name,
    });

    return toAuthResponse(user, token, refreshToken);
  },

  async login(input: LoginInput) {
    const email = normalizeEmail(input.email);
    const user = await authRepository.findUserByEmail(email);

    if (!user || !(await passwordService.verify(input.password, user.passwordHash))) {
      throw ApiError.unauthorized('Invalid email or password');
    }

    const token = createAccessToken({ sub: user.id, email: user.email, name: user.name });
    const refreshToken = await refreshTokenService.issue(user.id);

    return toAuthResponse(user, token, refreshToken);
  },

  async logout(refreshToken?: string) {
    if (refreshToken) {
      await refreshTokenService.revoke(refreshToken);
    }
  },
};
