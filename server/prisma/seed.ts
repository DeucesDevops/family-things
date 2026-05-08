import { PrismaClient, EventType, ReminderType } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('password123', 12);

  const user = await prisma.user.upsert({
    where: {
      email: 'demo@familythings.local',
    },
    update: {},
    create: {
      name: 'Demo Parent',
      email: 'demo@familythings.local',
      passwordHash,
    },
  });

  const family = await prisma.family.upsert({
    where: {
      inviteCode: 'FT-DEMO',
    },
    update: {},
    create: {
      name: 'Demo Family',
      inviteCode: 'FT-DEMO',
      members: {
        create: {
          userId: user.id,
          role: 'ADMIN',
        },
      },
      suggestions: {
        createMany: {
          data: [
            {
              title: 'Saturday museum visit',
              category: 'Outing',
              meta: 'Indoor · 35 min · Low stress',
              rationale: 'A weather-proof plan with easy transport and enough novelty for mixed ages.',
            },
            {
              title: 'Birthday video message',
              category: 'Wish',
              meta: '15 min · Everyone can join',
              rationale: 'Fast to prepare and easy for relatives who cannot attend in person.',
            },
          ],
        },
      },
    },
  });

  await prisma.familyMember.upsert({
    where: {
      familyId_userId: {
        familyId: family.id,
        userId: user.id,
      },
    },
    update: {},
    create: {
      familyId: family.id,
      userId: user.id,
      role: 'ADMIN',
    },
  });

  await prisma.familyEvent.create({
    data: {
      familyId: family.id,
      createdById: user.id,
      type: EventType.OUTING,
      title: 'Demo park walk',
      startsAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    },
  });

  await prisma.reminder.create({
    data: {
      familyId: family.id,
      createdById: user.id,
      type: ReminderType.GROOMING,
      title: 'Book haircut',
      dueAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    },
  });
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
