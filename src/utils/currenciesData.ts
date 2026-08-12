import { CurrencyItem } from '../types';

export const CURRENCIES: CurrencyItem[] = [
  { code: 'SAR', nameAr: 'ريال سعودي', symbol: 'ر.س', rateToUSD: 3.75, flag: '🇸🇦' },
  { code: 'USD', nameAr: 'دولار أمريكي', symbol: '$', rateToUSD: 1.0, flag: '🇺🇸' },
  { code: 'AED', nameAr: 'درهم إماراتي', symbol: 'د.إ', rateToUSD: 3.67, flag: '🇦🇪' },
  { code: 'EGP', nameAr: 'جنيه مصري', symbol: 'ج.م', rateToUSD: 48.5, flag: '🇪🇬' },
  { code: 'EUR', nameAr: 'يورو أوروبي', symbol: '€', rateToUSD: 0.92, flag: '🇪🇺' },
  { code: 'KWD', nameAr: 'دينار كويتي', symbol: 'د.ك', rateToUSD: 0.31, flag: '🇰🇼' },
  { code: 'QAR', nameAr: 'ريال قطري', symbol: 'ر.ق', rateToUSD: 3.64, flag: '🇶🇦' },
  { code: 'BHD', nameAr: 'دينار بحريني', symbol: 'د.ب', rateToUSD: 0.38, flag: '🇧🇭' },
  { code: 'OMR', nameAr: 'ريال عماني', symbol: 'ر.ع', rateToUSD: 0.385, flag: '🇴🇲' },
  { code: 'JOD', nameAr: 'دينار أردني', symbol: 'د.أ', rateToUSD: 0.71, flag: '🇯🇴' },
  { code: 'GBP', nameAr: 'جنيه إسترليني', symbol: '£', rateToUSD: 0.78, flag: '🇬🇧' },
  { code: 'TRY', nameAr: 'ليرة تركية', symbol: '₺', rateToUSD: 33.5, flag: '🇹🇷' },
  { code: 'JPY', nameAr: 'ين ياباني', symbol: '¥', rateToUSD: 154.0, flag: '🇯🇵' },
  { code: 'CNY', nameAr: 'يوان صيني', symbol: '¥', rateToUSD: 7.23, flag: '🇨🇳' },
];

export function convertCurrency(
  amount: number,
  fromCode: string,
  toCode: string,
  customRates?: Record<string, number>
): number {
  if (isNaN(amount) || amount === 0) return 0;
  if (fromCode === toCode) return amount;

  const getRate = (code: string) => {
    if (customRates && customRates[code]) return customRates[code];
    const curr = CURRENCIES.find((c) => c.code === code);
    return curr ? curr.rateToUSD : 1;
  };

  const fromRateUSD = getRate(fromCode);
  const toRateUSD = getRate(toCode);

  // Convert from input currency to USD first
  const amountUSD = amount / fromRateUSD;
  // Convert from USD to target currency
  return amountUSD * toRateUSD;
}
