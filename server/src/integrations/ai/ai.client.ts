type WishDraftInput = {
  recipientName: string;
  occasion?: string;
  tone?: string;
};

export const aiClient = {
  async draftWish(input: WishDraftInput) {
    const occasion = input.occasion ?? 'a special day';
    const tone = input.tone ?? 'warm';

    return `Dear ${input.recipientName}, wishing you ${occasion} filled with love, laughter, and little moments that make the whole family smile. With ${tone} thoughts from all of us.`;
  },
};
