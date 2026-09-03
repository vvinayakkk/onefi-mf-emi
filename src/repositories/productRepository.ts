import { prisma } from '@/lib/prisma';
import { SEED_PRODUCTS, SeedProduct } from '@/data/seedData';
import { AppError, ERROR_REGISTRY } from '@/constants/errors';

export class ProductRepository {
  private static memoryStore: SeedProduct[] = [...SEED_PRODUCTS];

  /**
   * Retrieves all products with variants and EMI plans (DB with memory fallback)
   */
  public static async findAll(category?: string) {
    try {
      if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('sample')) {
        return await prisma.product.findMany({
          where: category && category !== 'ALL' ? { category } : undefined,
          include: {
            variants: true,
            emiPlans: {
              orderBy: { tenureMonths: 'asc' },
            },
          },
          orderBy: { createdAt: 'asc' },
        });
      }
    } catch (err) {
      console.warn('[ProductRepository] DB query failed or unconfigured, using fallback store:', err);
    }

    // Fallback store
    let list = this.memoryStore;
    if (category && category !== 'ALL') {
      list = list.filter((p) => p.category.toUpperCase() === category.toUpperCase());
    }
    return list;
  }

  /**
   * Retrieves single product by unique slug
   */
  public static async findBySlug(slug: string) {
    if (!slug) {
      throw new AppError(ERROR_REGISTRY.PRODUCT_SLUG_REQUIRED);
    }

    try {
      if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('sample')) {
        const prod = await prisma.product.findUnique({
          where: { slug },
          include: {
            variants: { orderBy: { price: 'asc' } },
            emiPlans: { orderBy: { tenureMonths: 'asc' } },
          },
        });
        if (prod) return prod;
      }
    } catch (err) {
      console.warn('[ProductRepository] DB findBySlug failed, checking fallback:', err);
    }

    const item = this.memoryStore.find((p) => p.slug === slug);
    if (!item) {
      throw new AppError(ERROR_REGISTRY.PRODUCT_NOT_FOUND, { slug });
    }
    return item;
  }

  /**
   * Retrieves specific variant
   */
  public static async findVariantById(variantId: string) {
    try {
      if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('sample')) {
        const variant = await prisma.productVariant.findUnique({
          where: { id: variantId },
          include: { product: true },
        });
        if (variant) return variant;
      }
    } catch (err) {
      console.warn('[ProductRepository] DB variant query fallback');
    }

    for (const p of this.memoryStore) {
      const v = p.variants.find((variant) => variant.title === variantId || variant.colorName === variantId);
      if (v) return { ...v, product: p };
    }

    throw new AppError(ERROR_REGISTRY.VARIANT_NOT_FOUND, { variantId });
  }
}
