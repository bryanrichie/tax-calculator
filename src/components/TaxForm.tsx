'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { calculateTax } from '@/actions/calculate-tax';
import { useEffect } from 'react';
import { TaxRatesYear } from '@/services/tax-rates.services';
import { TaxFormProps } from '@/types/tax-calculator.types';

const formSchema = z.object({
  superannuationPercentage: z.coerce.number().refine(
    (value) => {
      const percentageValue = Number(value);
      return percentageValue >= 10.5 && percentageValue <= 100;
    },
    {
      message: 'Superannuation must be at least 10.5% and must not exceed 100%',
    }
  ),
  amountType: z.enum(['gross', 'grossSuperannuation']),
  amount: z.coerce.number().refine(
    (value) => {
      const amountValue = Number(value);
      return amountValue > 0;
    },
    {
      message: 'Income must exceeed $0',
    }
  ),
  taxRatesYear: z.enum(['2022-23', '2023-24']),
});

export const TaxForm: React.FC<TaxFormProps> = ({ setTaxCalculationResults }) => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      superannuationPercentage: 11,
      amountType: 'gross',
      amount: 100000,
      taxRatesYear: '2023-24',
    },
  });

  useEffect(() => {
    const fetchInitialData = async () => {
      const taxResults = await calculateTax({
        superannuationPercentage: 11,
        amountType: 'gross',
        amount: 100000,
        taxRatesYear: '2023-24',
      });

      setTaxCalculationResults(taxResults);
    };

    fetchInitialData();
  }, []);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const superannuationPercentage = Number(values.superannuationPercentage);
    const amountType = values.amountType;
    const amount = Number(values.amount);
    const taxRatesYear: TaxRatesYear = values.taxRatesYear;

    try {
      const taxResults = await calculateTax({
        superannuationPercentage,
        amountType,
        amount,
        taxRatesYear,
      });

      setTaxCalculationResults(taxResults);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Something went wrong!',
        description:
          error instanceof Error ? error.message : 'Error calculating tax, please try again.',
      });
      console.log(error instanceof Error ? error.message : 'Error calculating tax');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full max-w-xl">
        <FormField
          control={form.control}
          name="superannuationPercentage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Superannuation Percentage (%)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Superannuation percentage (minimum 10.5%)"
                  {...field}
                />
              </FormControl>
              <FormDescription>Enter your superannuation percentage.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amountType"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Income Amount Type</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-row gap-6"
                >
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="gross" />
                    </FormControl>
                    <FormLabel className="font-normal">Gross</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="grossSuperannuation" />
                    </FormControl>
                    <FormLabel className="font-normal">Gross + Superannuation</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormDescription>Select your gross income amount type.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Income Amount ($)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Income amount" {...field} />
              </FormControl>
              <FormDescription>
                Enter your income amount to match the income amount type that you have selected
                above.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="taxRatesYear"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tax Rates Year</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a tax rates year" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="2023-24">2023-24</SelectItem>
                  <SelectItem value="2022-23">2022-23</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Select a tax rates year with the dropdown.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={form.formState.isLoading}>
          Calculate
        </Button>
      </form>
    </Form>
  );
};
