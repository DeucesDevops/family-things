import { ApiError } from '../../common/errors/ApiError';
import { userRepository } from './user.repository';
import { toUserResponse } from './user.mapper';
import type { UpdateMeInput } from './user.schema';

export const userService = {
  async getMe(userId: string) {
    const user = await userRepository.findById(userId);

    if (!user) {
      throw ApiError.notFound('User not found');
    }

    return toUserResponse(user);
  },

  async updateMe(userId: string, input: UpdateMeInput) {
    if (input.email) {
      const normalizedEmail = input.email.trim().toLowerCase();
      const existing = await userRepository.existsByEmail(normalizedEmail);

      if (existing && existing.id !== userId) {
        throw ApiError.conflict('Email is already registered');
      }

      input.email = normalizedEmail;
    }

    const user = await userRepository.update(userId, input);
    return toUserResponse(user);
  },
};
