import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const getPrisma = (): PrismaClient | null => {
  if (typeof window !== 'undefined') return null;
  try {
    if (!globalForPrisma.prisma) {
      globalForPrisma.prisma = new PrismaClient({
        log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
      });
    }
    return globalForPrisma.prisma;
  } catch (err) {
    console.warn('Prisma client initialization skipped:', err);
    return null;
  }
};

export const prisma = getPrisma();
