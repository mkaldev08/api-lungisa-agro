export const estimateFinancialLoss = (overApplicationKg: number): number => {
  const estimatedUsdPerKg = 0.6;

  return Math.round(overApplicationKg * estimatedUsdPerKg * 100) / 100;
};
