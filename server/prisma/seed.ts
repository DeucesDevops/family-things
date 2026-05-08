import { EventType, FamilyRole, PrismaClient, ReminderType } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function ensureSuggestion(input: {
  familyId: string;
  title: string;
  category: string;
  meta: string;
  rationale: string;
}) {
  const existing = await prisma.suggestion.findFirst({
    where: {
      familyId: input.familyId,
      title: input.title,
    },
  });

  if (existing) {
    return prisma.suggestion.update({
      where: {
        id: existing.id,
      },
      data: {
        category: input.category,
        meta: input.meta,
        rationale: input.rationale,
      },
    });
  }

  return prisma.suggestion.create({
    data: input,
  });
}

async function ensureEvent(input: {
  familyId: string;
  createdById: string;
  title: string;
  type: EventType;
  notes?: string;
  startsAt: Date;
}) {
  const existing = await prisma.familyEvent.findFirst({
    where: {
      familyId: input.familyId,
      createdById: input.createdById,
      title: input.title,
    },
  });

  if (existing) {
    return prisma.familyEvent.update({
      where: {
        id: existing.id,
      },
      data: {
        type: input.type,
        notes: input.notes,
        startsAt: input.startsAt,
      },
    });
  }

  return prisma.familyEvent.create({
    data: input,
  });
}

async function ensureReminder(input: {
  familyId: string;
  createdById: string;
  title: string;
  type: ReminderType;
  dueAt: Date;
  completed?: boolean;
}) {
  const existing = await prisma.reminder.findFirst({
    where: {
      familyId: input.familyId,
      createdById: input.createdById,
      title: input.title,
    },
  });

  if (existing) {
    return prisma.reminder.update({
      where: {
        id: existing.id,
      },
      data: {
        type: input.type,
        dueAt: input.dueAt,
        completed: input.completed ?? false,
      },
    });
  }

  return prisma.reminder.create({
    data: {
      ...input,
      completed: input.completed ?? false,
    },
  });
}

async function ensureWish(input: {
  familyId: string;
  createdById: string;
  recipientName: string;
  occasion: string;
  message: string;
}) {
  const existing = await prisma.wishDraft.findFirst({
    where: {
      familyId: input.familyId,
      createdById: input.createdById,
      recipientName: input.recipientName,
      occasion: input.occasion,
    },
  });

  if (existing) {
    return prisma.wishDraft.update({
      where: {
        id: existing.id,
      },
      data: {
        message: input.message,
      },
    });
  }

  return prisma.wishDraft.create({
    data: input,
  });
}

async function main() {
  const passwordHash = await bcrypt.hash('password123', 12);

  const [ama, kwame, nia, kofi] = await Promise.all([
    prisma.user.upsert({
      where: { email: 'demo@familythings.local' },
      update: {
        name: 'Ama Boateng',
        passwordHash,
      },
      create: {
        name: 'Ama Boateng',
        email: 'demo@familythings.local',
        passwordHash,
      },
    }),
    prisma.user.upsert({
      where: { email: 'kwame@familythings.local' },
      update: {
        name: 'Kwame Boateng',
        passwordHash,
      },
      create: {
        name: 'Kwame Boateng',
        email: 'kwame@familythings.local',
        passwordHash,
      },
    }),
    prisma.user.upsert({
      where: { email: 'nia@familythings.local' },
      update: {
        name: 'Nia Boateng',
        passwordHash,
      },
      create: {
        name: 'Nia Boateng',
        email: 'nia@familythings.local',
        passwordHash,
      },
    }),
    prisma.user.upsert({
      where: { email: 'kofi@familythings.local' },
      update: {
        name: 'Kofi Boateng',
        passwordHash,
      },
      create: {
        name: 'Kofi Boateng',
        email: 'kofi@familythings.local',
        passwordHash,
      },
    }),
  ]);

  const family = await prisma.family.upsert({
    where: {
      inviteCode: 'FT-DEMO',
    },
    update: {
      name: 'Boateng home',
    },
    create: {
      name: 'Boateng home',
      inviteCode: 'FT-DEMO',
    },
  });

  await Promise.all([
    prisma.familyMember.upsert({
      where: {
        familyId_userId: {
          familyId: family.id,
          userId: ama.id,
        },
      },
      update: {
        role: FamilyRole.ADMIN,
      },
      create: {
        familyId: family.id,
        userId: ama.id,
        role: FamilyRole.ADMIN,
      },
    }),
    prisma.familyMember.upsert({
      where: {
        familyId_userId: {
          familyId: family.id,
          userId: kwame.id,
        },
      },
      update: {
        role: FamilyRole.ADMIN,
      },
      create: {
        familyId: family.id,
        userId: kwame.id,
        role: FamilyRole.ADMIN,
      },
    }),
    prisma.familyMember.upsert({
      where: {
        familyId_userId: {
          familyId: family.id,
          userId: nia.id,
        },
      },
      update: {
        role: FamilyRole.MEMBER,
      },
      create: {
        familyId: family.id,
        userId: nia.id,
        role: FamilyRole.MEMBER,
      },
    }),
    prisma.familyMember.upsert({
      where: {
        familyId_userId: {
          familyId: family.id,
          userId: kofi.id,
        },
      },
      update: {
        role: FamilyRole.MEMBER,
      },
      create: {
        familyId: family.id,
        userId: kofi.id,
        role: FamilyRole.MEMBER,
      },
    }),
  ]);

  const now = Date.now();
  const day = 24 * 60 * 60 * 1000;

  await Promise.all([
    ensureSuggestion({
      familyId: family.id,
      title: 'Greenwich picnic trail',
      category: 'Outing',
      meta: 'Low cost · 42 min · Clear weather',
      rationale: 'Dry weather, short travel, and a low-cost weekend preference make this an easy yes for the weekend.',
    }),
    ensureSuggestion({
      familyId: family.id,
      title: 'Family movie night',
      category: 'Tonight',
      meta: 'At home · Snacks needed · Kofi pick',
      rationale: 'A low-energy evening plan that lets Kofi make the final pick and keeps travel off the table.',
    }),
    ensureSuggestion({
      familyId: family.id,
      title: 'Sunday roast booking',
      category: 'Meal',
      meta: 'Nana-friendly · 12:30 slot open',
      rationale: 'Easy timing, minimal prep, and a comfortable option when Nana is joining.',
    }),
  ]);

  await Promise.all([
    ensureEvent({
      familyId: family.id,
      createdById: ama.id,
      title: 'School drop-off',
      type: EventType.REMINDER,
      notes: 'Kwame driving, packed lunch checked.',
      startsAt: new Date(now + 2 * 60 * 60 * 1000),
    }),
    ensureEvent({
      familyId: family.id,
      createdById: kwame.id,
      title: "Dinner at Nana's",
      type: EventType.MEAL,
      notes: 'Bring plantain and the birthday card.',
      startsAt: new Date(now + 10 * 60 * 60 * 1000),
    }),
    ensureEvent({
      familyId: family.id,
      createdById: ama.id,
      title: 'Greenwich picnic trail',
      type: EventType.OUTING,
      notes: "Pack a blanket, fruit, and Kofi's scooter.",
      startsAt: new Date(now + 2 * day),
    }),
  ]);

  await Promise.all([
    ensureReminder({
      familyId: family.id,
      createdById: ama.id,
      title: 'Send best wishes to Auntie Jo',
      type: ReminderType.BIRTHDAY,
      dueAt: new Date(now + day),
    }),
    ensureReminder({
      familyId: family.id,
      createdById: kwame.id,
      title: 'Renew swimming bag kit',
      type: ReminderType.ERRAND,
      dueAt: new Date(now + 3 * day),
    }),
    ensureReminder({
      familyId: family.id,
      createdById: ama.id,
      title: 'Book dentist checkups',
      type: ReminderType.HEALTH,
      dueAt: new Date(now + 7 * day),
    }),
  ]);

  await Promise.all([
    ensureWish({
      familyId: family.id,
      createdById: ama.id,
      recipientName: 'Auntie Jo',
      occasion: 'Birthday',
      message:
        'Wishing you a bright birthday full of calm, laughter, and the people who make you feel most at home.',
    }),
    ensureWish({
      familyId: family.id,
      createdById: kwame.id,
      recipientName: 'Nana',
      occasion: 'Birthday',
      message: 'Hope today gives you space to rest, celebrate, and feel properly loved.',
    }),
    ensureWish({
      familyId: family.id,
      createdById: ama.id,
      recipientName: 'Grandad Kojo',
      occasion: 'Anniversary',
      message:
        'Happy anniversary from all of us. We are grateful for your warmth, your stories, and every table you make better.',
    }),
  ]);
}

main()
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
