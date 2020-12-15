const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export const formatToCurrency = (n: number): string => {
  return formatter.format(n);
};
