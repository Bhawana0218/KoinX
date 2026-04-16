import { type Holding, type HarvestCalculation, type CapitalGainsData } from '../types/index';

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export const formatNumber = (value: number, decimals: number = 4): string => {
  return value.toLocaleString('en-IN', {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  });
};

export const calculatePreHarvestGains = (data: CapitalGainsData): HarvestCalculation => {
  const stcgNetGain = data.capitalGains.stcg.profits - data.capitalGains.stcg.losses;
  const ltcgNetGain = data.capitalGains.ltcg.profits - data.capitalGains.ltcg.losses;
  
  return {
    stcg: {
      profits: data.capitalGains.stcg.profits,
      losses: data.capitalGains.stcg.losses,
      netGain: stcgNetGain
    },
    ltcg: {
      profits: data.capitalGains.ltcg.profits,
      losses: data.capitalGains.ltcg.losses,
      netGain: ltcgNetGain
    },
    realisedCapitalGains: stcgNetGain + ltcgNetGain
  };
};

export const calculatePostHarvestGains = (
  baseData: CapitalGainsData,
  selectedHoldings: Holding[]
): HarvestCalculation => {
  let stcgProfits = baseData.capitalGains.stcg.profits;
  let stcgLosses = baseData.capitalGains.stcg.losses;
  let ltcgProfits = baseData.capitalGains.ltcg.profits;
  let ltcgLosses = baseData.capitalGains.ltcg.losses;

  selectedHoldings.forEach(holding => {
    // Process STCG
    if (holding.stcg.gain > 0) {
      stcgProfits += holding.stcg.gain;
    } else if (holding.stcg.gain < 0) {
      stcgLosses += Math.abs(holding.stcg.gain);
    }

    // Process LTCG
    if (holding.ltcg.gain > 0) {
      ltcgProfits += holding.ltcg.gain;
    } else if (holding.ltcg.gain < 0) {
      ltcgLosses += Math.abs(holding.ltcg.gain);
    }
  });

  const stcgNetGain = stcgProfits - stcgLosses;
  const ltcgNetGain = ltcgProfits - ltcgLosses;

  return {
    stcg: {
      profits: stcgProfits,
      losses: stcgLosses,
      netGain: stcgNetGain
    },
    ltcg: {
      profits: ltcgProfits,
      losses: ltcgLosses,
      netGain: ltcgNetGain
    },
    realisedCapitalGains: stcgNetGain + ltcgNetGain
  };
};

export const calculateSavings = (preGains: number, postGains: number): number => {
  if (preGains > postGains) {
    // Assuming 30% tax rate for calculation
    return (preGains - postGains) * 0.30;
  }
  return 0;
};