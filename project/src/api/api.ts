import axios, {AxiosError, AxiosInstance, AxiosRequestConfig} from 'axios';

import {getToken} from './token';
import store from '../store/store';
import {setError} from '../store/actions';
import {StatusCodes, ApiRoute, defaultErrorText, backendUrl, requestTimeout} from '../const';

// exceptions when we don't need to show the errors
const shouldShowError = (error: AxiosError) => {
  // don't need to show the error if we checked the login status and response was unauthorized
  if (error.config.url === ApiRoute.Login && error.response?.status === StatusCodes.UNAUTHORIZED) {
    return false;
  }
  // custom text for not found message
  if (error.response?.status === StatusCodes.NOT_FOUND) {
    if(error.response?.data?.error) {
      store.dispatch(setError(error.response?.data?.error));
    } else {
    store.dispatch(setError('Page not found'));
    }
    return false;
  }

  // by default always show the error
  return true;
};

const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: backendUrl,
    timeout: requestTimeout
  });

  // add X-Token to the header if need
  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = getToken();
      if (token) {
        config.headers['X-Token'] = token;
      }
      return config;
    }
  );

  // show error if the request failed
  api.interceptors.response.use(
    (response) => {
      store.dispatch(setError(null));
      return response;
    },
    (error: AxiosError) => {
      if (shouldShowError(error)) {
        const errorText = error.response?.data?.error || defaultErrorText;
        store.dispatch(setError(errorText));
      }
      throw error;
    }
  );

  return api;
};

export default createAPI;
