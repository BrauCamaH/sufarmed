const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export const formatToCurrency = (n: number): string => {
  return formatter.format(n);
};

export const capitalizeWord = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};
