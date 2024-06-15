'use server';

interface CalculateTaxPayload {
  superannuationPercentage: number;
  amountType: string;
  amount: number;
  taxRatesYear: string;
}

const fetchTaxRates = async () => {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  const response = await fetch(`${baseURL}/api/tax-rates`);
  const data = await response.json();

  return { taxRates: data };
};

export const calculateTax = async (payload: CalculateTaxPayload) => {
  console.log(payload);
  const { taxRates } = await fetchTaxRates();
  console.log('taxRates', taxRates);
  return taxRates;
};
export default calculateTax;
