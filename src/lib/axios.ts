import axios from 'axios';

// Create a base API URL - replace with your actual API base URL
export const baseURL = 'http://localhost:3000';

// Create a single axios instance for the app
const axiosInstance = axios.create({
  baseURL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token, etc.
axiosInstance.interceptors.request.use(
  (config) => {
    // Get token from localStorage or other storage
    const token = localStorage.getItem('auth_token');
    
    // If token exists, add it to the headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling common errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors like 401 Unauthorized
    if (error.response?.status === 401) {
      // Handle unauthorized error (e.g., redirect to login)
      localStorage.removeItem('auth_token');
      // You might want to redirect to login page or dispatch a logout action
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance; 