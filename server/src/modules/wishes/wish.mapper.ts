import type { WishDraft } from '@prisma/client';

export function toWishResponse(wish: WishDraft) {
  return {
    id: wish.id,
    recipientName: wish.recipientName,
    occasion: wish.occasion,
    message: wish.message,
    createdAt: wish.createdAt,
  };
}
