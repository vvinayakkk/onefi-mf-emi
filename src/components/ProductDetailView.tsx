'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Check,
  Percent,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Info,
  ArrowRight,
  ChevronLeft,
} from 'lucide-react';
import { EmiCalculationService } from '@/services/emiService';
import { CheckoutModal } from '@/components/CheckoutModal';

export interface VariantType {
  id?: string;
  title: string;
  colorName: string;
  colorHex: string;
  storage: string;
  mrp: number;
  price: number;
  imageUrl: string;
  isDefault?: boolean;
}

export interface EmiPlanType {
  id?: string;
  tenureMonths: number;
  interestRate: number;
  cashbackAmount: number;
  isPopular?: boolean;
  mutualFundBacking?: string;
}

export interface ProductDetailProps {
  product: {
    id?: string;
    slug: string;
    name: string;
    brand: string;
    description: string;
    badge?: string | null;
    rating: number;
    reviewCount: number;
    basePrice: number;
    mrp: number;
    variants: VariantType[];
    emiPlans: EmiPlanType[];
  };
}

export const ProductDetailView: React.FC<ProductDetailProps> = ({ product }) => {
  const initialVariant = product.variants.find((v) => v.isDefault) || product.variants[0];
  const [selectedVariant, setSelectedVariant] = useState<VariantType>(initialVariant);
  const [selectedTenure, setSelectedTenure] = useState<number>(12);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);

  const colorOptions = useMemo(() => {
    const map = new Map<string, VariantType>();
    product.variants.forEach((v) => {
      if (!map.has(v.colorName)) map.set(v.colorName, v);
    });
    return Array.from(map.values());
  }, [product.variants]);

  const storageOptions = useMemo(() => {
    const set = new Set<string>();
    product.variants.forEach((v) => set.add(v.storage));
    return Array.from(set);
  }, [product.variants]);

  const dynamicPlans = useMemo(() => {
    const plans = product.emiPlans.length > 0 ? product.emiPlans : EmiCalculationService.generateDefaultPlans(selectedVariant.price);
    return plans.map((plan) => {
      const breakdown = EmiCalculationService.calculate({
        principalAmount: selectedVariant.price,
        tenureMonths: plan.tenureMonths,
        annualInterestRate: plan.interestRate,
        cashbackAmount: plan.cashbackAmount,
      });

      return {
        ...plan,
        monthlyEmi: breakdown.monthlyEmi,
        totalPayable: breakdown.totalPayable,
        savings: breakdown.savingsVersusCreditCard,
        effectiveCost: breakdown.effectiveCost,
      };
    });
  }, [product.emiPlans, selectedVariant.price]);

  const activePlan = useMemo(() => {
    return (
      dynamicPlans.find((p) => p.tenureMonths === selectedTenure) ||
      dynamicPlans[0]
    );
  }, [dynamicPlans, selectedTenure]);

  const handleColorChange = (colorName: string) => {
    const match = product.variants.find(
      (v) => v.colorName === colorName && v.storage === selectedVariant.storage
    ) || product.variants.find((v) => v.colorName === colorName);
    if (match) setSelectedVariant(match);
  };

  const handleStorageChange = (storage: string) => {
    const match = product.variants.find(
      (v) => v.storage === storage && v.colorName === selectedVariant.colorName
    ) || product.variants.find((v) => v.storage === storage);
    if (match) setSelectedVariant(match);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
        <Link href="/" className="hover:text-slate-900 transition-colors flex items-center gap-1">
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>All Products</span>
        </Link>
        <span>/</span>
        <span className="text-slate-400">{product.brand}</span>
        <span>/</span>
        <span className="text-slate-800 font-semibold">{product.name}</span>
      </nav>

      {/* Main Product Layout (Matching 1Fi Mockup Specification) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Product Showcase Card */}
        <div className="lg:col-span-5">
          <div className="clean-card p-6 sm:p-8 flex flex-col items-center text-center">
            
            {/* Header info */}
            <div className="w-full text-left space-y-1 mb-4">
              {product.badge && (
                <span className="text-[10px] font-bold text-rose-600 uppercase tracking-wide">
                  {product.badge}
                </span>
              )}
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                {product.name}
              </h1>
              <p className="text-sm font-medium text-slate-500">
                {selectedVariant.storage}
              </p>
            </div>

            {/* Product Image Frame */}
            <div className="relative w-full aspect-square max-w-[300px] my-4 flex items-center justify-center p-2">
              <img
                src={selectedVariant.imageUrl}
                alt={selectedVariant.title}
                className="w-full h-full object-contain mix-blend-multiply transition-transform duration-200"
              />
            </div>

            {/* Finishes Swatch Selector */}
            <div className="w-full pt-4 border-t border-slate-100 flex flex-col items-center gap-2">
              <span className="text-xs text-slate-500">
                Available in {colorOptions.length} finishes
              </span>
              <div className="flex items-center gap-2.5">
                {colorOptions.map((v) => {
                  const isSelected = selectedVariant.colorName === v.colorName;
                  return (
                    <button
                      key={v.colorName}
                      onClick={() => handleColorChange(v.colorName)}
                      title={v.colorName}
                      className={`w-6 h-6 rounded-full transition-all flex items-center justify-center border border-slate-300 ${
                        isSelected
                          ? 'ring-2 ring-slate-900 ring-offset-2 scale-110'
                          : 'hover:scale-105 opacity-80'
                      }`}
                      style={{ backgroundColor: v.colorHex }}
                    >
                      {isSelected && (
                        <Check className="w-3 h-3 text-white drop-shadow-sm" />
                      )}
                    </button>
                  );
                })}
              </div>
              <span className="text-xs font-semibold text-slate-700">
                {selectedVariant.colorName}
              </span>
            </div>

            {/* Storage capacity selector */}
            {storageOptions.length > 1 && (
              <div className="w-full mt-4 pt-4 border-t border-slate-100 flex items-center justify-center gap-2">
                {storageOptions.map((stg) => (
                  <button
                    key={stg}
                    onClick={() => handleStorageChange(stg)}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold border transition-all ${
                      selectedVariant.storage === stg
                        ? 'border-slate-900 bg-slate-900 text-white'
                        : 'border-slate-200 text-slate-600 hover:border-slate-300 bg-white'
                    }`}
                  >
                    {stg}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mutual fund subvention note */}
          <div className="mt-4 p-4 rounded-xl border border-slate-200 bg-white text-xs text-slate-600 space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-slate-900">
              <TrendingUp className="w-3.5 h-3.5 text-indigo-600" />
              <span>Mutual Fund Backed Subvention</span>
            </div>
            <p className="leading-relaxed text-slate-500">
              Purchases are financed through SEBI-regulated institutional liquid mutual fund yields, providing 0% interest on tenures up to 24 months.
            </p>
          </div>
        </div>

        {/* Right Column: Pricing & Dynamic EMI Plans (Matches 1Fi Mockup) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Price Header */}
          <div className="space-y-1">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-slate-900 tracking-tight">
                ₹{selectedVariant.price.toLocaleString('en-IN')}
              </span>
              <span className="text-base text-slate-400 line-through">
                ₹{selectedVariant.mrp.toLocaleString('en-IN')}
              </span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full border border-emerald-300 text-emerald-700">
                Save ₹{(selectedVariant.mrp - selectedVariant.price).toLocaleString('en-IN')}
              </span>
            </div>
            <h2 className="text-sm font-semibold text-slate-600">
              EMI plans backed by mutual funds
            </h2>
          </div>

          {/* List of Available Dynamic EMI Plans */}
          <div className="space-y-2.5">
            {dynamicPlans.map((plan) => {
              const isSelected = selectedTenure === plan.tenureMonths;
              const isZero = plan.interestRate === 0;

              return (
                <div
                  key={plan.tenureMonths}
                  onClick={() => setSelectedTenure(plan.tenureMonths)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50/30 ring-1 ring-indigo-600/30'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    {/* Monthly Amount and Tenure */}
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-bold text-slate-900">
                        ₹{plan.monthlyEmi.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs font-medium text-slate-500">
                        × {plan.tenureMonths} months
                      </span>
                    </div>

                    {/* Interest Rate */}
                    <div className="text-right">
                      <span
                        className={`text-xs font-semibold ${
                          isZero ? 'text-slate-900' : 'text-slate-600'
                        }`}
                      >
                        {plan.interestRate}% interest
                      </span>
                    </div>
                  </div>

                  {/* Cashback Callout */}
                  {plan.cashbackAmount > 0 && (
                    <div className="mt-1 text-xs font-semibold text-emerald-600 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-emerald-500" />
                      Additional cashback of ₹{plan.cashbackAmount.toLocaleString('en-IN')}
                    </div>
                  )}

                  {/* Expanded details when selected */}
                  {isSelected && (
                    <div className="mt-3 pt-3 border-t border-indigo-100 flex items-center justify-between text-xs text-slate-500">
                      <div>
                        Total Payable: <strong className="text-slate-800">₹{plan.totalPayable.toLocaleString('en-IN')}</strong>
                      </div>
                      <div className="text-indigo-600 font-medium">
                        {plan.mutualFundBacking || '1Fi Liquid Alpha Fund'}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Action CTA Button */}
          <div className="pt-2 space-y-3">
            <button
              onClick={() => setIsCheckoutOpen(true)}
              className="w-full py-3.5 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-sm transition-colors flex items-center justify-center gap-2"
            >
              <span>Proceed with ₹{activePlan.monthlyEmi.toLocaleString('en-IN')}/mo Plan</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-6 text-[11px] text-slate-500">
              <span>• Instant Digital Approval</span>
              <span>• Zero Processing Fee</span>
              <span>• 100% Paperless KYC</span>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        productName={product.name}
        variantTitle={selectedVariant.title}
        variantImage={selectedVariant.imageUrl}
        variantId={selectedVariant.id || selectedVariant.title}
        price={selectedVariant.price}
        selectedPlan={activePlan}
      />
    </div>
  );
};
