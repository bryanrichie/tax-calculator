export const formatResult = (result: number): number => {
  return Number(result.toFixed(2));
};

export const formatCurrency = (value: number): string => {
  const formattedValue = Number(value).toLocaleString('en-AU', {
    style: 'currency',
    currency: 'AUD',
  });

  return formattedValue;
};
