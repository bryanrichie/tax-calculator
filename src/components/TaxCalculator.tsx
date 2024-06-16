'use client';

import { useState } from 'react';
import { TaxForm } from './TaxForm';
import { TaxResultTable } from './TaxResultTable';
import { TaxCalculationResults } from '@/actions/calculate-tax';

export const TaxCalculator = () => {
  const [taxCalculationResults, setTaxCalculationResults] = useState<TaxCalculationResults>();

  return (
    <main className="flex flex-col items-center p-12 md:p-24 max-w-6xl space-y-14">
      <div className="flex flex-col px-12 md:px-24 max-w-full space-y-2">
        <h1 className="text-4xl font-bold text-left">Tax Calculator</h1>
        <p className="text-left">
          Fill out the form below, select either Gross or Gross + Superannuation and select which
          year you want to calculate your tax amount for
        </p>
      </div>
      <div className="flex flex-col md:flex-row px-12 md:px-24 space-y-2 md:space-y-0 space-x-0 md:space-x-12">
        <TaxForm setTaxCalculationResults={setTaxCalculationResults} />
        <TaxResultTable taxCalculationResults={taxCalculationResults} />
      </div>
    </main>
  );
};
