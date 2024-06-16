'use server';

import { getTaxRates } from '@/services/tax-rates.services';

interface CalculateTaxPayload {
  superannuationPercentage: number;
  amountType: string;
  amount: number;
  taxRatesYear: string;
}

export interface TaxCalculationResults {
  superannuationAmount: string;
  grossIncome?: string;
  grossSuperannuationIncome?: string;
  taxAmount: string;
  netIncome: string;
  netSuperannuationIncome: string;
}

export const calculateTax = async (payload: CalculateTaxPayload) => {
  try {
    const { superannuationPercentage, amountType, amount, taxRatesYear } = payload;
    const superannuationPercent = superannuationPercentage / 100;

    const taxRates = await getTaxRates(taxRatesYear);

    if (!taxRates) throw new Error('Tax rates for the selected year could not be found');

    const taxBracket = taxRates.find(
      (bracket) =>
        amount >= bracket.lowerRange && (bracket.upperRange === 0 || amount <= bracket.upperRange)
    );

    if (!taxBracket) throw new Error('No applicable tax bracket found');

    const { base, rate, over } = taxBracket;
    const amountToTax = amount - over;
    const taxAmount = base ? base + amountToTax * rate : amountToTax * rate;

    const taxRatesResults: TaxCalculationResults = {
      superannuationAmount: '',
      grossIncome: undefined,
      grossSuperannuationIncome: undefined,
      taxAmount: '',
      netIncome: '',
      netSuperannuationIncome: '',
    };

    taxRatesResults.taxAmount = formatResult(taxAmount);

    if (amountType === 'gross') {
      const superannuationAmount = Math.round(amount * superannuationPercent);
      const grossSuperannuationIncome = amount + superannuationAmount;
      const netIncome = Math.max(amount - taxAmount);
      const netSuperannuationIncome = netIncome + superannuationAmount;

      taxRatesResults.netIncome = formatResult(netIncome);
      taxRatesResults.grossSuperannuationIncome = formatResult(grossSuperannuationIncome);
      taxRatesResults.superannuationAmount = formatResult(superannuationAmount);
      taxRatesResults.netSuperannuationIncome = formatResult(netSuperannuationIncome);
    }

    if (amountType === 'grossSuperannuation') {
      const grossIncome = amount / (1 + superannuationPercent);
      const superannuationAmount = amount - grossIncome;
      const netIncome = Math.max(grossIncome - taxAmount);
      const netSuperannuationIncome = netIncome + superannuationAmount;

      taxRatesResults.netIncome = formatResult(netIncome);
      taxRatesResults.grossIncome = formatResult(grossIncome);
      taxRatesResults.superannuationAmount = formatResult(superannuationAmount);
      taxRatesResults.netSuperannuationIncome = formatResult(netSuperannuationIncome);
    }

    return taxRatesResults;
  } catch (error) {
    console.error(error);
    throw new Error(
      error instanceof Error ? error.message : 'An unknown error has occured, please try again.'
    );
  }
};

const formatResult = (result: number) => {
  return result.toFixed(2);
};
