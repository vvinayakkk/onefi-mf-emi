import React from 'react';
import Link from 'next/link';
import { OneFiLogo } from './OneFiLogo';
import { ShieldCheck, ExternalLink, Activity } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center gap-3">
          <OneFiLogo size={32} />
          <div className="flex flex-col">
            <span className="font-bold text-slate-900 text-base leading-tight tracking-tight">
              1Fi <span className="text-xs font-medium text-slate-500">Capital</span>
            </span>
            <span className="text-[11px] text-slate-400">Mutual Fund-Backed Consumer Credit</span>
          </div>
        </Link>

        {/* Center Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-600">
          <Link href="/" className="hover:text-slate-900 transition-colors">
            All Products
          </Link>
          <Link href="/products/apple-iphone-17-pro" className="hover:text-slate-900 transition-colors">
            iPhone 17 Pro
          </Link>
          <Link href="/products/samsung-galaxy-s24-ultra" className="hover:text-slate-900 transition-colors">
            Galaxy S24 Ultra
          </Link>
          <Link href="/products/macbook-pro-14-m3" className="hover:text-slate-900 transition-colors">
            MacBook Pro M3
          </Link>
          <Link href="/products/google-pixel-9-pro" className="hover:text-slate-900 transition-colors">
            Pixel 9 Pro
          </Link>
        </nav>

        {/* Right Status */}
        <div className="flex items-center gap-3 text-xs">
          <Link
            href="/api/v1/health"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-slate-200 text-slate-600 hover:border-slate-300 transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>API Status</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </Link>
        </div>
      </div>
    </header>
  );
};
