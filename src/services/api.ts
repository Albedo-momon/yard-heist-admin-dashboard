import axios, { AxiosInstance, AxiosResponse } from 'axios';

// Base API configuration
const API_BASE_URL = 'http://localhost:4000';

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Important for cookies
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    // Get token from cookie (will be handled by browser automatically with httpOnly cookies)
    // For now, we'll check if there's a token in localStorage as fallback
    const token = localStorage.getItem('admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API endpoints
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await apiClient.post('/admin/v1/login', {
      email,
      password,
    });
    return response.data;
  },

  getProfile: async () => {
    const response = await apiClient.get('/admin/v1/admin/profile');
    return response.data;
  },

  updateProfile: async (profileData: { username?: string; email?: string }) => {
    const response = await apiClient.put('/admin/v1/admin/profile', profileData);
    return response.data;
  },
};

export const dashboardAPI = {
  getOverview: async () => {
    const response = await apiClient.get('/admin/v1/dashboard/overview');
    return response.data;
  },
};

export const transactionsAPI = {
  getAllTransactions: async (params?: {
    page?: number;
    limit?: number;
    type?: string;
    status?: string;
    userId?: number;
    dateFrom?: string;
    dateTo?: string;
  }) => {
    const response = await apiClient.get('/admin/v1/transactions', { params });
    return response.data;
  },
};

export default apiClient;