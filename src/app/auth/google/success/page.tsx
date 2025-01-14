'use client';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { BlindServices } from '@/services/manager';

const AuthSuccess = () => {
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      BlindServices.GoogleLogin(token).then((status) => {
        if (status?.status === 200) {
          window.location.href = '/';
        }
      });
    }
  }, [searchParams]);

  return (
    <div className="h-screen w-full flex flex-col justify-center gap-4 items-center">
      <Image src="/pleaseVerify.png" alt="logo" width={400} height={240} />
      <h1 className="text-red-500 text-xl">Authentication Successful</h1>
    </div>
  );
};

export default AuthSuccess;
