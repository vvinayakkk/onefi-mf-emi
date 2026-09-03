import React from 'react';
import Link from 'next/link';
import { OneFiLogo } from './OneFiLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-20 text-xs text-slate-500">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          <div className="space-y-2 md:col-span-2">
            <div className="flex items-center gap-2">
              <OneFiLogo size={24} />
              <span className="font-bold text-slate-800 text-sm">1Fi Store</span>
            </div>
            <p className="text-slate-500 text-xs leading-relaxed max-w-sm">
              Purchase premium smartphones and laptops with 0% interest and flexible EMI plans backed by mutual fund subvention.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-slate-800 mb-2.5">Products on EMI</h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link href="/products/apple-iphone-17-pro" className="hover:text-slate-900 transition-colors">
                  iPhone 17 Pro
                </Link>
              </li>
              <li>
                <Link href="/products/samsung-galaxy-s24-ultra" className="hover:text-slate-900 transition-colors">
                  Samsung Galaxy S24 Ultra
                </Link>
              </li>
              <li>
                <Link href="/products/macbook-pro-14-m3" className="hover:text-slate-900 transition-colors">
                  MacBook Pro 14" M3
                </Link>
              </li>
              <li>
                <Link href="/products/google-pixel-9-pro" className="hover:text-slate-900 transition-colors">
                  Google Pixel 9 Pro
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-slate-800 mb-2.5">Why 1Fi?</h4>
            <ul className="space-y-1.5 text-xs text-slate-500">
              <li>0% Interest up to 24 Months</li>
              <li>No Processing Fee</li>
              <li>Instant Paperless Approval</li>
              <li>SEBI-Regulated Partners</li>
            </ul>
          </div>
        </div>

      </div>
    </footer>
  );
};
