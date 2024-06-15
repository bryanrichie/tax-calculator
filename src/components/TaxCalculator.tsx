'use client';

import { useState } from 'react';
import { TaxForm } from './TaxForm';

export const TaxCalculator = () => {
  const [tax, setTax] = useState(1);

  return (
    <div>
      <TaxForm setTax={setTax} />
      {/* <TaxResultTable tax={tax} /> */}
    </div>
  );
};
