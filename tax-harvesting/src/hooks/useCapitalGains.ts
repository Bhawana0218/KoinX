import { useState, useEffect } from 'react';
import { type CapitalGainsData, type HarvestCalculation, type Holding } from '../types/index';
import { mockCapitalGainsAPI } from '../services/mockApi';
import { calculatePreHarvestGains, calculatePostHarvestGains } from '../utils/calculations';

export const useCapitalGains = () => {
  const [capitalGainsData, setCapitalGainsData] = useState<CapitalGainsData | null>(null);
  const [preHarvestGains, setPreHarvestGains] = useState<HarvestCalculation | null>(null);
  const [postHarvestGains, setPostHarvestGains] = useState<HarvestCalculation | null>(null);
  const [selectedHoldings, setSelectedHoldings] = useState<Holding[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCapitalGains = async () => {
      try {
        setLoading(true);
        const data = await mockCapitalGainsAPI();
        setCapitalGainsData(data);
        const preGains = calculatePreHarvestGains(data);
        setPreHarvestGains(preGains);
        setPostHarvestGains(preGains); // Initially same as pre-harvest
        setError(null);
      } catch (err) {
        setError('Failed to fetch capital gains');
      } finally {
        setLoading(false);
      }
    };

    fetchCapitalGains();
  }, []);

  const updateSelectedHoldings = (holdings: Holding[]) => {
    setSelectedHoldings(holdings);
    if (capitalGainsData) {
      const postGains = calculatePostHarvestGains(capitalGainsData, holdings);
      setPostHarvestGains(postGains);
    }
  };

  const toggleHolding = (holding: Holding, isSelected: boolean) => {
    let newSelected: Holding[];
    if (isSelected) {
      newSelected = [...selectedHoldings, holding];
    } else {
      newSelected = selectedHoldings.filter(h => h.coin !== holding.coin);
    }
    updateSelectedHoldings(newSelected);
  };

  const selectAllHoldings = (allHoldings: Holding[], selectAll: boolean) => {
    if (selectAll) {
      updateSelectedHoldings(allHoldings);
    } else {
      updateSelectedHoldings([]);
    }
  };

  return {
    capitalGainsData,
    preHarvestGains,
    postHarvestGains,
    selectedHoldings,
    loading,
    error,
    toggleHolding,
    selectAllHoldings
  };
};