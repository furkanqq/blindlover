import { Base } from '@/constants/Base';
import { PageLink } from '@/constants/PageLink';
import { deleteCookie, setCookie } from '@/helpers/cookieHelper';
import { BlindHttp } from '.';

export const setAuthTokenToHeader = (token: string) => {
  BlindHttp.defaults.headers.common.Authorization = `Bearer ${token}`;
  setCookie(Base.Key.AuthToken, token, 365);
};

export const deleteAuthTokenToHeader = () => {
  delete BlindHttp.defaults.headers.common.Authorization;
  if (typeof document !== 'undefined') {
    deleteCookie(Base.Key.AuthToken, { path: PageLink.Home });
  }
};

export const errorHandle = (err: { response: { data: { message: string } }; message: string }) => {
  return `Error: ${err?.response?.data?.message || err?.message}`;
};
