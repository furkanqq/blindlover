import { atom } from 'jotai';

// export const userAtom = atom<GGetUserDetailResponse['data'] | undefined>(
//     undefined
//   );
//   export const userLoaderAtom = atom(false);

export const loaderAtom = atom(false);
export const authAtom = atom('');
