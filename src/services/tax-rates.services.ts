import { taxRatesData } from '@/data/tax-rates';
import { TaxRates } from '@/types/tax-calculator.types';

export type TaxRatesYear = keyof typeof taxRatesData;

export const getTaxRates = (taxRatesYear: TaxRatesYear): TaxRates[] => {
  return taxRatesData[taxRatesYear];
};
