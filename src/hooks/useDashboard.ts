import { useState, useEffect } from 'react';
import { dashboardAPI } from '@/services/api';

interface DashboardData {
  users: {
    total: number;
    active: number;
    growth: string;
  };
  transactions: {
    volume: number;
    count: number;
    growth: string;
  };
  games: {
    total: number;
    today: number;
  };
}

interface UseDashboardReturn {
  data: DashboardData | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useDashboard = (): UseDashboardReturn => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await dashboardAPI.getOverview();
      
      if (response.success && response.data) {
        setData(response.data);
      } else {
        throw new Error('Failed to load dashboard data');
      }
    } catch (err) {
      console.error('Dashboard API error:', err);
      setError('Failed to load dashboard data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return {
    data,
    loading,
    error,
    refetch: fetchDashboardData,
  };
};