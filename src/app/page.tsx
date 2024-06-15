'use server';

import { TaxForm } from '@/components/TaxForm';
import { useEffect, useState } from 'react';
import { NextApiRequest, NextApiResponse } from 'next';
import { TaxCalculator } from '@/components/TaxCalculator';

export const Home = () => {
  return (
    <main className="flex min-h-screen flex-column items-center justify-between p-24">
      <TaxCalculator />
    </main>
  );
};

export default Home;
