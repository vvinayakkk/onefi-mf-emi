import { NextRequest } from 'next/server';
import { z } from 'zod';
import { EmiCalculationService } from '@/services/emiService';
import { ResponseUtil } from '@/lib/responseUtil';

const CalculateEmiSchema = z.object({
  principalAmount: z.number().positive(),
  tenureMonths: z.number().int().min(1).max(120),
  annualInterestRate: z.number().min(0).max(100),
  downPayment: z.number().min(0).optional(),
  cashbackAmount: z.number().min(0).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = CalculateEmiSchema.parse(body);

    const breakdown = EmiCalculationService.calculate(validated);
    return ResponseUtil.success(breakdown);
  } catch (error) {
    return ResponseUtil.error(error);
  }
}
