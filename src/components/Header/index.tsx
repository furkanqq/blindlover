'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { IconLogin } from '@/assets/IconLogin';
import { cn } from '@/utils/cn';
import Button from '../Button';

export default function Header({ type = 'default' }: { type?: 'auth' | 'default' | 'landing' }) {
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
        'fixed top-0 flex items-center justify-center w-full h-20 transition-all z-50 bg-transparent py-9',
        {
          'shadow bg-backgroundColor': scrollHeight,
        }
      )}
    >
      <div className="container h-full flex items-center justify-between">
        <Link href={'/'} className="">
          <Image src={'/blindlover_text.png'} alt="Blind Lover" width={200} height={120} />
        </Link>
        <div className="w-fit flex gap-5">
          <Link href={'/login'}>
            <Button className="w-32" variant={!scrollHeight ? 'login' : 'primary'} type={'reset'} title={''}>
              <IconLogin width={16} height={16} />
              <span>Login</span>
            </Button>
          </Link>
          <Link href={'/register'}>
            <Button className="w-32" variant={!scrollHeight ? 'light' : 'secondary'} type={'reset'} title={''}>
              <IconLogin width={16} height={16} />
              <span>Register</span>
            </Button>
          </Link>
          <Button className="w-32" variant={!scrollHeight ? 'light' : 'secondary'} type={'button'} title={''}>
            Language
          </Button>
        </div>
      </div>
    </div>
  );
}
