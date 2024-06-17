'use client';

import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { formatCurrency } from '@/helper/helper';
import { TaxResultsTableProps } from '@/types/tax-calculator.types';

export const TaxResultTable: React.FC<TaxResultsTableProps> = ({ taxCalculationResults }) => {
  const {
    grossIncome,
    grossSuperannuationIncome,
    netIncome,
    netSuperannuationIncome,
    superannuationAmount,
    taxAmount,
  } = taxCalculationResults;

  return (
    <Table className="table">
      <TableBody className="table-body">
        <TableRow>
          <TableCell className="table-cell">Superannuation:</TableCell>
          <TableCell className="text-left">{formatCurrency(superannuationAmount)}</TableCell>
        </TableRow>
      </TableBody>
      {grossIncome ? (
        <TableBody className="table-body">
          <TableRow>
            <TableCell className="table-cell">Gross Income:</TableCell>
            <TableCell className="text-left">{formatCurrency(grossIncome!)}</TableCell>
          </TableRow>
        </TableBody>
      ) : (
        <TableBody className="table-body">
          <TableRow>
            <TableCell className="table-cell">Gross + Superannuation Income:</TableCell>
            <TableCell className="text-left">
              {formatCurrency(grossSuperannuationIncome!)}
            </TableCell>
          </TableRow>
        </TableBody>
      )}
      <TableBody className="table-body">
        <TableRow>
          <TableCell className="table-cell">Tax Amount:</TableCell>
          <TableCell className="text-left">{formatCurrency(taxAmount)}</TableCell>
        </TableRow>
      </TableBody>
      <TableBody className="table-body">
        <TableRow>
          <TableCell className="table-cell">Net Income:</TableCell>
          <TableCell className="text-left">{formatCurrency(netIncome)}</TableCell>
        </TableRow>
      </TableBody>
      <TableBody className="table-body">
        <TableRow>
          <TableCell className="table-cell">Net + Superannuation Income:</TableCell>
          <TableCell className="text-left">{formatCurrency(netSuperannuationIncome)}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
