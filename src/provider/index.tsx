'use client';

import { createStore, Provider } from 'jotai';

import { AuthProvider } from './Auth';

interface IProps {
  children: React.ReactNode;
}

export const BlindStore = createStore();
export default function Providers({ children }: IProps) {
  return (
    <Provider store={BlindStore}>
      <AuthProvider>{children}</AuthProvider>
    </Provider>
  );
}
