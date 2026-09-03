import { PrismaClient } from '@prisma/client';
import { SEED_PRODUCTS } from '../src/data/seedData';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting 1Fi Database Seed...');

  // Clean existing records
  await prisma.order.deleteMany().catch(() => {});
  await prisma.emiPlan.deleteMany().catch(() => {});
  await prisma.productVariant.deleteMany().catch(() => {});
  await prisma.product.deleteMany().catch(() => {});

  for (const productData of SEED_PRODUCTS) {
    const { variants, emiPlans, ...productFields } = productData;

    console.log(`Creating product: ${productFields.name}`);
    const product = await prisma.product.create({
      data: {
        ...productFields,
        variants: {
          create: variants.map((v) => ({
            title: v.title,
            colorName: v.colorName,
            colorHex: v.colorHex,
            storage: v.storage,
            mrp: v.mrp,
            price: v.price,
            imageUrl: v.imageUrl,
            isDefault: v.isDefault,
          })),
        },
        emiPlans: {
          create: emiPlans.map((plan) => ({
            tenureMonths: plan.tenureMonths,
            interestRate: plan.interestRate,
            cashbackAmount: plan.cashbackAmount,
            isPopular: plan.isPopular,
            mutualFundBacking: plan.mutualFundBacking,
          })),
        },
      },
    });

    console.log(`✓ Seeded ${product.name} with ${variants.length} variants & ${emiPlans.length} EMI plans`);
  }

  console.log('🎉 1Fi Database Seeding Completed Successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
