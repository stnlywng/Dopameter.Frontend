import axios from 'axios';

// Create an instance of axios with default configuration
const axiosInstance = axios.create({
  baseURL: 'https://dopameterapi.azurewebsites.net/api/', // Your backend base URL
  headers: {
    'Content-Type': 'application/json',
    // Add any other headers you might need
  },
});

// Request interceptor to add the Bearer token
axiosInstance.interceptors.request.use(
  (config) => {
    // Get the token from localStorage (or other secure storage)
    const token = localStorage.getItem('token');

    if (token) {
      // Add Authorization header if token exists
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Handle the error
    return Promise.reject(error);
  }
);

export default axiosInstance;
