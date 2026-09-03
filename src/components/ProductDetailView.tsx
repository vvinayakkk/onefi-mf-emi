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
  Zap,
  HelpCircle,
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
  // Find default variant or first
  const initialVariant = product.variants.find((v) => v.isDefault) || product.variants[0];
  const [selectedVariant, setSelectedVariant] = useState<VariantType>(initialVariant);

  // Default to 12 months or first available plan
  const [selectedTenure, setSelectedTenure] = useState<number>(12);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);

  // Group unique colors & unique storages
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

  // Compute calculated plans dynamically based on selected variant price
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

  // Active selected plan breakdown
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6 font-medium">
        <Link href="/" className="hover:text-indigo-600 transition-colors">Home</Link>
        <span>/</span>
        <span className="text-slate-400">{product.brand}</span>
        <span>/</span>
        <span className="text-slate-900 font-semibold">{product.name}</span>
      </nav>

      {/* Main Product Layout (Matching 1Fi Mockup) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left Column: Product Showcase Card */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm relative overflow-hidden flex flex-col items-center text-center">
            
            {/* Header info inside card */}
            <div className="w-full text-left space-y-1 mb-4">
              {product.badge && (
                <span className="text-[11px] font-extrabold tracking-wider text-rose-500 uppercase">
                  {product.badge}
                </span>
              )}
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {product.name}
              </h1>
              <p className="text-sm font-semibold text-slate-500">
                {selectedVariant.storage}
              </p>
            </div>

            {/* Product Image Frame */}
            <div className="relative w-full aspect-square max-w-[340px] my-4 flex items-center justify-center p-4">
              <img
                src={selectedVariant.imageUrl}
                alt={selectedVariant.title}
                className="w-full h-full object-contain drop-shadow-2xl transition-all duration-300 transform hover:scale-105"
              />
            </div>

            {/* Finish indicator & Swatches */}
            <div className="mt-4 pt-4 border-t border-slate-100 w-full flex flex-col items-center gap-2.5">
              <span className="text-xs font-medium text-slate-500">
                Available in {colorOptions.length} finishes
              </span>
              <div className="flex items-center gap-3">
                {colorOptions.map((v) => {
                  const isSelected = selectedVariant.colorName === v.colorName;
                  return (
                    <button
                      key={v.colorName}
                      onClick={() => handleColorChange(v.colorName)}
                      title={v.colorName}
                      className={`w-7 h-7 rounded-full transition-all flex items-center justify-center ${
                        isSelected
                          ? 'ring-2 ring-indigo-600 ring-offset-2 scale-110'
                          : 'hover:scale-105 opacity-80'
                      }`}
                      style={{ backgroundColor: v.colorHex }}
                    >
                      {isSelected && (
                        <Check className="w-3.5 h-3.5 text-white drop-shadow" />
                      )}
                    </button>
                  );
                })}
              </div>
              <span className="text-xs font-bold text-slate-700">
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
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      selectedVariant.storage === stg
                        ? 'bg-slate-900 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {stg}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mutual fund backing explanation card */}
          <div className="mt-6 p-5 bg-gradient-to-br from-indigo-50/80 via-purple-50/50 to-white rounded-2xl border border-indigo-100 text-xs text-slate-700 space-y-2">
            <div className="flex items-center gap-2 font-bold text-indigo-950 text-sm">
              <TrendingUp className="w-4 h-4 text-indigo-600" />
              How 1Fi Mutual Fund Backed EMI Works
            </div>
            <p className="leading-relaxed text-slate-600">
              Instead of paying high interest to credit card banks (~16-24% p.a.), your purchase is financed through institutional liquid mutual fund subvention, guaranteeing 0% interest on tenures up to 24 months plus instant cashbacks.
            </p>
          </div>
        </div>

        {/* Right Column: Pricing, EMI Options & Dynamic Plans (Matches Reference) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Price Header */}
          <div className="space-y-1">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                ₹{selectedVariant.price.toLocaleString('en-IN')}
              </span>
              <span className="text-lg text-slate-400 line-through font-medium">
                ₹{selectedVariant.mrp.toLocaleString('en-IN')}
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                Save ₹{(selectedVariant.mrp - selectedVariant.price).toLocaleString('en-IN')}
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-slate-700">
              EMI plans backed by mutual funds
            </h2>
          </div>

          {/* List of Available EMI Plans */}
          <div className="space-y-3">
            {dynamicPlans.map((plan) => {
              const isSelected = selectedTenure === plan.tenureMonths;
              const isZero = plan.interestRate === 0;

              return (
                <div
                  key={plan.tenureMonths}
                  onClick={() => setSelectedTenure(plan.tenureMonths)}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer relative ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50/40 ring-2 ring-indigo-600/20 shadow-sm'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    {/* Monthly Amount and Tenure */}
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg sm:text-xl font-black text-slate-900">
                        ₹{plan.monthlyEmi.toLocaleString('en-IN')}
                      </span>
                      <span className="text-sm font-bold text-slate-600">
                        × {plan.tenureMonths} months
                      </span>
                    </div>

                    {/* Interest Rate Tag */}
                    <div className="text-right">
                      <span
                        className={`text-sm sm:text-base font-extrabold ${
                          isZero ? 'text-slate-900' : 'text-slate-700'
                        }`}
                      >
                        {plan.interestRate}% interest
                      </span>
                    </div>
                  </div>

                  {/* Cashback Callout */}
                  {plan.cashbackAmount > 0 && (
                    <div className="mt-2 text-xs font-bold text-emerald-600 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                      Additional cashback of ₹{plan.cashbackAmount.toLocaleString('en-IN')}
                    </div>
                  )}

                  {/* Sub-details when selected */}
                  {isSelected && (
                    <div className="mt-3 pt-3 border-t border-indigo-100/80 flex flex-wrap items-center justify-between text-xs text-slate-600 gap-2 animate-in fade-in duration-150">
                      <div>
                        Total Payable: <strong className="text-slate-900 font-bold">₹{plan.totalPayable.toLocaleString('en-IN')}</strong>
                      </div>
                      <div className="text-indigo-700 font-semibold flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
                        {plan.mutualFundBacking || '1Fi Liquid Alpha Fund'}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Action CTA Button & Summary */}
          <div className="pt-4 space-y-3 sticky bottom-4 z-20 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-slate-200 shadow-xl lg:static lg:bg-transparent lg:border-none lg:shadow-none lg:p-0">
            <button
              onClick={() => setIsCheckoutOpen(true)}
              className="w-full py-4 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white font-extrabold text-base shadow-lg shadow-indigo-500/25 transition-all flex items-center justify-center gap-2"
            >
              <span>Proceed with ₹{activePlan.monthlyEmi.toLocaleString('en-IN')}/mo Plan</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <div className="flex items-center justify-center gap-6 text-[11px] text-slate-500 font-medium">
              <span className="flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-emerald-600" /> Instant Digital Approval
              </span>
              <span className="flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-emerald-600" /> No Hidden Bank Charges
              </span>
              <span className="flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-emerald-600" /> Cancel Anytime
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Application Modal */}
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
