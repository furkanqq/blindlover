import { useContext } from 'react';

import { AuthContext } from '@/provider/Auth';
import { cn } from '@/utils/cn';
import CookieConsent from '../Cookie';
import { Footer } from '../Footer';
import Header from '../Header';
import { Toaster } from '../Toaster';

export default function AppLayout({
  children,
  type,
  className,
  slug,
}: {
  children: React.ReactNode;
  type?: 'auth' | 'default' | 'landing' | 'detail';
  className?: string;
  slug?: boolean;
}) {
  const { token } = useContext(AuthContext);
  const cookie = localStorage.getItem('cookiesAccepted');

  return (
    // <BrowserRouter>
    <main className={cn('min-h-[100vh]', className)}>
      {cookie ? null : <CookieConsent />}
      {type === 'auth' ? null : <Header token={token ? token : false} type={type} slug={slug} />}
      <Toaster position="top-right" />
      {children}
      {type === 'auth' ? null : <Footer />}
    </main>
    // </BrowserRouter>
  );
}
