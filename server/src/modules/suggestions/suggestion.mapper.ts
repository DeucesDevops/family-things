import type { Suggestion } from '@prisma/client';

export function toSuggestionResponse(suggestion: Suggestion, votes: number) {
  return {
    id: suggestion.id,
    title: suggestion.title,
    category: suggestion.category,
    meta: suggestion.meta,
    rationale: suggestion.rationale,
    status: suggestion.status,
    votes,
    createdAt: suggestion.createdAt,
  };
}
