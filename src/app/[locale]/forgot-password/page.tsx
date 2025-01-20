'use client';

import { ChevronLeftIcon, LockClosedIcon } from '@heroicons/react/16/solid';
import { useAtom } from 'jotai';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import AppLayout from '@/components/AppLayout';
import Button from '@/components/Button';
import { Input } from '@/components/Input';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/inputOTP';
import { Link } from '@/i18n/routing';
import { BlindServices } from '@/services/manager';
import { authAtom } from '@/stores';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const t = useTranslations('LoginPage');
  const [auth] = useAtom(authAtom);
  const [open, setOpen] = useState(false);

  function handleLogin() {
    // e.preventDefault();
    BlindServices.ForgotPassword(email);
  }

  console.log(typeof auth);

  useEffect(() => {
    if (auth.length > 0) {
      const sendVerification = async () => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/verification/send/FORGOT_PASSWORD`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${auth}`, // Kullanıcı tokeni gorebilir ve hic sifre degistirmeden istedigi hesaba giris yapabilir.
            },
            body: JSON.stringify({
              email: email, // Kullanıcı emaili
            }),
          });

          if (response.ok) {
            console.log('Verification request sent successfully.');
            setOpen(true);
          } else {
            console.error('Failed to send verification request.');
          }
        } catch (error) {
          console.error('Error sending verification request:', error);
        }
      };

      sendVerification();
    }
  }, [auth, email]);

  return (
    <AppLayout type="detail">
      <UpdatePassword isOpen={open} onClose={() => setOpen(false)} />
      <div className="mt-24 flex justify-center bg-[url(/heartPattern.png)]">
        <div className="max-w-screen-xl m-0 sm:m-10 bg-backgroundColor rounded-lg overflow-hidden shadow sm:rounded-lg grid md:grid-cols-2 justify-center">
          <div className=" p-6 sm:p-12">
            <div className="flex justify-center items-center">
              <Link href={'/'}>
                <Image src="/blindlover.png" alt="logo" width={200} height={160} />
              </Link>
            </div>
            <div className="mt-12 flex flex-col items-center">
              <h1 className="md:text-2xl xl:text-3xl font-semibold text-center">{t('forgot')}</h1>
              <div className="w-full flex-1 mt-8">
                <form className="flex flex-col mx-auto max-w-xs">
                  <div className="flex flex-col gap-5">
                    <Input
                      className="w-full"
                      name="email"
                      type="email"
                      placeholder={t('email')}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <Button variant={'primary'} type="button" className="mt-5" title={''} onClick={handleLogin}>
                    <span>{t('submit')}</span>
                  </Button>
                  <div className="justify-center items-center text-[12px] mt-1 hover:underline flex gap-1">
                    <ChevronLeftIcon width={16} height={16} />
                    <Link href={'/login'}>{t('back_to_login')}</Link>
                  </div>
                </form>
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
interface UpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UpdatePassword: React.FC<UpdateModalProps> = ({ isOpen, onClose }) => {
  //   const locale = useLocale();
  //   const t = useTranslations('ProfilePage');

  if (!isOpen) {
    return null;
  }

  return (
    <div
      id="crud-modal"
      className="fixed inset-0 z-50 flex justify-center items-center bg-black backdrop-blur-md bg-opacity-50"
      aria-hidden={!isOpen}
    >
      <div className="relative p-4 w-full max-w-md max-h-[90vh] overflow-auto">
        <div className="bg-white flex flex-col justify-center items-center rounded-lg gap-4 py-12 shadow ">
          <div className="flex flex-col items-center justify-between p-4 md:p-5 rounded-t ">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Two Factor Authentication</h3>
            <LockClosedIcon width={20} height={20} />
          </div>
          <div>Please enter the code </div>
          <InputOTP maxLength={6}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <Button type={'button'} title={''} variant={'primary'} className="w-[60%]" onClick={onClose}>
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};
