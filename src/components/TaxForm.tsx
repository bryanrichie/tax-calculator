'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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

const formSchema = z.object({
  superannuationPercentage: z.number().min(10.5, 'Percentage must be at least 10.5%').optional(),
  amountType: z.enum(['gross', 'grossSuperannuation'], {
    required_error: 'You need to select an income amount type.',
  }),
  amount: z.number().min(1, 'Income amount must be more than $0').optional(),
  taxRatesYear: z.enum(['2022-23', '2023-24']).optional(),
});

export const TaxForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      superannuationPercentage: undefined,
      amountType: 'gross',
      amount: undefined,
      taxRatesYear: '2023-24',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
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
                <Input placeholder="Superannuation percentage (minimum 10.5%)" {...field} />
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
                <Input placeholder="Income amount" {...field} />
              </FormControl>
              <FormDescription>
                Enter your income amount according to the amount type selected above.
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
        <Button type="submit">Calculate</Button>
      </form>
    </Form>
  );
};