'use client';

import { useState } from 'react';
import { TaxForm } from './TaxForm';
import { TaxResultTable } from './TaxResultTable';
import { TaxCalculationResults } from '@/actions/calculate-tax';

export const TaxCalculator = () => {
  const [taxCalculationResults, setTaxCalculationResults] = useState<TaxCalculationResults>();

  return (
    <div className="flex flex-col md:flex-row p-12 md:p-24 space-y-12 md:space-y-0 space-x-0 md:space-x-12">
      <TaxForm setTaxCalculationResults={setTaxCalculationResults} />
      {taxCalculationResults ? (
        <TaxResultTable taxCalculationResults={taxCalculationResults} />
      ) : null}
    </div>
  );
};
