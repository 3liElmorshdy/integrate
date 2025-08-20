import axios from 'axios';

export const http = axios.create({
  baseURL: 'https://elitefairlawfirm.net',
});

http.interceptors.request.use((config) => {
  return config;
});

http.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);


