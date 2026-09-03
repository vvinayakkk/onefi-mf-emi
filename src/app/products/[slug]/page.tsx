import { notFound } from 'next/navigation';
import { ProductRepository } from '@/repositories/productRepository';
import { ProductDetailView } from '@/components/ProductDetailView';
import { Metadata } from 'next';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const product = await ProductRepository.findBySlug(slug);
    return {
      title: `${product.name} on EMI | 1Fi Mutual Fund Backed Plans`,
      description: `Get ${product.name} with 0% interest EMI backed by mutual funds. Instant digital approval and cashback.`,
    };
  } catch {
    return {
      title: 'Product Details | 1Fi Store',
    };
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  try {
    const product = await ProductRepository.findBySlug(slug);
    return <ProductDetailView product={product} />;
  } catch {
    notFound();
  }
}
