'use client';

import { ClipboardDocumentListIcon, DocumentTextIcon, LanguageIcon, UserCircleIcon } from '@heroicons/react/16/solid';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { IconLogin } from '@/assets/IconLogin';
import { cn } from '@/utils/cn';
import Button from '../Button';
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '../Drawer';

export default function Header({
  token,
  type = 'default',
}: {
  type?: 'auth' | 'default' | 'landing' | 'detail';
  token: boolean;
}) {
  const [scrollHeight, setScrollHeight] = useState(false);

  useEffect(() => {
    if (type === 'landing' || type === 'detail') {
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
        'fixed top-0 flex items-center justify-center w-full h-[92px] transition-all z-50 bg-white sm:bg-transparent py-9',
        {
          'shadow bg-backgroundColor': scrollHeight,
        }
      )}
    >
      <div
        className={cn('container h-[92px] flex items-center justify-between', {
          'pr-4 md:pr-20': type === 'landing',
        })}
      >
        <Link href={'/'} className="">
          <Image
            src={'/blindlover_text.png'}
            alt="Blind Lover"
            width={200}
            height={120}
            className="cursor-pointer md:w-[200px] md:h-[120px] w-[140px] h-[80px]"
          />
        </Link>
        <div className="w-fit gap-2 flex">
          {token ? (
            <>
              <Link href={'/profile'}>
                <Button
                  className="w-32"
                  variant={type === 'detail' ? 'hprimary' : !scrollHeight ? 'hlight' : 'hprimary'}
                  type={'reset'}
                  title={''}
                >
                  <span>Profil</span>
                  <UserCircleIcon width={12} height={12} />
                </Button>
              </Link>
              <Link href={'/panel'}>
                <Button
                  className="w-32"
                  variant={type === 'detail' ? 'hborderprimary' : !scrollHeight ? 'hborderlight' : 'hborderprimary'}
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
                <Button
                  className="w-32"
                  variant={type === 'detail' ? 'hprimary' : !scrollHeight ? 'hlight' : 'hprimary'}
                  type={'reset'}
                  title={''}
                >
                  <span className="hidden md:flex">Giriş Yap</span>
                  <IconLogin width={12} height={12} />
                </Button>
              </Link>
              <Link href={'/register'}>
                <Button
                  className="w-32"
                  variant={type === 'detail' ? 'hprimary' : !scrollHeight ? 'hlight' : 'hprimary'}
                  type={'reset'}
                  title={''}
                >
                  <span className="hidden md:flex">Kayıt Ol</span>
                  <ClipboardDocumentListIcon width={12} height={12} />
                </Button>
              </Link>
            </>
          )}

          <Drawer>
            <DrawerTrigger>
              <Button
                className="w-32"
                variant={type === 'detail' ? 'hborderprimary' : !scrollHeight ? 'hborderlight' : 'hborderprimary'}
                type={'button'}
                title={''}
              >
                <span className="hidden md:flex">Dil</span>
                <LanguageIcon width={12} height={12} />
              </Button>
            </DrawerTrigger>
            <DrawerContent className="px-8 sm:px-16 md:px-28">
              <DrawerHeader>
                <DrawerTitle className="text-white">Dil Seçiminizi Yapın</DrawerTitle>
              </DrawerHeader>
              <DrawerFooter className="grid justify-center items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-12">
                <DrawerClose>
                  <Button variant="border" title="" size={'md'} type={'reset'} className={'w-full'}>
                    Turkish
                  </Button>
                </DrawerClose>
                <DrawerClose>
                  <Button variant="border" title="" size={'md'} type={'reset'} className={'w-full'}>
                    English
                  </Button>
                </DrawerClose>
                <DrawerClose>
                  <Button variant="border" title="" size={'md'} type={'reset'} className={'w-full'}>
                    Spanish
                  </Button>
                </DrawerClose>
                <DrawerClose>
                  <Button variant="border" title="" size={'md'} type={'reset'} className={'w-full'}>
                    French
                  </Button>
                </DrawerClose>
                <DrawerClose>
                  <Button variant="border" title="" size={'md'} type={'reset'} className={'w-full'}>
                    Portuguese
                  </Button>
                </DrawerClose>
                <DrawerClose>
                  <Button variant="border" title="" size={'md'} type={'reset'} className={'w-full'}>
                    Russian
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </div>
  );
}
