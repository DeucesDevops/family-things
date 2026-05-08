import crypto from 'node:crypto';

const CODE_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

export function createInviteCode() {
  let code = 'FT-';

  for (let index = 0; index < 4; index += 1) {
    code += CODE_CHARS[crypto.randomInt(0, CODE_CHARS.length)];
  }

  return code;
}
