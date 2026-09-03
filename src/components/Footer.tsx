import React from 'react';
import Link from 'next/link';
import { ShieldCheck, TrendingUp, Sparkles, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-sm border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-lg">
                1Fi
              </div>
              <span className="text-white font-bold text-lg">1Fi Capital Services</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-md">
              A modern financial platform enabling consumers to purchase consumer tech through zero-cost and low-interest EMIs backed by high-liquidity mutual fund subvention yields.
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-400 pt-2">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-indigo-400" /> Bank-grade Security
              </span>
              <span className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4 text-emerald-400" /> SEBI-Regulated Partners
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-3">Quick Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/products/apple-iphone-17-pro" className="hover:text-white transition-colors">
                  Apple iPhone 17 Pro
                </Link>
              </li>
              <li>
                <Link href="/products/samsung-galaxy-s24-ultra" className="hover:text-white transition-colors">
                  Samsung S24 Ultra
                </Link>
              </li>
              <li>
                <Link href="/products/macbook-pro-14-m3" className="hover:text-white transition-colors">
                  MacBook Pro 14 M3
                </Link>
              </li>
              <li>
                <Link href="/products/google-pixel-9-pro" className="hover:text-white transition-colors">
                  Google Pixel 9 Pro
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-3">API & Health</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/api/v1/health" target="_blank" className="hover:text-white transition-colors flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> System Health Status
                </Link>
              </li>
              <li>
                <Link href="/api/v1/products" target="_blank" className="hover:text-white transition-colors">
                  GET /api/v1/products
                </Link>
              </li>
              <li>
                <Link href="/api/v1/products/apple-iphone-17-pro" target="_blank" className="hover:text-white transition-colors">
                  GET /api/v1/products/:slug
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>© {new Date().getFullYear()} 1Fi SDE1 Assignment. Built with Next.js, Prisma, Tailwind CSS & PostgreSQL.</div>
          <div className="flex gap-4">
            <span>Clean Architecture</span>
            <span>•</span>
            <span>Zero Hardcoding</span>
            <span>•</span>
            <span>SOLID Principles</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
