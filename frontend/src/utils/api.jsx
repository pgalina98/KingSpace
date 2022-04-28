import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';

const API_URL = process.env.REACT_APP_API_URL;

const defaultOptions = {
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
};

let instance = axios.create(defaultOptions);

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    config.headers.Authorization = token ? `Bearer ${token}` : '';

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Function that will be called to refresh authorization
const refreshAuthLogic = (failedRequest) =>
  fetch(API_URL + '/users/refreshToken', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('refreshToken')}`,
    },
  })
    .then((response) => response.json())
    .then((tokenRefreshResponse) => {
      localStorage.setItem('token', tokenRefreshResponse.token);
      failedRequest.response.config.headers['Authorization'] =
        'Bearer ' + tokenRefreshResponse.token;
      return Promise.resolve();
    });

createAuthRefreshInterceptor(instance, refreshAuthLogic);

export default instance;
