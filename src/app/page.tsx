import Link from 'next/link';
import { ProductRepository } from '@/repositories/productRepository';
import { ArrowRight, Sparkles, ShieldCheck, Zap, Star, TrendingUp, CheckCircle } from 'lucide-react';
import { EmiCalculationService } from '@/services/emiService';

export default async function HomePage() {
  const products = await ProductRepository.findAll();

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-b from-indigo-900 via-indigo-950 to-slate-900 text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="relative max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-amber-300" />
            Next-Gen Fintech Financing for Consumer Tech
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
            Buy Flagship Tech on <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">
              Mutual Fund Backed EMIs
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-slate-300 text-base sm:text-lg leading-relaxed">
            Zero interest tenures up to 24 months. Subvented by institutional mutual fund liquidity with guaranteed cashback and instantaneous digital approval.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a
              href="#catalog"
              className="px-6 py-3.5 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-sm shadow-lg shadow-indigo-500/30 transition-all flex items-center gap-2"
            >
              Browse Products & Plans <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/products/apple-iphone-17-pro"
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm border border-white/20 backdrop-blur-sm transition-all"
            >
              View iPhone 17 Pro Live Demo
            </Link>
          </div>

          {/* Quick stats / trust */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-10 max-w-3xl mx-auto text-left">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="text-2xl font-black text-indigo-300">0%</div>
              <div className="text-xs text-slate-400">Interest up to 24 Months</div>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="text-2xl font-black text-emerald-300">₹7,500+</div>
              <div className="text-xs text-slate-400">Instant Cashback</div>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="text-2xl font-black text-purple-300">100%</div>
              <div className="text-xs text-slate-400">Digital Paperless KYC</div>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="text-2xl font-black text-amber-300">SEBI</div>
              <div className="text-xs text-slate-400">Liquid Fund Custody</div>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Grid */}
      <section id="catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Product Catalog</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Featured Flagships on EMI</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xs sm:text-right">
            Select a product to customize variants, storage options, and view live amortization tables.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product: any) => {
            const defaultVariant = product.variants.find((v: any) => v.isDefault) || product.variants[0];
            const lowestEmi = Math.round(defaultVariant.price / 24);

            return (
              <Link
                key={product.slug}
                href={`/products/${product.slug}`}
                className="group bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-indigo-300 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Badge & Rating */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    {product.badge ? (
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-rose-50 text-rose-600 border border-rose-200">
                        {product.badge}
                      </span>
                    ) : (
                      <span></span>
                    )}
                    <div className="flex items-center gap-1 text-[11px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                      {product.rating}
                    </div>
                  </div>

                  {/* Product Image */}
                  <div className="w-full aspect-square p-4 flex items-center justify-center bg-slate-50 rounded-xl mb-4 group-hover:bg-indigo-50/30 transition-colors">
                    <img
                      src={defaultVariant.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-contain drop-shadow group-hover:scale-105 transition-transform"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="space-y-1">
                    <div className="text-xs text-slate-500 font-semibold">{product.brand}</div>
                    <h3 className="font-extrabold text-slate-900 text-base group-hover:text-indigo-600 transition-colors">
                      {product.name}
                    </h3>
                    <div className="text-xs text-slate-500 flex items-center gap-2">
                      <span>{product.variants.length} finishes</span>
                      <span>•</span>
                      <span>{defaultVariant.storage}</span>
                    </div>
                  </div>
                </div>

                {/* Price & EMI Footprint */}
                <div className="pt-4 mt-4 border-t border-slate-100 space-y-2">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <div className="text-[11px] text-slate-400 font-medium">Starting from</div>
                      <div className="font-black text-slate-900 text-lg">
                        ₹{defaultVariant.price.toLocaleString('en-IN')}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[11px] text-emerald-600 font-bold">0% Interest EMI</div>
                      <div className="text-xs font-extrabold text-indigo-600">
                        ₹{lowestEmi.toLocaleString('en-IN')}/mo
                      </div>
                    </div>
                  </div>

                  <div className="w-full py-2 bg-slate-900 group-hover:bg-indigo-600 text-white rounded-lg text-xs font-bold transition-colors text-center flex items-center justify-center gap-1">
                    View EMI Plans <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
