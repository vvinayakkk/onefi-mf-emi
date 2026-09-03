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
  MoreHorizontal,
  Layers,
  CheckCircle2,
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
    <div className="max-w-[1440px] mx-auto px-4 sm:px-8 pb-16 space-y-6">
      
      {/* Back button & Breadcrumb */}
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-xs hover:bg-slate-50 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Overview</span>
        </Link>
        <div className="text-xs text-slate-400 font-semibold">
          Database ID: <span className="font-mono text-slate-600">{product.id || product.slug}</span>
        </div>
      </div>

      {/* Main Product Zentra Bento Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Device Presentation Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="zentra-card p-6 sm:p-8 flex flex-col items-center text-center relative overflow-hidden">
            
            {/* Header info */}
            <div className="w-full text-left space-y-1 mb-4">
              <div className="flex items-center justify-between">
                {product.badge ? (
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-zinc-900 text-white uppercase tracking-wider">
                    {product.badge}
                  </span>
                ) : (
                  <span className="text-xs font-bold text-slate-400 uppercase">{product.brand}</span>
                )}
                <button className="w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center text-slate-400">
                  <MoreHorizontal className="w-3.5 h-3.5" />
                </button>
              </div>

              <h1 className="text-3xl font-black text-slate-900 tracking-tight pt-2">
                {product.name}
              </h1>
              <p className="text-sm font-semibold text-slate-500">
                {selectedVariant.storage} • {selectedVariant.colorName}
              </p>
            </div>

            {/* Product Image Frame */}
            <div className="relative w-full aspect-square max-w-[340px] my-4 flex items-center justify-center p-4 bg-slate-50/70 rounded-2xl border border-slate-100">
              <img
                src={selectedVariant.imageUrl}
                alt={selectedVariant.title}
                className="w-full h-full object-contain drop-shadow-2xl transition-all duration-300 transform hover:scale-105"
              />
            </div>

            {/* Finishes Swatch Selector */}
            <div className="w-full pt-4 border-t border-slate-100 flex flex-col items-center gap-2.5">
              <span className="text-xs font-bold text-slate-500">
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
                          ? 'ring-2 ring-zinc-900 ring-offset-2 scale-110 shadow-sm'
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
              <span className="text-xs font-black text-slate-800">
                {selectedVariant.colorName}
              </span>
            </div>

            {/* Storage capacity pills */}
            {storageOptions.length > 1 && (
              <div className="w-full mt-4 pt-4 border-t border-slate-100 flex items-center justify-center gap-2">
                {storageOptions.map((stg) => (
                  <button
                    key={stg}
                    onClick={() => handleStorageChange(stg)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      selectedVariant.storage === stg
                        ? 'bg-zinc-900 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {stg}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Liquid MF Subvention Card */}
          <div className="zentra-card p-6 text-xs text-slate-700 space-y-2.5 border-l-4 border-l-blue-600">
            <div className="flex items-center gap-2 font-black text-slate-900 text-sm">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              <span>How 1Fi Mutual Fund Backed Financing Works</span>
            </div>
            <p className="leading-relaxed text-slate-600">
              Purchases are financed through high-liquidity mutual fund subvention yields rather than high credit card interest rates (~18-24%), giving you 0% interest on tenures up to 24 months with guaranteed upfront cashbacks.
            </p>
          </div>
        </div>

        {/* Right Column: Dynamic EMI Plans & Live Calculation */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="zentra-card p-6 sm:p-8 space-y-6">
            
            {/* Price Header */}
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                    ₹{selectedVariant.price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-lg text-slate-400 line-through font-medium">
                    ₹{selectedVariant.mrp.toLocaleString('en-IN')}
                  </span>
                </div>
                <h2 className="text-base font-bold text-slate-600 mt-1">
                  EMI plans backed by mutual funds
                </h2>
              </div>
              <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full self-start sm:self-auto">
                Save ₹{(selectedVariant.mrp - selectedVariant.price).toLocaleString('en-IN')}
              </span>
            </div>

            {/* List of Available Dynamic EMI Plans */}
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
                        ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-500/20 shadow-md'
                        : 'border-slate-200/90 bg-white hover:border-slate-300 hover:bg-slate-50/60'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      {/* Monthly Amount and Tenure */}
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-black text-slate-900">
                          ₹{plan.monthlyEmi.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs font-bold text-slate-500">
                          × {plan.tenureMonths} months
                        </span>
                      </div>

                      {/* Interest Rate Tag */}
                      <div className="text-right">
                        <span
                          className={`text-sm font-black ${
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

                    {/* Expanded details when selected */}
                    {isSelected && (
                      <div className="mt-3 pt-3 border-t border-blue-100 flex flex-wrap items-center justify-between text-xs text-slate-600 gap-2 animate-in fade-in duration-150">
                        <div>
                          Total Payable: <strong className="text-slate-900 font-bold">₹{plan.totalPayable.toLocaleString('en-IN')}</strong>
                        </div>
                        <div className="text-blue-700 font-bold flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                          {plan.mutualFundBacking || '1Fi Liquid Alpha Fund'}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Action CTA Button */}
            <div className="pt-4 space-y-3">
              <button
                onClick={() => setIsCheckoutOpen(true)}
                className="w-full py-4 px-6 rounded-2xl bg-zinc-900 hover:bg-zinc-800 active:scale-[0.99] text-white font-black text-sm sm:text-base shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <span>Proceed with ₹{activePlan.monthlyEmi.toLocaleString('en-IN')}/mo Plan</span>
                <ArrowRight className="w-5 h-5 text-orange-400" />
              </button>

              <div className="flex items-center justify-center gap-6 text-[11px] text-slate-500 font-semibold pt-1">
                <span className="flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-emerald-600" /> Instant Digital Approval
                </span>
                <span className="flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-emerald-600" /> No Hidden Bank Charges
                </span>
                <span className="flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-emerald-600" /> 100% Paperless KYC
                </span>
              </div>
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
