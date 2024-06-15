'use server';

import { NextResponse } from 'next/server';
import { taxRates } from '@/data/taxRates';

export async function GET() {
  return NextResponse.json(taxRates);
}
