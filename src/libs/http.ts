import axios from 'axios';
import { __getBrowserAuthCookie } from '../utils/cookie.util';
import { TOKEN_NAME } from '../constant/variables.constant';

export const http = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_LOCAL_URL}/`,
});

http.interceptors.request.use(
  (config) => {
    const token = __getBrowserAuthCookie(TOKEN_NAME);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

http.interceptors.request.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);
