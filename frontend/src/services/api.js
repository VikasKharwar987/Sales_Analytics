import axios from 'axios';

// Get base URL from environment variables, defaulting to '/api' for proxy setup
const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

// Create central Axios instance
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Fetch KPI metrics and monthly sales trend data for the dashboard.
 */
export const getDashboardData = async () => {
  try {
    const response = await apiClient.get('/dashboard');
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    throw error;
  }
};

/**
 * Upload store.csv and train.csv files to the backend.
 * Uses multipart/form-data for file uploads.
 */
export const uploadDataset = async (storeFile, salesFile) => {
  try {
    const formData = new FormData();
    formData.append('store_file', storeFile);
    formData.append('sales_file', salesFile);

    const response = await apiClient.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading dataset:', error);
    throw error;
  }
};

/**
 * Submit input feature values to the backend to get a sales prediction.
 */
export const predictSales = async (predictionData) => {
  try {
    const response = await apiClient.post('/predict', predictionData);
    return response.data;
  } catch (error) {
    console.error('Error in sales prediction:', error);
    throw error;
  }
};

/**
 * Submit a new sales record to the database.
 */
export const addSalesRecord = async (salesData) => {
  try {
    const response = await apiClient.post('/sales', salesData);
    return response.data;
  } catch (error) {
    console.error('Error adding sales record:', error);
    throw error;
  }
};

export default apiClient;
