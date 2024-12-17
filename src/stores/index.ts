import { atom } from 'jotai';

import {
  BlindBlogListResponse,
  BlindBlogResponse,
  ProfileInfoResponse,
  QuestionListResponse,
  QuestionResult,
} from '@/services/type';

// export const userAtom = atom<GGetUserDetailResponse['data'] | undefined>(
//     undefined
//   );
//   export const userLoaderAtom = atom(false);

export const loaderAtom = atom(false);
export const authAtom = atom('');

export const profileInfoAtom = atom<ProfileInfoResponse['data'] | undefined>();

export const base64ImageAtom = atom('');

export const blogListAtom = atom<BlindBlogListResponse['data'] | undefined>();
export const blogAtom = atom<BlindBlogResponse | undefined>();

export const questionListAtom = atom<QuestionListResponse['data'] | undefined>();

export const answerListAtom = atom<QuestionResult['data'] | undefined>();
