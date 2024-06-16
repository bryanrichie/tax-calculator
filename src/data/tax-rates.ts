export const taxRatesData = {
  '2023-24': [
    { lowerRange: 0, upperRange: 18200, base: 0, rate: 0, over: 0 },
    {
      lowerRange: 18201,
      upperRange: 45000,
      base: 0,
      rate: 0.19,
      over: 18200,
    },
    {
      lowerRange: 45001,
      upperRange: 120000,
      base: 5092,
      rate: 0.325,
      over: 45000,
    },
    {
      lowerRange: 120001,
      upperRange: 180000,
      base: 29467,
      rate: 0.37,
      over: 120000,
    },
    {
      lowerRange: 180001,
      upperRange: 0,
      base: 54232,
      rate: 0.45,
      over: 180000,
    },
  ],
};
