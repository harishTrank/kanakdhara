import axios from 'axios';
import {API_URL} from './Constants';

export const Axios = axios.create({
  baseURL: API_URL,
});

Axios.interceptors.request.use(
  async function (config) {
    config.headers = config.headers ?? {};
    // if (
    //   !authRoutes.find(
    //     route => route === config.url || config.headers?.withToken,
    //   )
    // ) {
    //   const {token} = await load(Config.USER_SESSION);
    //
    //   if (token) {
    //     config.headers.Authorization = `Bearer ${token}`;
    //   }
    // }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);
