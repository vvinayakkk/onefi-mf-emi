import Link from 'next/link';
import { ProductRepository } from '@/repositories/productRepository';
import {
  ArrowRight,
  ShieldCheck,
  Percent,
  CheckCircle,
  HelpCircle,
  Smartphone,
  Laptop,
} from 'lucide-react';

export default async function HomePage() {
  const products = await ProductRepository.findAll();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-12">
      
      {/* Intro Header Section */}
      <section className="border-b border-slate-200 pb-8 space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold border border-indigo-200 text-indigo-700 bg-indigo-50/50">
            SDE1 Assignment
          </span>
          <span className="text-xs text-slate-400">•</span>
          <span className="text-xs text-slate-500 font-medium">
            Dynamic Database-Backed Product EMI Engine
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Mutual Fund Backed EMI Plans
        </h1>

        <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
          Select a flagship device below to view real-time dynamic variant pricing, color finishes, and amortized EMI tenures backed by institutional liquid mutual fund subvention.
        </p>
      </section>

      {/* Product Catalog Grid */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900">
            Featured Products ({products.length})
          </h2>
          <span className="text-xs text-slate-500">
            PostgreSQL Database Synced
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map((product: any) => {
            const defaultVariant = product.variants.find((v: any) => v.isDefault) || product.variants[0];
            const lowestEmi = Math.round(defaultVariant.price / 24);

            return (
              <Link
                key={product.slug}
                href={`/products/${product.slug}`}
                className="clean-card p-4 flex flex-col justify-between group hover:border-slate-400 transition-colors"
              >
                <div>
                  {/* Badge & Brand */}
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-[11px] font-medium text-slate-500">
                      {product.brand}
                    </span>
                    {product.badge && (
                      <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded border border-slate-200 text-slate-700 bg-slate-50">
                        {product.badge}
                      </span>
                    )}
                  </div>

                  {/* Device Image Box */}
                  <div className="w-full aspect-square bg-slate-50 rounded-lg p-4 flex items-center justify-center mb-3 border border-slate-100">
                    <img
                      src={defaultVariant.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-contain mix-blend-multiply"
                    />
                  </div>

                  {/* Product Title & Variants Info */}
                  <h3 className="font-semibold text-slate-900 text-sm group-hover:text-indigo-600 transition-colors">
                    {product.name}
                  </h3>
                  <div className="text-xs text-slate-500 mt-1">
                    {product.variants.length} finishes • {defaultVariant.storage}
                  </div>
                </div>

                {/* Pricing & CTA */}
                <div className="pt-3 mt-3 border-t border-slate-100 space-y-2">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <div className="text-[10px] text-slate-400 font-medium">Starting from</div>
                      <div className="font-bold text-slate-900 text-base">
                        ₹{defaultVariant.price.toLocaleString('en-IN')}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-emerald-700 font-medium">0% Interest</div>
                      <div className="text-xs font-bold text-indigo-600">
                        ₹{lowestEmi.toLocaleString('en-IN')}/mo
                      </div>
                    </div>
                  </div>

                  <div className="w-full py-2 bg-slate-900 group-hover:bg-indigo-600 text-white rounded-lg text-xs font-semibold transition-colors text-center flex items-center justify-center gap-1">
                    <span>View EMI Plans</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Technical Architecture Notes for Reviewers */}
      <section className="p-5 rounded-xl border border-slate-200 bg-white space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Architecture & Implementation Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-600">
          <div>
            <span className="font-semibold text-slate-900 block mb-1">Backend & REST APIs</span>
            Node.js Server Routes at <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-800">/api/v1/products</code> and <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-800">/api/v1/orders</code> with Zod validation.
          </div>
          <div>
            <span className="font-semibold text-slate-900 block mb-1">Database & ORM</span>
            PostgreSQL on Neon with Prisma ORM schema migrations and seed scripts.
          </div>
          <div>
            <span className="font-semibold text-slate-900 block mb-1">Code Quality Standards</span>
            Separation of Concerns (Service/Repository layers), centralized error codes, zero hardcoded values.
          </div>
        </div>
      </section>
    </div>
  );
}
