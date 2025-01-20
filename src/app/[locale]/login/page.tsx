'use client';

import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

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
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('LoginPage');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLoginForm({ ...loginForm, [name]: value });
  };

  function handleGoogleLogin() {
    router.push('/api/auth/google');
  }

  function handleLogin() {
    // e.preventDefault();
    BlindServices.AuthLogin(loginForm)
      .then((result) => {
        if (result.status === 200) {
          window.location.href = `/${locale}/`;
        }
      })
      .catch((err) => {
        //toast gelecek
        console.log(err, 'err');
      });
  }

  return (
    <AppLayout type="detail">
      <div className="mt-16 flex justify-center">
        <div className="max-w-screen-xl m-0 sm:m-10 bg-backgroundColor rounded-lg overflow-hidden shadow sm:rounded-lg flex justify-center flex-1">
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div className="flex justify-center items-center">
              <Link href={'/'}>
                <Image src="/blindlover.png" alt="logo" width={200} height={160} />
              </Link>
            </div>
            <div className="mt-12 flex flex-col items-center">
              <h1 className="md:text-2xl xl:text-3xl font-semibold text-center">{t('title')}</h1>
              <div className="w-full flex-1 mt-8">
                <form className="flex flex-col mx-auto max-w-xs">
                  <div className="flex flex-col gap-5">
                    <Input
                      className="w-full"
                      name="email"
                      type="email"
                      placeholder={t('email')}
                      onChange={handleInputChange}
                    />
                    <Input
                      className="w-full"
                      name="password"
                      type="password"
                      placeholder={t('password')}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="text-[12px] mt-1 hover:underline">
                    <Link href={'/forgot-password'}>{t('forgot')}</Link>
                  </div>
                  <Button variant={'primary'} type="button" className="mt-5" title={''} onClick={handleLogin}>
                    <span>{t('button')}</span>
                  </Button>
                  <div className="text-[12px] mt-1 hover:underline">
                    <Link href={'/register'}>{t('register')}</Link>
                  </div>
                </form>
                <div className="my-5 border-b text-center">
                  <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                    {t('or')}
                  </div>
                </div>
                <div className="flex gap-4 items-center">
                  <Button
                    onClick={() => handleGoogleLogin()}
                    size="md"
                    variant={'light'}
                    type="button"
                    title=""
                    className="w-full border-foreground"
                  >
                    <IconGoogle width={20} height={20} />
                    <span>{t('google')}</span>
                  </Button>

                  {/* <Button size="md" variant={'dark'} type="button" title="" className="w-56">
                    <IconApple width={20} height={20} />
                    <span>{t('apple')}</span>
                  </Button> */}
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
