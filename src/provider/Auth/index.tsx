'use client';

import React, { createContext, useEffect, useState } from 'react';

import LoadingScreen from '@/components/LoadingScreen';
import { Base } from '@/constants/Base';
import { getCookie } from '@/helpers/cookieHelper';

export const AuthContext = createContext<{ token: boolean | null }>({ token: null });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<boolean | null>(null); // Başlangıçta null, kontrol edilene kadar beklesin

  useEffect(() => {
    const authToken = getCookie(Base.Key.AuthToken);
    if (authToken) {
      setToken(true);
    } else {
      setToken(false);
    }
  }, []);

  // Eğer token kontrolü henüz yapılmamışsa (null), loading durumunu göster
  if (token === null) {
    return <LoadingScreen />;
  }

  return <AuthContext.Provider value={{ token }}>{children}</AuthContext.Provider>;
};
