import { ApiError } from '../../common/errors/ApiError';
import { eventBus } from '../../events/event-bus';
import { familyService } from '../families/family.service';
import { toSuggestionResponse } from './suggestion.mapper';
import { suggestionRepository } from './suggestion.repository';
import type { CreateSuggestionInput, UpdateSuggestionStatusInput } from './suggestion.schema';

async function toResponseWithVotes(suggestion: Awaited<ReturnType<typeof suggestionRepository.create>>) {
  const votes = await suggestionRepository.countPositiveVotes(suggestion.id);
  return toSuggestionResponse(suggestion, votes);
}

export const suggestionService = {
  async list(userId: string) {
    const family = await familyService.requireCurrentFamily(userId);
    const suggestions = await suggestionRepository.listByFamily(family.id);

    return Promise.all(suggestions.map(toResponseWithVotes));
  },

  async create(userId: string, input: CreateSuggestionInput) {
    const family = await familyService.requireCurrentFamily(userId);
    const suggestion = await suggestionRepository.create({
      ...input,
      familyId: family.id,
    });

    return toResponseWithVotes(suggestion);
  },

  async vote(userId: string, suggestionId: string) {
    const family = await familyService.requireCurrentFamily(userId);
    const suggestion = await suggestionRepository.findInFamily({
      id: suggestionId,
      familyId: family.id,
    });

    if (!suggestion) {
      throw ApiError.notFound('Suggestion not found');
    }

    await suggestionRepository.upsertVote({
      suggestionId,
      userId,
      positive: true,
    });

    eventBus.emit('suggestion.voted', {
      suggestionId,
      familyId: family.id,
      userId,
    });

    return toResponseWithVotes(suggestion);
  },

  async updateStatus(userId: string, suggestionId: string, input: UpdateSuggestionStatusInput) {
    const family = await familyService.requireCurrentFamily(userId);

    try {
      const suggestion = await suggestionRepository.updateStatus({
        id: suggestionId,
        familyId: family.id,
        status: input.status,
      });

      if (!suggestion) {
        throw ApiError.notFound('Suggestion not found');
      }

      return toResponseWithVotes(suggestion);
    } catch {
      throw ApiError.notFound('Suggestion not found');
    }
  },
};
