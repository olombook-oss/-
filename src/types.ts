export type CalculatorMode =
  | 'standard'
  | 'scientific'
  | 'graphing'
  | 'unit-converter'
  | 'financial'
  | 'ai-assistant';

export type FinancialSubTab = 'loan' | 'discount' | 'tip' | 'zakat';

export type AngleUnit = 'DEG' | 'RAD';

export interface HistoryItem {
  id: string;
  expression: string;
  result: string;
  timestamp: number;
  mode: CalculatorMode;
}

export type ThemeMode = 'dark' | 'navy' | 'neon' | 'light' | 'emerald';

export interface UnitCategory {
  id: string;
  nameAr: string;
  nameEn: string;
  units: {
    id: string;
    nameAr: string;
    symbol: string;
    factorToBase: number; // Factor to convert to base unit
    offset?: number; // Used for temperature (e.g. Celsius to Kelvin)
  }[];
}

export interface CurrencyItem {
  code: string;
  nameAr: string;
  symbol: string;
  rateToUSD: number; // Rate against USD
  flag: string;
}

export interface GraphFunction {
  id: string;
  expression: string;
  color: string;
  visible: boolean;
}
