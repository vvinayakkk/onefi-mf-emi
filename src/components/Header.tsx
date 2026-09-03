import React from 'react';
import Link from 'next/link';
import { OneFiLogo } from './OneFiLogo';
import { ShieldCheck } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center gap-3">
          <OneFiLogo size={32} />
          <div className="flex flex-col">
            <span className="font-bold text-slate-900 text-base leading-tight tracking-tight">
              1Fi <span className="text-xs font-semibold text-indigo-600">Store</span>
            </span>
            <span className="text-[11px] text-slate-400">Mutual Fund Backed EMIs</span>
          </div>
        </Link>

        {/* Center Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600">
          <Link href="/" className="hover:text-indigo-600 transition-colors">
            All Devices
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
          <Link href="/products/google-pixel-9-pro" className="hover:text-indigo-600 transition-colors">
            Pixel 9 Pro
          </Link>
        </nav>

        {/* Right Status */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            0% Interest EMI
          </span>
        </div>
      </div>
    </header>
  );
};
