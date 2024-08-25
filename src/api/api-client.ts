// src/api/axios.ts
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://localhost:7262/api', // Your backend base URL
  headers: {
    'Content-Type': 'application/json',
    // Add any other headers you might need
  },
});

export default axiosInstance;
