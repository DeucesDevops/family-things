import type { Prisma } from '@prisma/client';
import { familyInclude } from './family.repository';

export type FamilyWithMembers = Prisma.FamilyGetPayload<{
  include: typeof familyInclude;
}>;

export function toFamilyResponse(family: FamilyWithMembers) {
  return {
    id: family.id,
    name: family.name,
    inviteCode: family.inviteCode,
    members: family.members.map((member) => ({
      id: member.user.id,
      name: member.user.name,
      email: member.user.email,
      role: member.role,
    })),
  };
}
