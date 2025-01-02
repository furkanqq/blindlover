'use client';

import Image from 'next/image';
import { useState } from 'react';

import { IconApple } from '@/assets/IconApple';
import { IconGoogle } from '@/assets/IconGoogle';
import AppLayout from '@/components/AppLayout';
import Button from '@/components/Button';
import { Input } from '@/components/Input';
import { Link } from '@/i18n/routing';
import { BlindServices } from '@/services/manager';

export default function LoginPage() {
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLoginForm({ ...loginForm, [name]: value });
  };

  function handleLogin() {
    // e.preventDefault();
    BlindServices.AuthLogin(loginForm)
      .then((result) => {
        if (result.status === 200) {
          window.location.href = '/';
        }
      })
      .catch((err) => {
        //toast gelecek
        console.log(err, 'err');
      });
  }

  return (
    <AppLayout type="auth">
      <div className="min-h-screen flex justify-center">
        <div className="max-w-screen-xl m-0 sm:m-10 bg-backgroundColor rounded-lg overflow-hidden shadow sm:rounded-lg flex justify-center flex-1">
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div className="flex justify-center items-center">
              <Link href={'/'}>
                <Image src="/blindlover.png" alt="logo" width={200} height={180} />
              </Link>
            </div>
            <div className="mt-12 flex flex-col items-center">
              <h1 className="text-2xl xl:text-3xl font-semibold text-center">
                Hayatının Aşkını Bulmak için Giriş Yap!
              </h1>
              <div className="w-full flex-1 mt-8">
                <form className="flex flex-col mx-auto max-w-xs">
                  <div className="flex flex-col gap-5">
                    <Input
                      className="w-full"
                      name="email"
                      type="email"
                      placeholder="Email"
                      onChange={handleInputChange}
                    />
                    <Input
                      className="w-full"
                      name="password"
                      type="password"
                      placeholder="Password"
                      onChange={handleInputChange}
                    />
                  </div>
                  <Button variant={'primary'} type="button" className="mt-5" title={''} onClick={handleLogin}>
                    <span>Şimdi Giriş Yap</span>
                  </Button>
                  <div className="text-[12px] mt-1 hover:underline">
                    <Link href={'/register'}>{`Hesabınız yok mu? Hemen Kaydolun`}</Link>
                  </div>
                </form>
                <div className="my-5 border-b text-center">
                  <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                    Ya da
                  </div>
                </div>
                <div className="flex flex-col gap-4 items-center">
                  <Button size="md" variant={'light'} type="button" title="" className="w-56 border-foreground">
                    <IconGoogle width={20} height={20} />
                    <span>Google ile Devam Et</span>
                  </Button>

                  <Button size="md" variant={'dark'} type="button" title="" className="w-56">
                    <IconApple width={20} height={20} />
                    <span>Apple ile Devam Et</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 bg-primaryColor text-center hidden lg:flex">
            <div
              className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(/banner.webp)`,
              }}
            ></div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
