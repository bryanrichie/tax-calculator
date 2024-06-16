import { taxRatesData } from '@/data/tax-rates';

interface TaxRates {
  lowerRange: number;
  upperRange: number;
  base: number;
  rate: number;
  over: number;
}

export type TaxRatesYear = keyof typeof taxRatesData;

export const getTaxRates = (taxRatesYear: TaxRatesYear): TaxRates[] | null => {
  return taxRatesData[taxRatesYear] || null;
};
