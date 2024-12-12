'use client';

import { BlindStore } from '@/provider';
import { authAtom, loaderAtom } from '@/stores';
import { BlindApiUrl } from '.';
import { setAuthTokenToHeader } from './helper';
import { LoginRequest, RegisterRequest } from './type';

const AuthLogin = async ({ password, email }: LoginRequest) => {
  BlindStore.set(loaderAtom, true);
  const requestBody: LoginRequest = {
    password,
    email,
  };

  try {
    const res = await BlindApiUrl.AuthLogin(requestBody);
    const resData = res?.data;

    if (resData?.status === 200) {
      setAuthTokenToHeader(resData?.data?.token);
      BlindStore.set(authAtom, resData?.data?.token);
      return resData;
    } else {
      console.log('Giriş başarısız:', resData.message || 'Hata oluştu.');
    }
  } catch (err) {
    console.log('BlindServices->UserLogin', err);
  } finally {
    BlindStore.set(loaderAtom, false);
  }
};

const RegisterUser = async ({ password, name, age, gender, email }: RegisterRequest) => {
  BlindStore.set(loaderAtom, true);
  const requestBody: RegisterRequest = { password, email, name, age, gender };

  try {
    const res = await BlindApiUrl.RegisterUser(requestBody);

    if (!res || !res.data) {
      throw new Error('API yanıtı alınamadı.');
    }

    const resData = res.data;

    if (resData?.status === 200) {
      setAuthTokenToHeader(resData?.data?.token);
      BlindStore.set(authAtom, resData?.data?.token);
      return resData;
    } else {
      console.log('Kayıt başarısız:', resData.message || 'Hata oluştu.');
    }
  } catch (err: any) {
    console.log('BlindServices->RegisterUser Hatası:', err.message || err);
  } finally {
    BlindStore.set(loaderAtom, false);
  }
};

const Activate = async () => {
  BlindStore.set(loaderAtom, true);

  try {
    const res = await BlindApiUrl.Activate();

    if (!res || !res.data) {
      throw new Error('API yanıtı alınamadı.');
    }

    const resData = res.data;

    if (resData?.status === 200) {
      return resData;
    } else {
      console.log('Aktivasyon başarısız:', resData.message || 'Hata oluştu.');
    }
  } catch (err: any) {
    console.log('BlindServices->Activate Hatası:', err.message || err);
  } finally {
    BlindStore.set(loaderAtom, false);
  }
};

export const BlindServices = {
  AuthLogin,
  RegisterUser,
  Activate,
};
