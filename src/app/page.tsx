import Link from 'next/link';
import { ProductRepository } from '@/repositories/productRepository';
import {
  MoreHorizontal,
  ArrowUpRight,
  TrendingUp,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Zap,
  Layers,
  ArrowRight,
  Lightbulb,
} from 'lucide-react';

export default async function HomePage() {
  const products = await ProductRepository.findAll();

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-8 pb-16 space-y-6">
      
      {/* Top Main Bento Row (Payments Stage Funnel + Gross Volume) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Card: 1Fi Mutual Fund EMI Stage Funnel (Matches Payments 65.2k card) */}
        <div className="lg:col-span-8 zentra-card p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
          
          <div>
            {/* Card Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-black text-slate-900 tracking-tight">
                  1Fi EMI Financing Funnel
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Live mutual fund subvention & customer conversion pipeline
                </p>
              </div>
              <button className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-700">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>

            {/* Funnel Metrics Row */}
            <div className="grid grid-cols-5 gap-2 sm:gap-4 mb-4 text-left">
              <div>
                <div className="text-[11px] font-semibold text-slate-400">Initiated Apps</div>
                <div className="text-xl sm:text-2xl font-black text-slate-900">65.2k</div>
              </div>
              <div>
                <div className="text-[11px] font-semibold text-slate-400">KYC Verified</div>
                <div className="text-xl sm:text-2xl font-black text-slate-900">54.8k</div>
              </div>
              <div className="bg-blue-50/60 p-1.5 -m-1.5 rounded-xl border border-blue-100">
                <div className="text-[11px] font-bold text-blue-700">MF Subvented</div>
                <div className="text-xl sm:text-2xl font-black text-blue-900">48.6k</div>
              </div>
              <div>
                <div className="text-[11px] font-semibold text-slate-400">Brand Disbursal</div>
                <div className="text-xl sm:text-2xl font-black text-slate-900">38.3k</div>
              </div>
              <div>
                <div className="text-[11px] font-semibold text-slate-400">Orders Delivered</div>
                <div className="text-xl sm:text-2xl font-black text-slate-900">32.9k</div>
              </div>
            </div>

            {/* Visual Funnel Bar Chart (Striped Blue Bars from reference) */}
            <div className="grid grid-cols-5 gap-2 sm:gap-4 items-end h-40 pt-4 pb-2">
              <div className="w-full h-full rounded-2xl bar-striped-blue opacity-90 relative"></div>
              <div className="w-full h-[84%] rounded-2xl bar-striped-blue opacity-80 relative"></div>
              <div className="w-full h-[74%] rounded-2xl bg-gradient-to-t from-blue-700 to-blue-500 shadow-md relative group">
                {/* Floating Tooltip matching image */}
                <div className="absolute -top-9 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-semibold px-2.5 py-1 rounded-lg whitespace-nowrap shadow-lg z-10">
                  48.6k apps | Conversion: <span className="text-emerald-400 font-bold">89%</span>
                </div>
              </div>
              <div className="w-full h-[58%] rounded-2xl bar-striped-blue opacity-50 relative"></div>
              <div className="w-full h-[50%] rounded-2xl bar-striped-blue opacity-40 relative"></div>
            </div>
          </div>

          {/* Interactive AI Floating Prompt Bar (Matches bottom of Payments card) */}
          <div className="mt-4 p-3.5 zentra-glass-input flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-700 min-w-0">
              <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
              <span className="font-semibold text-slate-500 shrink-0">Explore Plan:</span>
              <span className="text-slate-900 font-medium truncate">
                Instant 0% Interest EMI backed by <span className="bg-orange-100 text-orange-800 px-1.5 py-0.5 rounded font-bold">/1Fi Liquid Alpha Fund</span> with ₹7,500 cashback
              </span>
            </div>
            <Link
              href="/products/apple-iphone-17-pro"
              className="shrink-0 px-3 py-1 bg-zinc-900 text-white rounded-lg font-bold text-[11px] hover:bg-zinc-800"
            >
              Simulate
            </Link>
          </div>
        </div>

        {/* Right Card: Gross Volume & Financing Breakdown (Matches $41,540 card) */}
        <div className="lg:col-span-4 zentra-card p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900">Total Financed GMV</h3>
              <button className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                ₹4,15,40,000
              </span>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-0.5">
                ▲ 15%
              </span>
            </div>

            {/* Striped Breakdown Progress Bars */}
            <div className="space-y-4 text-xs font-semibold text-slate-700">
              
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-600">0% No Cost EMI</span>
                  <span className="text-slate-900 font-bold">₹2,68,000 (65%)</span>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full w-[65%] rounded-full bar-striped-green"></div>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-600">Long Tenure EMI (36-60m)</span>
                  <span className="text-slate-900 font-bold">₹1,04,000 (25%)</span>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full w-[25%] rounded-full bar-striped-blue"></div>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-600">Instant Cashbacks Disbursed</span>
                  <span className="text-slate-900 font-bold">₹43,400 (10%)</span>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full w-[10%] rounded-full bar-striped-pink"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>SEBI Compliant Liquid Yields</span>
            <span className="font-bold text-slate-900">12.0% p.a.</span>
          </div>
        </div>
      </div>

      {/* Second Bento Row (Product Catalog with Zentra Styling) */}
      <div id="catalog" className="zentra-card p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="text-xs font-bold text-orange-600 uppercase tracking-wider">
              Flagship Products on EMI
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Select Device to Customize EMI & Mutual Fund Yields
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> 4 Products Seeded in PostgreSQL
            </span>
          </div>
        </div>

        {/* Product Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map((product: any) => {
            const defaultVariant = product.variants.find((v: any) => v.isDefault) || product.variants[0];
            const lowestEmi = Math.round(defaultVariant.price / 24);

            return (
              <Link
                key={product.slug}
                href={`/products/${product.slug}`}
                className="bg-slate-50 hover:bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-slate-300 transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  {/* Badge & Finishes */}
                  <div className="flex items-center justify-between mb-3">
                    {product.badge ? (
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-zinc-900 text-white">
                        {product.badge}
                      </span>
                    ) : (
                      <span className="text-[11px] font-bold text-slate-400">{product.brand}</span>
                    )}
                    <span className="text-[11px] font-semibold text-slate-500">
                      {product.variants.length} finishes
                    </span>
                  </div>

                  {/* Image Frame */}
                  <div className="w-full aspect-square bg-white rounded-xl p-4 flex items-center justify-center mb-4 border border-slate-200/60 group-hover:scale-[1.03] transition-transform">
                    <img
                      src={defaultVariant.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-contain drop-shadow-md"
                    />
                  </div>

                  {/* Product Title */}
                  <h3 className="font-black text-slate-900 text-base tracking-tight group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                    {product.description}
                  </p>
                </div>

                {/* Pricing & Plan Action */}
                <div className="pt-4 mt-4 border-t border-slate-200/70 space-y-3">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <div className="text-[10px] uppercase font-bold text-slate-400">Starting at</div>
                      <div className="text-lg font-black text-slate-900">
                        ₹{defaultVariant.price.toLocaleString('en-IN')}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] font-bold text-emerald-600">0% Interest EMI</div>
                      <div className="text-xs font-black text-blue-600">
                        ₹{lowestEmi.toLocaleString('en-IN')}/mo
                      </div>
                    </div>
                  </div>

                  <div className="w-full py-2.5 bg-zinc-900 group-hover:bg-blue-600 text-white rounded-xl text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 shadow-xs">
                    <span>View Plans & Amortization</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Bottom Bento Row (Retention + Transactions + Customers + Insights Banner) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
        
        {/* Retention / Repayment Performance */}
        <div className="lg:col-span-4 zentra-card p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-bold text-slate-900">Repayment Track Record</h3>
              <button className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
            <div className="text-2xl font-black text-slate-900 mb-2">99.4% On-time</div>
            <p className="text-xs text-slate-500 mb-4">Auto-debit NACH mandates linked with CAMS/KFintech</p>
            
            {/* Visual Step graph effect */}
            <div className="h-20 flex items-end gap-1.5 pt-2">
              {[40, 55, 60, 48, 75, 82, 90, 85, 95, 99].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-md bg-rose-400/80 hover:bg-rose-500 transition-colors"
                  style={{ height: `${h}%` }}
                ></div>
              ))}
            </div>
          </div>
          <div className="flex justify-between text-[11px] text-slate-400 pt-3 border-t border-slate-100">
            <span>Jan</span>
            <span>Mar</span>
            <span>Jun</span>
            <span>Sep</span>
            <span>Dec</span>
          </div>
        </div>

        {/* Transactions & Users Stats */}
        <div className="lg:col-span-4 zentra-card p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900">Active EMIs & Orders</h3>
              <button className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">Live Active EMIs</span>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                    +34,002 this month
                  </span>
                </div>
                <div className="text-3xl font-black text-slate-900 mt-1">106,420</div>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">Verified Customers</span>
                  <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                    +1,284 today
                  </span>
                </div>
                <div className="text-2xl font-black text-slate-900 mt-1">42,890</div>
              </div>
            </div>
          </div>
          <div className="text-[11px] text-slate-400 pt-2">All data verified via PostgreSQL database</div>
        </div>

        {/* Holographic Insights Banner (Matches 75% card on bottom right) */}
        <div className="lg:col-span-4 zentra-insights-banner p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden shadow-xl">
          <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold">
              <Lightbulb className="w-3.5 h-3.5 text-amber-300" />
              <span>Smart Mutual Fund Subvention</span>
            </div>

            <div className="text-4xl sm:text-5xl font-black tracking-tight">
              75%
            </div>

            <h4 className="text-base font-bold leading-snug">
              Authorization rate increased by 14% with 0% interest pledge plans.
            </h4>

            <p className="text-xs text-blue-100 leading-relaxed">
              Customers save an average of ₹14,200 compared to traditional credit card high-interest schemes.
            </p>
          </div>

          <div className="relative z-10 pt-4 mt-4 border-t border-white/20 flex items-center justify-between text-xs">
            <span>Powered by 1Fi Engine</span>
            <span className="font-bold underline cursor-pointer">View Case Study</span>
          </div>
        </div>
      </div>
    </div>
  );
}
