'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Search,
  Bell,
  Sparkles,
  Link2,
  Calendar,
  ChevronDown,
  Plus,
  ShieldCheck,
  Zap,
} from 'lucide-react';

export const Header: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    { name: 'Products', href: '/' },
    { name: 'EMI Plans', href: '/#plans' },
    { name: 'Mutual Funds', href: '/#funds' },
    { name: 'Analytics', href: '/#analytics' },
    { name: 'Orders', href: '/#orders' },
    { name: 'Health', href: '/api/v1/health', target: '_blank' },
  ];

  return (
    <header className="px-4 sm:px-8 pt-6 pb-2">
      <div className="max-w-[1440px] mx-auto">
        {/* Top Floating Shell Nav */}
        <div className="flex items-center justify-between gap-4 py-2">
          
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-sm font-black text-sm">
              <span className="tracking-tighter">1Fi</span>
            </div>
            <span className="font-extrabold text-xl tracking-tight text-slate-900">
              zentra <span className="text-xs font-bold text-orange-500">× 1Fi</span>
            </span>
          </Link>

          {/* Center Pill Menu (Matching Reference) */}
          <nav className="hidden lg:flex items-center bg-slate-200/80 p-1.5 rounded-full backdrop-blur-md">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href === '/' && pathname.startsWith('/products'));
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  target={item.target}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-zinc-900 text-white shadow-sm'
                      : 'text-zinc-600 hover:text-zinc-950 hover:bg-white/40'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Utilities (Search, Bell, User Profile) */}
          <div className="flex items-center gap-3">
            <button className="w-9 h-9 rounded-full bg-white/80 border border-slate-200/80 flex items-center justify-center text-slate-600 hover:bg-white transition-colors shadow-xs">
              <Search className="w-4 h-4" />
            </button>
            <button className="w-9 h-9 rounded-full bg-white/80 border border-slate-200/80 flex items-center justify-center text-slate-600 hover:bg-white transition-colors shadow-xs relative">
              <Bell className="w-4 h-4" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-orange-500"></span>
            </button>
            <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-white shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Action Toolbar Header (Overview Row) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6 mb-4">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Overview
            </h1>
            <div className="w-8 h-8 rounded-full bg-white border border-slate-200/80 flex items-center justify-center text-slate-400 hover:text-slate-700 shadow-xs cursor-pointer">
              <Link2 className="w-4 h-4" />
            </div>
          </div>

          {/* Date Picker & Action Widgets Bar */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-700">
            <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-xs">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>Jan 01 - Dec 31</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </div>

            <span className="text-slate-400 text-xs hidden sm:inline">compared to</span>

            <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-xs">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>Prior Period</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </div>

            <div className="flex items-center gap-1 bg-white px-3 py-2 rounded-xl border border-slate-200 shadow-xs">
              <span>Live DB Sync</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>

            <Link
              href="/#catalog"
              className="flex items-center gap-1.5 bg-zinc-900 hover:bg-zinc-800 text-white px-4 py-2 rounded-xl shadow-xs transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New EMI Application</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
