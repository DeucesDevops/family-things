import { ApiError } from '../../common/errors/ApiError';
import { createInviteCode } from '../../common/utils/invite-code';
import { eventBus } from '../../events/event-bus';
import { toFamilyResponse } from './family.mapper';
import { familyRepository } from './family.repository';
import type { CreateFamilyInput, JoinFamilyInput } from './family.schema';

export const familyService = {
  async requireCurrentFamily(userId: string) {
    const family = await familyRepository.findCurrentForUser(userId);

    if (!family) {
      throw ApiError.notFound('Create or join a family first');
    }

    return family;
  },

  async current(userId: string) {
    const family = await this.requireCurrentFamily(userId);
    return toFamilyResponse(family);
  },

  async create(userId: string, input: CreateFamilyInput) {
    let inviteCode = createInviteCode();

    for (let attempt = 0; attempt < 5; attempt += 1) {
      const existing = await familyRepository.existsByInviteCode(inviteCode);

      if (!existing) {
        const family = await familyRepository.createWithAdmin({
          name: input.name.trim(),
          inviteCode,
          userId,
        });

        eventBus.emit('family.created', {
          familyId: family.id,
          createdById: userId,
        });

        return toFamilyResponse(family);
      }

      inviteCode = createInviteCode();
    }

    throw ApiError.conflict('Could not generate a unique invite code');
  },

  async join(userId: string, input: JoinFamilyInput) {
    const inviteCode = input.inviteCode.trim().toUpperCase();
    const family = await familyRepository.findByInviteCode(inviteCode);

    if (!family) {
      throw ApiError.notFound('Invite code not found');
    }

    const updatedFamily = await familyRepository.addMember({
      familyId: family.id,
      userId,
    });

    return toFamilyResponse(updatedFamily);
  },
};
