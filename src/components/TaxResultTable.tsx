'use client';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { TaxCalculationResults } from '@/actions/calculate-tax';

interface TaxResultsTableProps {
  taxCalculationResults: TaxCalculationResults | undefined;
}

export const TaxResultTable: React.FC<TaxResultsTableProps> = ({ taxCalculationResults }) => {
  if (!taxCalculationResults) {
    return <div>No tax calculation results found</div>;
  }

  const {
    grossIncome,
    grossSuperannuationIncome,
    netIncome,
    netSuperannuationIncome,
    superannuationAmount,
    taxAmount,
  } = taxCalculationResults;

  return (
    <Table className="border-2 max-w-full md:max-w-96">
      <TableBody className="border-b-2">
        <TableRow>
          <TableCell className="font-medium border-r-2 text-right">Superannuation:</TableCell>
          <TableCell className="text-left">{formatCurrency(superannuationAmount)}</TableCell>
        </TableRow>
      </TableBody>
      {grossIncome ? (
        <TableBody className="border-b-2">
          <TableRow>
            <TableCell className="font-medium border-r-2 text-right">Gross Income:</TableCell>
            <TableCell className="text-left">{formatCurrency(grossIncome!)}</TableCell>
          </TableRow>
        </TableBody>
      ) : (
        <TableBody className="border-b-2">
          <TableRow>
            <TableCell className="font-medium border-r-2 text-right">
              Gross + Superannuation Income:
            </TableCell>
            <TableCell className="text-left">
              {formatCurrency(grossSuperannuationIncome!)}
            </TableCell>
          </TableRow>
        </TableBody>
      )}
      <TableBody className="border-b-2">
        <TableRow>
          <TableCell className="font-medium border-r-2 text-right">Tax Amount:</TableCell>
          <TableCell className="text-left">{formatCurrency(taxAmount)}</TableCell>
        </TableRow>
      </TableBody>
      <TableBody className="border-b-2">
        <TableRow>
          <TableCell className="font-medium border-r-2 text-right">Net Income:</TableCell>
          <TableCell className="text-left">{formatCurrency(netIncome)}</TableCell>
        </TableRow>
      </TableBody>
      <TableBody className="border-b-2">
        <TableRow>
          <TableCell className="font-medium border-r-2 text-right">
            Net + Superannuation Income:
          </TableCell>
          <TableCell className="text-left">{formatCurrency(netSuperannuationIncome)}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

const formatCurrency = (value: string): string => {
  const formattedValue = Number(value).toLocaleString('en-AU', {
    style: 'currency',
    currency: 'AUD',
  });

  return formattedValue;
};
