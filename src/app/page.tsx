'use server';

import { TaxForm } from '@/components/TaxForm';
import { useEffect, useState } from 'react';
import { NextApiRequest, NextApiResponse } from 'next';
import { TaxCalculator } from '@/components/TaxCalculator';

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-column items-center justify-between p-24">
      <TaxCalculator />
    </main>
  );
}
