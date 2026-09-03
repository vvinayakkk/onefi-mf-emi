'use client';

import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Sparkles, ArrowRight, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  variantTitle: string;
  variantImage: string;
  variantId: string;
  price: number;
  selectedPlan: {
    tenureMonths: number;
    interestRate: number;
    cashbackAmount: number;
    monthlyEmi: number;
    mutualFundBacking?: string;
  };
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  productName,
  variantTitle,
  variantImage,
  variantId,
  price,
  selectedPlan,
}) => {
  const [formData, setFormData] = useState({
    name: 'Vinayak Sharma',
    email: 'vinayak@example.com',
    phone: '9876543210',
    panNumber: 'ABCDE1234F',
    kycAgreed: true,
  });
  const [loading, setLoading] = useState(false);
  const [orderResult, setOrderResult] = useState<{ orderNumber: string } | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/v1/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: formData.name,
          customerEmail: formData.email,
          customerPhone: formData.phone,
          variantId,
          totalAmount: price,
          downPayment: 0,
          tenureMonths: selectedPlan.tenureMonths,
          monthlyEmi: selectedPlan.monthlyEmi,
          interestRate: selectedPlan.interestRate,
          cashback: selectedPlan.cashbackAmount,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setOrderResult({ orderNumber: data.data.orderNumber });
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      }
    } catch (err) {
      console.error('Checkout failed', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-100 animate-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="p-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-300" />
            <h3 className="font-bold text-lg">1Fi Instant EMI Application</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {orderResult ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-2xl font-bold text-slate-900">EMI Application Approved!</h4>
            <p className="text-sm text-slate-600">
              Your Mutual Fund Backed EMI has been initiated. Your order identifier is:
            </p>
            <div className="p-3 bg-slate-100 rounded-xl font-mono text-indigo-700 font-bold text-base tracking-wider">
              {orderResult.orderNumber}
            </div>
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-left text-xs text-emerald-800 space-y-1">
              <p className="font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> Backed by 1Fi Liquid Alpha Fund
              </p>
              <p>Cashback of ₹{selectedPlan.cashbackAmount.toLocaleString('en-IN')} will be credited upon first EMI clearance.</p>
            </div>
            <button
              onClick={onClose}
              className="w-full py-3 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-colors"
            >
              Done & Return to Store
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Product & Plan summary badge */}
            <div className="flex items-center gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <img
                src={variantImage}
                alt={productName}
                className="w-12 h-12 object-contain rounded-lg bg-white p-1 border border-slate-200"
              />
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">Selected Plan</div>
                <div className="font-bold text-slate-900 text-sm truncate">{productName}</div>
                <div className="text-xs text-slate-500">
                  ₹{selectedPlan.monthlyEmi.toLocaleString('en-IN')}/mo × {selectedPlan.tenureMonths} mos ({selectedPlan.interestRate}% int)
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-slate-400">Total Price</div>
                <div className="font-bold text-slate-900 text-sm">₹{price.toLocaleString('en-IN')}</div>
              </div>
            </div>

            {/* Applicant details */}
            <div className="space-y-3 text-sm">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 text-sm"
                  placeholder="e.g. John Doe"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile Number</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 text-sm"
                    placeholder="9876543210"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">PAN Number</label>
                  <input
                    type="text"
                    required
                    value={formData.panNumber}
                    onChange={(e) => setFormData({ ...formData, panNumber: e.target.value.toUpperCase() })}
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 uppercase text-sm"
                    placeholder="ABCDE1234F"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 text-sm"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="flex items-start gap-2 pt-1">
              <input
                type="checkbox"
                id="kyc"
                checked={formData.kycAgreed}
                onChange={(e) => setFormData({ ...formData, kycAgreed: e.target.checked })}
                className="mt-0.5 rounded text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="kyc" className="text-[11px] text-slate-500 leading-tight">
                I authorize 1Fi to check my CIBIL score and verify KYC for Mutual Fund pledge financing.
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !formData.kycAgreed}
              className="w-full py-3.5 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-200 transition-all text-sm"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Verifying & Processing...
                </>
              ) : (
                <>
                  Confirm & Activate EMI Plan <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
