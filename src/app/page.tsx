import Link from 'next/link';
import { ProductRepository } from '@/repositories/productRepository';
import { ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export default async function HomePage() {
  const products = await ProductRepository.findAll();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      
      {/* Hero Intro Banner */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-3">
        <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium text-slate-700 border border-slate-300">
          Mutual Fund Backed Financing
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Upgrade to Flagship Tech on 0% Interest EMI
        </h1>
        <p className="text-slate-600 text-sm max-w-2xl leading-relaxed">
          Finance your next smartphone or laptop through institutional mutual fund subvention. Enjoy zero-cost monthly installments up to 24 months and instant cashback.
        </p>
      </section>

      {/* Products Grid */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">
            Available Devices
          </h2>
          <span className="text-xs text-slate-500 font-medium">
            Instant Digital Approval
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product: any) => {
            const defaultVariant = product.variants.find((v: any) => v.isDefault) || product.variants[0];
            const lowestEmi = Math.round(defaultVariant.price / 24);

            return (
              <Link
                key={product.slug}
                href={`/products/${product.slug}`}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-slate-400 font-medium uppercase tracking-wider text-[10px]">
                      {product.brand}
                    </span>
                    {product.badge && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full border border-slate-300 text-slate-700">
                        {product.badge}
                      </span>
                    )}
                  </div>

                  <div className="w-full aspect-square bg-slate-50 rounded-xl p-4 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-200">
                    <img
                      src={defaultVariant.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-contain mix-blend-multiply"
                    />
                  </div>

                  <h3 className="font-bold text-slate-900 text-base group-hover:text-indigo-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    {product.variants.length} color finishes • {defaultVariant.storage}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 space-y-3">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <div className="text-[10px] text-slate-400 font-medium">From</div>
                      <div className="font-bold text-slate-900 text-lg">
                        ₹{defaultVariant.price.toLocaleString('en-IN')}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[11px] text-emerald-600 font-bold">0% Interest</div>
                      <div className="text-xs font-bold text-indigo-600">
                        ₹{lowestEmi.toLocaleString('en-IN')}/mo
                      </div>
                    </div>
                  </div>

                  <div className="w-full py-2.5 bg-slate-900 group-hover:bg-indigo-600 text-white rounded-xl text-xs font-bold transition-colors text-center flex items-center justify-center gap-1.5 shadow-sm">
                    <span>Explore EMI Plans</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Customer Trust / Benefits Bar */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
        <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-xs">0% Interest Tenures</h4>
            <p className="text-[11px] text-slate-500">No hidden bank charges or processing fee</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-xs">Instant Digital Approval</h4>
            <p className="text-[11px] text-slate-500">100% paperless KYC verified in seconds</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-xs">Guaranteed Cashback</h4>
            <p className="text-[11px] text-slate-500">Up to ₹10,000 direct account credit</p>
          </div>
        </div>
      </section>
    </div>
  );
}
