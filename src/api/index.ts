import axios, { AxiosInstance } from 'axios';

let api: AxiosInstance;

if (process.env.NODE_ENV === 'production') {
  api = axios.create({ baseURL: process.env.REACT_APP_URL });
} else {
  api = axios.create();
}

export default api;
