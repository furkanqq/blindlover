'use client';

import { createContext, useEffect } from 'react';

import { getCookie } from '@/helpers/cookieHelper';
import { BlindServices } from '@/services/manager';

export const AuthContext = createContext<undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const authToken = getCookie('x-auth-token');

  //   useEffect(() => {
  //     if (!authToken) return;
  //     BlindServices.GetUserInformation();
  //   }, [authToken]);

  return <AuthContext.Provider value={undefined}>{children}</AuthContext.Provider>;
};
