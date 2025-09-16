import { useState, useEffect, useCallback } from 'react';
import { transactionsAPI } from '@/services/api';

export interface TransactionData {
  id: number;
  type: 'DEPOSIT' | 'WITHDRAWAL' | 'BET' | 'WIN';
  amount: number;
  amount_crypto?: number;
  gems_amount?: number;
  status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';
  createdAt: string;
  updatedAt: string;
  user_id: number;
  wallet_address?: string;
  transaction_hash?: string;
  user: {
    id: number;
    email: string;
    username: string;
  };
}

export interface TransactionsResponse {
  success: boolean;
  data: {
    transactions: TransactionData[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalCount: number;
      limit: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
    };
  };
}

export interface TransactionFilters {
  page?: number;
  limit?: number;
  type?: string;
  status?: string;
  userId?: number;
  dateFrom?: string;
  dateTo?: string;
}

export const useTransactions = (initialFilters: TransactionFilters = {}) => {
  const [data, setData] = useState<TransactionsResponse['data'] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<TransactionFilters>({
    page: 1,
    limit: 10,
    ...initialFilters,
  });

  const fetchTransactions = useCallback(async (newFilters?: TransactionFilters) => {
    try {
      setLoading(true);
      setError(null);
      
      const currentFilters = newFilters || filters;
      const response = await transactionsAPI.getAllTransactions(currentFilters);
      
      if (response.success) {
        setData(response.data);
      } else {
        setError('Failed to fetch transactions');
      }
    } catch (err: any) {
      console.error('Error fetching transactions:', err);
      setError(err.response?.data?.message || 'Unable to load transactions');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const updateFilters = useCallback((newFilters: Partial<TransactionFilters>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    fetchTransactions(updatedFilters);
  }, [filters, fetchTransactions]);

  const refetch = useCallback(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const goToPage = useCallback((page: number) => {
    updateFilters({ page });
  }, [updateFilters]);

  const changeLimit = useCallback((limit: number) => {
    updateFilters({ page: 1, limit });
  }, [updateFilters]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  return {
    data,
    loading,
    error,
    filters,
    updateFilters,
    refetch,
    goToPage,
    changeLimit,
  };
};