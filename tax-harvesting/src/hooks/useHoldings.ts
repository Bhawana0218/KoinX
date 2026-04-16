import { useState, useEffect } from 'react';
import { type Holding } from '../types/index';
import { mockHoldingsAPI } from '../services/mockApi';

export const useHoldings = () => {
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHoldings = async () => {
      try {
        setLoading(true);
        const data = await mockHoldingsAPI();
        setHoldings(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch holdings');
      } finally {
        setLoading(false);
      }
    };

    fetchHoldings();
  }, []);

  return { holdings, loading, error };
};