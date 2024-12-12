'use client';

import { BlindStore } from '@/provider';
import { authAtom, loaderAtom } from '@/stores';
import { BlindApiUrl } from '.';
import { setAuthTokenToHeader } from './helper';
import { LoginRequest, RegisterRequest } from './type';

export namespace BlindServices {
  export const AuthLogin = async ({ password, email }: LoginRequest) => {
    BlindStore.set(loaderAtom, true);
    const requestBody: LoginRequest = {
      password,
      email,
    };

    await BlindApiUrl.AuthLogin(requestBody)
      .then(async (res) => {
        const resData = res?.data;

        if (resData?.status === 200) {
          setAuthTokenToHeader(resData?.data?.token);
          BlindStore.set(authAtom, resData?.data?.token);
        }
      })
      .catch((err) => {
        console.log('XServices->UserLogin', err);
      })
      .finally(() => {
        BlindStore.set(loaderAtom, false);
      });
  };
  export const RegisterUser = async ({ password, name, age, gender, email }: RegisterRequest) => {
    try {
      BlindStore.set(loaderAtom, true);
      const requestBody: RegisterRequest = { password, email, name, age, gender };
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
}
