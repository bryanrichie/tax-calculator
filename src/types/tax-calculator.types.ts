import { TaxRatesYear } from '@/services/tax-rates.services';

export interface TaxCalculationResults {
  superannuationAmount: number;
  grossIncome?: number;
  grossSuperannuationIncome?: number;
  taxAmount: number;
  netIncome: number;
  netSuperannuationIncome: number;
}

export interface TaxResultsTableProps {
  taxCalculationResults: TaxCalculationResults;
}

export interface TaxFormProps {
  setTaxCalculationResults: React.Dispatch<React.SetStateAction<TaxCalculationResults | undefined>>;
}

export interface TaxRates {
  lowerRange: number;
  upperRange: number;
  base: number;
  rate: number;
  over: number;
}

export interface CalculateTaxPayload {
  superannuationPercentage: number;
  amountType: string;
  amount: number;
  taxRatesYear: TaxRatesYear;
}
