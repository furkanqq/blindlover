import axios, { AxiosError, AxiosInstance, HttpStatusCode } from 'axios';

import { Base } from '@/constants/Base';
import { getCookie } from '@/helpers/cookieHelper';
import { deleteAuthTokenToHeader } from './helper';
import { LoginRequest, RegisterRequest } from './type';

export const BlindHttp: AxiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
});

BlindHttp.interceptors.request.use(
  (config) => {
    const authToken = getCookie(Base.Key.AuthToken);
    if (config?.headers && authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

BlindHttp.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error?.response?.status === HttpStatusCode.Unauthorized) {
      deleteAuthTokenToHeader();
    }
    return Promise.reject(error);
  }
);
export const BlindApiUrl = {
  RegisterUser: (request: RegisterRequest) => {
    return BlindHttp.post('/auth/register', request);
  },
  AuthLogin: (request: LoginRequest) => {
    return BlindHttp.post('/auth/login', request);
  },
};
