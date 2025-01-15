'use client';

import Image from 'next/image';

import Button from '@/components/Button';

const AuthFailured = () => {
  function handleRedirect() {
    window.location.href = '/en/login';
  }
  return (
    <div className="h-screen w-full flex flex-col justify-center gap-4 items-center">
      <Image src="/notApproved.png" alt="logo" width={400} height={240} />
      <h1 className="text-red-500 text-xl">Authentication Failured</h1>
      <Button onClick={handleRedirect} type={'button'} title={''} variant={'border'} className="text-red-500">
        Please Again
      </Button>
    </div>
  );
};

export default AuthFailured;
