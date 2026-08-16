import axios from 'axios';
import { Agent as HttpsAgent } from "https";

console.log("NEXT_PUBLIC_API_URL", process.env.NEXT_PUBLIC_API_URL);
export const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
  httpsAgent:
    process.env.NEXT_PUBLIC_ENV === "local"
      ? new HttpsAgent({ rejectUnauthorized: false })
      : undefined,
});
