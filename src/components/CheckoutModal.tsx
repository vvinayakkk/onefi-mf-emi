'use client';

import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, ArrowRight, Loader2 } from 'lucide-react';

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
      }
    } catch (err) {
      console.error('Order creation failed', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base text-slate-900">1Fi EMI Application</h3>
            <p className="text-xs text-slate-500">Mutual Fund Subvented Financing</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {orderResult ? (
          <div className="p-6 text-center space-y-4">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="text-lg font-bold text-slate-900">Application Submitted</h4>
              <p className="text-xs text-slate-500">
                Your mutual fund backed EMI application has been saved to the database.
              </p>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg font-mono text-slate-800 font-semibold text-xs border border-slate-200">
              Order ID: {orderResult.orderNumber}
            </div>
            <button
              onClick={onClose}
              className="w-full py-2.5 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Product & Plan summary */}
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
              <img
                src={variantImage}
                alt={productName}
                className="w-10 h-10 object-contain mix-blend-multiply"
              />
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-slate-900 text-xs truncate">{productName}</div>
                <div className="text-[11px] text-slate-500">
                  ₹{selectedPlan.monthlyEmi.toLocaleString('en-IN')}/mo × {selectedPlan.tenureMonths} mos ({selectedPlan.interestRate}% interest)
                </div>
              </div>
              <div className="text-right font-bold text-slate-900 text-xs">
                ₹{price.toLocaleString('en-IN')}
              </div>
            </div>

            {/* Applicant details */}
            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-md border border-slate-300 focus:outline-none focus:ring-1 focus:ring-slate-900 text-slate-900 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Mobile Number</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-md border border-slate-300 focus:outline-none focus:ring-1 focus:ring-slate-900 text-slate-900 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">PAN Number</label>
                  <input
                    type="text"
                    required
                    value={formData.panNumber}
                    onChange={(e) => setFormData({ ...formData, panNumber: e.target.value.toUpperCase() })}
                    className="w-full px-3 py-2 rounded-md border border-slate-300 focus:outline-none focus:ring-1 focus:ring-slate-900 text-slate-900 uppercase text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-md border border-slate-300 focus:outline-none focus:ring-1 focus:ring-slate-900 text-slate-900 text-xs"
                />
              </div>
            </div>

            <div className="flex items-start gap-2 pt-1">
              <input
                type="checkbox"
                id="kyc"
                checked={formData.kycAgreed}
                onChange={(e) => setFormData({ ...formData, kycAgreed: e.target.checked })}
                className="mt-0.5 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
              />
              <label htmlFor="kyc" className="text-[11px] text-slate-500">
                I agree to the terms of mutual fund backed financing.
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !formData.kycAgreed}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-lg font-medium text-xs flex items-center justify-center gap-2 transition-colors"
            >
              {loading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" /> Processing...
                </>
              ) : (
                <>
                  <span>Submit Application</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
