import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
});
