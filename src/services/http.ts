import axios from 'axios';
import type { AxiosInstance } from 'axios';

const isDev = import.meta.env.DEV;

const BASE_URL = isDev
  ? 'http://localhost:3001/api/cafes'
  : 'https://api.allorigins.win/get?url=https://cafenomad.xyz/api/v1.2/cafes';

const instance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 90000,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: function handleQuery(query) {
    const params = new URLSearchParams();
    Object.entries(query).forEach(([key, value]) => {
      if (value === undefined || value === null) return;

      if (Array.isArray(value)) {
        value.forEach((v) => params.append(key, v));
      } else {
        params.append(key, value);
      }
    });
    return params.toString();
  },
});
export default {
  get<T>(url: string, params?: Record<string, any>): Promise<T> {
    return instance.get<T>(url, { params }).then((res) => res.data);
  },
};
