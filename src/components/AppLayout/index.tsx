import { BrowserRouter } from 'react-router-dom';

import { cn } from '@/utils/cn';
import { Footer } from '../Footer';
import Header from '../Header';
import { Toaster } from '../Toaster';

export default function AppLayout({
  children,
  type,
  className,
}: {
  children: React.ReactNode;
  type?: 'auth' | 'default' | 'landing';
  className?: string;
}) {
  return (
    // <BrowserRouter>
    <main className={cn('min-h-[100vh]', className)}>
      {type === 'auth' ? null : <Header type={type} />}
      <Toaster position="top-right" />
      {children}
      {type === 'auth' ? null : <Footer />}
    </main>
    // </BrowserRouter>
  );
}
