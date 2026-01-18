import axios from 'axios';
import type { AxiosInstance } from 'axios';

const isDev = import.meta.env.DEV;

const BASE_URL = isDev
  ? 'http://localhost:3000/api/cafes'
  : 'https://coffee-finder-api-w9s6.onrender.com/api/cafes';

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
    instance.defaults.headers.common.Authorization = `Bearer ${localStorage.token}`;
    return instance.get<T>(url, { params }).then((res) => res.data);
  },
  post<T>(url: string, params?: Record<string, any>) {
    return new Promise((resolve, reject) => {
      instance.defaults.headers.common.Authorization = `Bearer ${localStorage.token}`;

      instance
        .post(url, params)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          if (error.response) {
            reject(error.response.data);
          } else {
            reject(error.message);
          }
        });
    });
  },
};
