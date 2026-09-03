import { NextRequest } from 'next/server';
import { ProductRepository } from '@/repositories/productRepository';
import { ResponseUtil } from '@/lib/responseUtil';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || undefined;

    const products = await ProductRepository.findAll(category);
    return ResponseUtil.success(products);
  } catch (error) {
    return ResponseUtil.error(error);
  }
}
