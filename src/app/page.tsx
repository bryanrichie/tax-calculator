'use server';

import { TaxCalculator } from '@/components/TaxCalculator';
import { Toaster } from '@/components/ui/toaster';

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-column items-center justify-center">
      <TaxCalculator />
      <Toaster />
    </main>
  );
}
