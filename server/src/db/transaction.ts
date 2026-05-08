import type { Prisma } from '@prisma/client';
import { prisma } from './prisma';

export type TransactionClient = Prisma.TransactionClient;

export function inTransaction<T>(callback: (tx: TransactionClient) => Promise<T>) {
  return prisma.$transaction(callback);
}
