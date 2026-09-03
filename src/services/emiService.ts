import { APP_CONFIG } from '@/constants/app';

export interface EmiCalculationInput {
  principalAmount: number;
  tenureMonths: number;
  annualInterestRate: number;
  downPayment?: number;
  cashbackAmount?: number;
}

export interface EmiBreakdown {
  principal: number;
  downPayment: number;
  loanAmount: number;
  tenureMonths: number;
  annualInterestRate: number;
  monthlyEmi: number;
  totalPayable: number;
  totalInterest: number;
  cashback: number;
  effectiveCost: number;
  mutualFundGrowthEstimate: number; // Projected returns if equivalent EMI was invested in MF
  savingsVersusCreditCard: number;
}

/**
 * Clean business logic service for EMI calculation & Mutual Fund backed amortization
 */
export class EmiCalculationService {
  /**
   * Calculates monthly EMI using the standard reducing balance formula or zero-interest division
   */
  public static calculate(input: EmiCalculationInput): EmiBreakdown {
    const downPayment = Math.max(0, input.downPayment ?? 0);
    const loanAmount = Math.max(0, input.principalAmount - downPayment);
    const tenure = input.tenureMonths;
    const annualRate = input.annualInterestRate;
    const cashback = input.cashbackAmount ?? 0;

    let monthlyEmi = 0;
    let totalInterest = 0;

    if (annualRate <= 0) {
      // 0% No Cost EMI backed by brand subvention / MF liquid yields
      monthlyEmi = Math.round(loanAmount / tenure);
      totalInterest = 0;
    } else {
      // Standard Equated Monthly Installment (reducing balance)
      // EMI = [P x R x (1+R)^N]/[(1+R)^N-1]
      const monthlyRate = annualRate / (12 * 100);
      const factor = Math.pow(1 + monthlyRate, tenure);
      monthlyEmi = Math.round((loanAmount * monthlyRate * factor) / (factor - 1));
      totalInterest = Math.round(monthlyEmi * tenure - loanAmount);
    }

    const totalPayable = monthlyEmi * tenure + downPayment;
    const effectiveCost = totalPayable - cashback;

    // Projected returns if cashback & monthly subvention accrued at MF growth rate (~12% p.a.)
    const mfAnnualRate = APP_CONFIG.MF_ESTIMATED_RETURN_RATE / 100;
    const mfMonthlyRate = mfAnnualRate / 12;
    const mfFutureValue = Math.round(
      cashback * Math.pow(1 + mfMonthlyRate, tenure) - cashback
    );

    // Standard credit card EMI charges ~16% p.a. + 18% GST on interest
    const ccRate = 16 / (12 * 100);
    const ccFactor = Math.pow(1 + ccRate, tenure);
    const ccEmi = (loanAmount * ccRate * ccFactor) / (ccFactor - 1);
    const ccTotal = ccEmi * tenure + downPayment;
    const savingsVersusCreditCard = Math.max(0, Math.round(ccTotal - effectiveCost));

    return {
      principal: input.principalAmount,
      downPayment,
      loanAmount,
      tenureMonths: tenure,
      annualInterestRate: annualRate,
      monthlyEmi,
      totalPayable,
      totalInterest,
      cashback,
      effectiveCost,
      mutualFundGrowthEstimate: mfFutureValue,
      savingsVersusCreditCard,
    };
  }

  /**
   * Generates full standard EMI plan offerings for a given product price
   */
  public static generateDefaultPlans(price: number) {
    const tenures = [3, 6, 12, 24, 36, 48, 60] as const;
    return tenures.map((tenure) => {
      const isZeroCost = tenure <= APP_CONFIG.ZERO_INTEREST_THRESHOLD_MONTHS;
      const rate = isZeroCost ? 0 : APP_CONFIG.STANDARD_INTEREST_RATE;
      const cashback = APP_CONFIG.DEFAULT_CASHBACK;
      const breakdown = this.calculate({
        principalAmount: price,
        tenureMonths: tenure,
        annualInterestRate: rate,
        cashbackAmount: cashback,
      });

      return {
        tenureMonths: tenure,
        interestRate: rate,
        cashbackAmount: cashback,
        monthlyEmi: breakdown.monthlyEmi,
        totalPayable: breakdown.totalPayable,
        isPopular: tenure === 12 || tenure === 24,
        mutualFundBacking: '1Fi Liquid Alpha Fund',
      };
    });
  }
}
