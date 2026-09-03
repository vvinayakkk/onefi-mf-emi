import { HTTP_STATUS } from './errors';

export interface ApiResponse<T = unknown> {
  success: boolean;
  statusCode: number;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
  meta?: {
    timestamp: string;
    version: string;
    count?: number;
  };
}

export const APP_CONFIG = {
  NAME: '1Fi Store',
  TAGLINE: 'EMI plans backed by mutual funds',
  CURRENCY_SYMBOL: '₹',
  DEFAULT_CASHBACK: 7500,
  SUPPORTED_TENURES: [3, 6, 12, 24, 36, 48, 60] as const,
  ZERO_INTEREST_THRESHOLD_MONTHS: 24,
  STANDARD_INTEREST_RATE: 10.5,
  MF_ESTIMATED_RETURN_RATE: 12.0, // Annualized return % of backing liquid fund
  API_VERSION: 'v1',
} as const;

export const CATEGORIES = [
  'ALL',
  'SMARTPHONES',
  'LAPTOPS',
  'AUDIO & WEARABLES',
] as const;
