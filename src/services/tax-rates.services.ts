import { taxRatesData } from '@/data/tax-rates';

interface TaxRatesData {
  [key: string]: {
    lowerRange: number;
    upperRange: number;
    base: number;
    rate: number;
    over: number;
  }[];
}

export const getTaxRates = (taxRatesYear: string) => {
  try {
    const fetchedTaxRates = taxRatesData as TaxRatesData;
    const taxRates = fetchedTaxRates[taxRatesYear];

    if (!taxRates) throw new Error('Could not find tax rates for this year');

    return taxRates;
  } catch (error) {
    console.error(error);
  }
};
