import { aiClient } from '../../integrations/ai/ai.client';
import { eventBus } from '../../events/event-bus';
import { familyService } from '../families/family.service';
import { toWishResponse } from './wish.mapper';
import { wishRepository } from './wish.repository';
import type { CreateWishInput } from './wish.schema';

export const wishService = {
  async list(userId: string) {
    const family = await familyService.requireCurrentFamily(userId);
    const wishes = await wishRepository.listByFamily(family.id);
    return wishes.map(toWishResponse);
  },

  async create(userId: string, input: CreateWishInput) {
    const family = await familyService.requireCurrentFamily(userId);
    const message =
      input.message ??
      (await aiClient.draftWish({
        recipientName: input.recipientName,
        occasion: input.occasion,
        tone: input.tone,
      }));

    const wish = await wishRepository.create({
      ...input,
      message,
      familyId: family.id,
      createdById: userId,
    });

    eventBus.emit('wish.created', {
      wishId: wish.id,
      familyId: family.id,
      createdById: userId,
    });

    return toWishResponse(wish);
  },
};
