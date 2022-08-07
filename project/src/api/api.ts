import axios, {AxiosError, AxiosInstance, AxiosRequestConfig} from 'axios';

import {getToken} from './token';
import store from '../store/store';
import {setError} from '../store/actions';

const BACKEND_URL = 'https://10.react.pages.academy/six-cities';
const REQUEST_TIMEOUT = 5000; // ms

const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT
  });

  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = getToken();
      if(token) {
        config.headers['x-token'] = token;
      }
      return config;
    }
  );

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if(error.response) {
        store.dispatch(setError(error.response.data.error));
      }

      throw error;
    }
  );

  return api;
};

export default createAPI;
