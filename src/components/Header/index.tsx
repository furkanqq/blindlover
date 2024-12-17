'use client';

import { DocumentTextIcon, UserCircleIcon } from '@heroicons/react/16/solid';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { IconLogin } from '@/assets/IconLogin';
import { cn } from '@/utils/cn';
import Button from '../Button';

export default function Header({ token, type = 'default' }: { type?: 'auth' | 'default' | 'landing'; token: boolean }) {
  const [scrollHeight, setScrollHeight] = useState(false);

  useEffect(() => {
    if (type === 'landing') {
      const getHeight = () => {
        setScrollHeight(window.scrollY > 50);
      };

      window.addEventListener('scroll', getHeight);

      return () => window.removeEventListener('scroll', getHeight);
    } else {
      setScrollHeight(true);
    }
  }, []);

  return (
    <div
      className={cn(
        'fixed top-0 flex items-center justify-center w-full h-[92px] transition-all z-50 bg-transparent py-9',
        {
          'shadow bg-backgroundColor': scrollHeight,
        }
      )}
    >
      <div className="container h-full flex items-center justify-between">
        <Link href={'/'} className="">
          <Image src={'/blindlover_text.png'} alt="Blind Lover" width={200} height={120} />
        </Link>
        <div className="w-fit flex">
          {token ? (
            <>
              <Link href={'/profile'}>
                <Button className="w-32" variant={!scrollHeight ? 'hlight' : 'hprimary'} type={'reset'} title={''}>
                  <span>Profil</span>
                  <UserCircleIcon width={12} height={12} />
                </Button>
              </Link>
              <Link href={'/panel'}>
                <Button
                  className="w-32"
                  variant={!scrollHeight ? 'hborderlight' : 'hborderprimary'}
                  type={'reset'}
                  title={''}
                >
                  <span>Teste Başla</span>
                  <DocumentTextIcon width={12} height={12} />
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link href={'/login'}>
                {/* <Button className="w-32" variant={!scrollHeight ? 'login' : 'heart'} type={'reset'} title={''}> */}
                <Button className="w-32" variant={!scrollHeight ? 'hlight' : 'hprimary'} type={'reset'} title={''}>
                  <span>Giriş Yap</span>
                  <IconLogin width={12} height={12} />
                </Button>
              </Link>
              <Link href={'/register'}>
                <Button className="w-32" variant={!scrollHeight ? 'hlight' : 'hprimary'} type={'reset'} title={''}>
                  <span>Kayıt Ol</span>
                  <IconLogin width={12} height={12} />
                </Button>
              </Link>
            </>
          )}

          <Button
            className="w-32"
            variant={!scrollHeight ? 'hborderlight' : 'hborderprimary'}
            type={'button'}
            title={''}
          >
            <span>Dil</span> <span>Seçeneği</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
