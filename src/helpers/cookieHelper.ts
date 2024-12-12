/**
 *
 * @param name
 * @param value
 * @param days
 */
export const setCookie = (name: string, value: string, days?: number, domain?: string): void => {
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = `; expires=${date.toUTCString()}`;
  }

  let cookieString = `${name}=${value || ''}${expires}; path=/`;

  if (domain) {
    cookieString += `; domain=${domain}`;
  }

  document.cookie = cookieString;
};

/**
 *
 * @param name
 * @returns
 */
export const getCookie = (name: string): string | null => {
  if (typeof document === 'undefined') {
    return null;
  }

  const nameEQ = `${name}=`;
  const cookies = document.cookie.split(';').map((cookie) => cookie.trim());

  for (const cookie of cookies) {
    if (cookie.startsWith(nameEQ)) {
      return cookie.substring(nameEQ.length);
    }
  }

  return null;
};

/**
 *
 * @param name
 * @param options
 */
export const deleteCookie = (
  name: string,
  options?: {
    path?: string;
  }
) => {
  const path = options && options.path ? `; path=${options.path}` : '';
  document.cookie = name + '=; Max-Age=-99999999;' + path;
};
