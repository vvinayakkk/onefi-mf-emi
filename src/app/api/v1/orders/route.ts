import { NextRequest } from 'next/server';
import { z } from 'zod';
import { ResponseUtil } from '@/lib/responseUtil';
import { prisma } from '@/lib/prisma';
import { AppError, ERROR_REGISTRY } from '@/constants/errors';

const CreateOrderSchema = z.object({
  customerName: z.string().min(2, 'Name is required'),
  customerEmail: z.string().email('Valid email required'),
  customerPhone: z.string().min(10, 'Valid 10-digit mobile number required'),
  variantId: z.string().min(1, 'Product variant is required'),
  totalAmount: z.number().positive(),
  downPayment: z.number().min(0).default(0),
  tenureMonths: z.number().int().positive(),
  monthlyEmi: z.number().positive(),
  interestRate: z.number().min(0),
  cashback: z.number().min(0).default(0),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = CreateOrderSchema.parse(body);

    const orderNumber = `1FI-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;

    let createdOrder = null;
    try {
      if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('sample')) {
        createdOrder = await prisma.order.create({
          data: {
            orderNumber,
            customerName: validated.customerName,
            customerEmail: validated.customerEmail,
            customerPhone: validated.customerPhone,
            totalAmount: validated.totalAmount,
            downPayment: validated.downPayment,
            tenureMonths: validated.tenureMonths,
            monthlyEmi: validated.monthlyEmi,
            interestRate: validated.interestRate,
            cashback: validated.cashback,
            variantId: validated.variantId,
            status: 'APPROVED',
          },
        });
      }
    } catch (dbErr) {
      console.warn('[Order API] DB create failed, responding with in-memory order:', dbErr);
    }

    if (!createdOrder) {
      createdOrder = {
        id: `ord_${Date.now()}`,
        orderNumber,
        ...validated,
        status: 'APPROVED',
        createdAt: new Date().toISOString(),
      };
    }

    return ResponseUtil.success(createdOrder, 201);
  } catch (error) {
    return ResponseUtil.error(error);
  }
}
