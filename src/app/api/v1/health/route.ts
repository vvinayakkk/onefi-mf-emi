import { ResponseUtil } from '@/lib/responseUtil';
import { prisma } from '@/lib/prisma';

export async function GET() {
  let dbStatus = 'disconnected (using resilient in-memory provider)';
  let latencyMs = 0;

  try {
    if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('sample')) {
      const start = Date.now();
      await prisma.$queryRaw`SELECT 1`;
      latencyMs = Date.now() - start;
      dbStatus = 'connected (PostgreSQL via Prisma)';
    }
  } catch (err) {
    dbStatus = `error: ${(err as Error).message}`;
  }

  return ResponseUtil.success({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    database: {
      status: dbStatus,
      latencyMs,
    },
    service: '1Fi SDE1 Mutual Fund Backed EMI Engine',
  });
}
