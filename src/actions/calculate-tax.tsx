'use server';

import { formatResult } from '@/helper/helper';
import { getTaxRates } from '@/services/tax-rates.services';
import { CalculateTaxPayload, TaxCalculationResults } from '@/types/tax-calculator.types';

export const calculateTax = async (
  payload: CalculateTaxPayload
): Promise<TaxCalculationResults> => {
  try {
    const { superannuationPercentage, amountType, amount, taxRatesYear } = payload;
    const superannuationPercent = superannuationPercentage / 100;

    const taxRates = await getTaxRates(taxRatesYear);

    if (!taxRates || taxRates.length === 0)
      throw new Error('Tax rates for the selected year could not be found');

    const taxBracket = taxRates.find(
      (bracket) =>
        amount >= bracket.lowerRange && (bracket.upperRange === 0 || amount <= bracket.upperRange)
    );

    if (!taxBracket) throw new Error('No applicable tax bracket found');

    const { base, rate, over } = taxBracket;
    const amountToTax = amount - over;
    const taxAmount = base ? base + amountToTax * rate : amountToTax * rate;

    if (amountType === 'gross') {
      const superannuationAmount = Math.round(amount * superannuationPercent);
      const grossSuperannuationIncome = amount + superannuationAmount;
      const netIncome = Math.max(amount - taxAmount);
      const netSuperannuationIncome = netIncome + superannuationAmount;

      return {
        superannuationAmount: formatResult(superannuationAmount),
        grossSuperannuationIncome: formatResult(grossSuperannuationIncome),
        taxAmount: formatResult(taxAmount),
        netIncome: formatResult(netIncome),
        netSuperannuationIncome: formatResult(netSuperannuationIncome),
      };
    } else {
      const grossIncome = amount / (1 + superannuationPercent);
      const superannuationAmount = amount - grossIncome;
      const netIncome = Math.max(grossIncome - taxAmount);
      const netSuperannuationIncome = netIncome + superannuationAmount;

      return {
        superannuationAmount: formatResult(superannuationAmount),
        grossIncome: formatResult(grossIncome),
        taxAmount: formatResult(taxAmount),
        netIncome: formatResult(netIncome),
        netSuperannuationIncome: formatResult(netSuperannuationIncome),
      };
    }
  } catch (error) {
    console.error(error);
    throw new Error(
      error instanceof Error ? error.message : 'An unknown error has occured, please try again.'
    );
  }
};
