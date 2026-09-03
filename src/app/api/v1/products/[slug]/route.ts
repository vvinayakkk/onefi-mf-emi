import { NextRequest } from 'next/server';
import { ProductRepository } from '@/repositories/productRepository';
import { ResponseUtil } from '@/lib/responseUtil';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const product = await ProductRepository.findBySlug(slug);
    return ResponseUtil.success(product);
  } catch (error) {
    return ResponseUtil.error(error);
  }
}
