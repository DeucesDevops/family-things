import { describe, expect, it } from 'vitest';
import { createInviteCode } from '../../src/common/utils/invite-code';

describe('createInviteCode', () => {
  it('creates a family invite code with the expected prefix and length', () => {
    const code = createInviteCode();

    expect(code).toMatch(/^FT-[A-Z2-9]{4}$/);
  });
});
