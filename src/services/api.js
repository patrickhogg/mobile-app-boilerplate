import axios from 'axios';
import { useSettingsStore } from '../stores/settings'; // Example: To access auth tokens later

// 1. Create the Axios instance
const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com', // Replace with your real API URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 2. Request Interceptor
api.interceptors.request.use(
  (config) => {
    // Example: Attach Token if it exists
    // const token = useSettingsStore().token;
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 3. Response Interceptor
api.interceptors.response.use(
  (response) => {
    // Return the data directly to simplify usage in components
    return response;
  },
  (error) => {
    // Global Error Handling
    if (error.response) {
      // Server responded with a status code outside of 2xx
      if (error.response.status === 401) {
        console.warn('Unauthorized! Redirecting to login...');
        // router.push('/login');
      }
    } else if (error.request) {
      // No response received (Network Error)
      console.error('Network Error - Is the server running?');
    }
    return Promise.reject(error);
  }
);

export default api;
