import axios, { AxiosError, AxiosInstance, HttpStatusCode } from 'axios';

import { Base } from '@/constants/Base';
import { getCookie } from '@/helpers/cookieHelper';
import { deleteAuthTokenToHeader } from './helper';
import { AnswerRequest, LoginRequest, ProfileUpdateRequest, RegisterRequest, UpdatePasswordRequest } from './type';

export const BlindHttp: AxiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
});

export const DirectusHttp: AxiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_DIRECTUS_TOKEN}`,
  },
  baseURL: process.env.NEXT_PUBLIC_DIRECTUS_API_URL,
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

export const DirectusHttpUrl = {
  BlogList: () => {
    return DirectusHttp.get('/items/blindBlog');
  },
  Blog: (param: string) => {
    return DirectusHttp.get('/items/blindBlog?filter[slug][_eq]=' + param);
  },
};
export const BlindApiUrl = {
  RegisterUser: (request: RegisterRequest) => {
    return BlindHttp.post('/auth/register', request);
  },
  AuthLogin: (request: LoginRequest) => {
    return BlindHttp.post('/auth/login', request);
  },
  Activate: () => {
    return BlindHttp.post('/verification/send/EMAIL_VERIFY');
  },
  ProfileInfo: () => {
    return BlindHttp.get('/profile/info');
  },
  ProfileUpdate: (request: ProfileUpdateRequest) => {
    return BlindHttp.put('/profile/update', request);
  },
  UpdatePassword: (request: UpdatePasswordRequest) => {
    return BlindHttp.put('/profile/update-password', request);
  },
  QuestionList: () => {
    return BlindHttp.get('/question/list');
  },
  Answer: (request: AnswerRequest) => {
    return BlindHttp.post('/answer', request);
  },
};
