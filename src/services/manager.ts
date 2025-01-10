'use client';

import { BlindStore } from '@/provider';
import {
  authAtom,
  blogAtom,
  blogListAtom,
  loaderAtom,
  movieListAtom,
  profileInfoAtom,
  questionListAtom,
  resultAtom,
  resultListAtom,
  seriesListAtom,
} from '@/stores';
import { BlindApiUrl, DirectusHttpUrl } from '.';
import { deleteAuthTokenToHeader, setAuthTokenToHeader } from './helper';
import {
  AnswerRequest,
  LoginRequest,
  ProfileUpdateRequest,
  RegisterRequest,
  RelationInfoRequest,
  UpdatePasswordRequest,
} from './type';

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

const RegisterUser = async ({ password, name, age, gender, email, mailLanguage }: RegisterRequest) => {
  BlindStore.set(loaderAtom, true);
  const requestBody: RegisterRequest = { password, email, name, age, gender, mailLanguage };

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

const ProfileInfo = async () => {
  BlindStore.set(loaderAtom, true);

  try {
    const res = await BlindApiUrl.ProfileInfo();

    if (!res || !res.data) {
      throw new Error('API yanıtı alınamadı.');
    }

    const resData = res.data;

    if (resData?.status === 200) {
      BlindStore.set(profileInfoAtom, resData.data);
      return resData;
    } else {
      console.log('Profil bilgisi alınamadı:', resData.message || 'Hata oluştu.');
    }
  } catch (err: any) {
    console.log('BlindServices->ProfileInfo Hatası:', err.message || err);
  } finally {
    BlindStore.set(loaderAtom, false);
  }
};

const ProfileUpdate = async (request: ProfileUpdateRequest) => {
  BlindStore.set(loaderAtom, true);

  try {
    const res = await BlindApiUrl.ProfileUpdate(request);

    if (!res || !res.data) {
      throw new Error('API yanıtı alınamadı.');
    }

    const resData = res.data;

    if (resData?.status === 200) {
      BlindServices.ProfileInfo();
      return resData;
    } else {
      console.log('Profil güncellenemedi:', resData.message || 'Hata oluştu.');
    }
  } catch (err: any) {
    console.log('BlindServices->ProfileUpdate Hatası:', err.message || err);
  } finally {
    BlindStore.set(loaderAtom, false);
  }
};

const UpdatePassword = async (request: UpdatePasswordRequest) => {
  BlindStore.set(loaderAtom, true);

  try {
    const res = await BlindApiUrl.UpdatePassword(request);

    if (!res || !res.data) {
      throw new Error('API yanıtı alınamadı.');
    }

    const resData = res.data;

    if (resData?.status === 200) {
      return resData;
    } else {
      console.log('Şifre güncellenemedi:', resData.message || 'Hata oluştu.');
    }
  } catch (err: any) {
    console.log('BlindServices->ProfileUpdate Hatası:', err.message || err);
  } finally {
    BlindStore.set(loaderAtom, false);
  }
};

const QuestionList = async () => {
  BlindStore.set(loaderAtom, true);

  try {
    const res = await BlindApiUrl.QuestionList();

    if (!res || !res.data) {
      throw new Error('API yanıtı alınamadı.');
    }

    const resData = res.data;

    if (resData?.status === 200) {
      BlindStore.set(questionListAtom, resData.data);
      return resData;
    } else {
      console.log('Şifre güncellenemedi:', resData.message || 'Hata oluştu.');
    }
  } catch (err: any) {
    console.log('BlindServices->QuestionList Hatası:', err.message || err);
  } finally {
    BlindStore.set(loaderAtom, false);
  }
};

const Answer = async (request: AnswerRequest) => {
  BlindStore.set(loaderAtom, true);

  try {
    const res = await BlindApiUrl.Answer(request);

    if (!res || !res.data) {
      throw new Error('API yanıtı alınamadı.');
    }

    const resData = res.data;

    if (resData?.status === 200) {
      return resData;
    } else {
      console.log('Cevap gönderilemedi:', resData.message || 'Hata oluştu.');
    }
  } catch (err: any) {
    console.log('BlindServices->Answer Hatası:', err.message || err);
  } finally {
    BlindStore.set(loaderAtom, false);
  }
};

const RelationInfo = async (request: RelationInfoRequest) => {
  BlindStore.set(loaderAtom, true);

  try {
    const res = await BlindApiUrl.RelationInfo(request);

    if (!res || !res.data) {
      throw new Error('API yanıtı alınamadı.');
    }

    const resData = res.data;

    if (resData?.status === 200) {
      BlindServices.ProfileInfo();
      return resData;
    } else {
      console.log('İlişki bilgisi alınamadı:', resData.message || 'Hata oluştu.');
    }
  } catch (err: any) {
    console.log('BlindServices->RelationInfo Hatası:', err.message || err);
  } finally {
    BlindStore.set(loaderAtom, false);
  }
};

const QuestionResultList = async () => {
  BlindStore.set(loaderAtom, true);

  try {
    const res = await BlindApiUrl.QuestionResultList();

    if (!res || !res.data) {
      throw new Error('API yanıtı alınamadı.');
    }

    const resData = res.data;

    if (resData?.status === 200) {
      BlindStore.set(resultListAtom, resData.data);
      return resData;
    } else {
      console.log('Cevaplar alınamadı:', resData.message || 'Hata oluştu.');
    }
  } catch (err: any) {
    console.log('BlindServices->QuestionResultList Hatası:', err.message || err);
  } finally {
    BlindStore.set(loaderAtom, false);
  }
};

const QuestionResult = async (id: string) => {
  BlindStore.set(loaderAtom, true);

  try {
    const res = await BlindApiUrl.QuestionResult(id);

    if (!res || !res.data) {
      throw new Error('API yanıtı alınamadı.');
    }

    const resData = res.data;

    if (resData?.status === 200) {
      BlindStore.set(resultAtom, resData.data);
      return resData;
    } else {
      console.log('Sonuc alınamadı:', resData.message || 'Hata oluştu.');
    }
  } catch (err: any) {
    console.log('BlindServices->QuestionResult Hatası:', err.message || err);
  } finally {
    BlindStore.set(loaderAtom, false);
  }
};

const ProfileDelete = async (request: string) => {
  BlindStore.set(loaderAtom, true);

  try {
    const res = await BlindApiUrl.ProfileDelete(request);

    if (!res || !res.data) {
      throw new Error('API yanıtı alınamadı.');
    }

    const resData = res.data;

    if (resData?.status === 200) {
      deleteAuthTokenToHeader();
      return resData;
    } else {
      console.log('Profil silinemedi:', resData.message || 'Hata oluştu.');
    }
  } catch (err: any) {
    console.log('BlindServices->DeleteProfile Hatası:', err.message || err);
  } finally {
    BlindStore.set(loaderAtom, false);
  }
};

export const BlindServices = {
  AuthLogin,
  RegisterUser,
  Activate,
  ProfileInfo,
  ProfileUpdate,
  UpdatePassword,
  QuestionList,
  Answer,
  RelationInfo,
  QuestionResultList,
  QuestionResult,
  ProfileDelete,
};

const BlogList = async () => {
  BlindStore.set(loaderAtom, true);

  try {
    const res = await DirectusHttpUrl.BlogList();

    if (!res || !res.data) {
      throw new Error('API yanıtı alınamadı.');
    }

    const resData = res.data;

    BlindStore.set(blogListAtom, resData.data);
    return resData;
  } catch (err: any) {
    console.log('BlindServices->BlogList Hatası:', err.message || err);
  } finally {
    BlindStore.set(loaderAtom, false);
  }
};

const MovieList = async () => {
  BlindStore.set(loaderAtom, true);

  try {
    const res = await DirectusHttpUrl.MovieList();

    if (!res || !res.data) {
      throw new Error('API yanıtı alınamadı.');
    }

    const resData = res.data;

    BlindStore.set(movieListAtom, resData.data);
    return resData;
  } catch (err: any) {
    console.log('BlindServices->BlogList Hatası:', err.message || err);
  } finally {
    BlindStore.set(loaderAtom, false);
  }
};
const SeriesList = async () => {
  BlindStore.set(loaderAtom, true);

  try {
    const res = await DirectusHttpUrl.SeriesList();

    if (!res || !res.data) {
      throw new Error('API yanıtı alınamadı.');
    }

    const resData = res.data;

    BlindStore.set(seriesListAtom, resData.data);
    return resData;
  } catch (err: any) {
    console.log('BlindServices->BlogList Hatası:', err.message || err);
  } finally {
    BlindStore.set(loaderAtom, false);
  }
};

const Blog = async (param: string) => {
  BlindStore.set(loaderAtom, true);

  try {
    const res = await DirectusHttpUrl.Blog(param);

    if (!res || !res.data) {
      throw new Error('API yanıtı alınamadı.');
    }

    const resData = res.data;
    BlindStore.set(blogAtom, resData.data[0]);
    return resData;
  } catch (err: any) {
    console.log('BlindServices->Blog Hatası:', err.message || err);
  } finally {
    BlindStore.set(loaderAtom, false);
  }
};

export const DirectusServices = {
  BlogList,
  Blog,
  MovieList,
  SeriesList,
};
