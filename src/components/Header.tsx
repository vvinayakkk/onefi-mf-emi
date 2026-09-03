import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, ShieldCheck, Zap, Layers } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-md group-hover:scale-105 transition-transform">
            <span className="flex items-center">
              1<span className="text-indigo-200">Fi</span>
            </span>
          </div>
          <div>
            <div className="flex items-center gap-1.5 font-extrabold text-slate-900 tracking-tight leading-none text-lg">
              1Fi <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200/60">MF-EMI</span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">Smart mutual fund backed purchasing</p>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <Link href="/" className="hover:text-indigo-600 transition-colors">
            All Products
          </Link>
          <Link href="/products/apple-iphone-17-pro" className="hover:text-indigo-600 transition-colors">
            iPhone 17 Pro
          </Link>
          <Link href="/products/samsung-galaxy-s24-ultra" className="hover:text-indigo-600 transition-colors">
            Galaxy S24 Ultra
          </Link>
          <Link href="/products/macbook-pro-14-m3" className="hover:text-indigo-600 transition-colors">
            MacBook Pro M3
          </Link>
        </nav>

        {/* Trust Badges & Action */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            0% Interest & Cashback
          </div>
          <Link
            href="/#catalog"
            className="text-xs sm:text-sm font-semibold bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-all shadow-sm flex items-center gap-1"
          >
            Explore Plans <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </header>
  );
};
