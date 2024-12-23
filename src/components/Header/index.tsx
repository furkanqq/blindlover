'use client';

import { ClipboardDocumentListIcon, DocumentTextIcon, LanguageIcon, UserCircleIcon } from '@heroicons/react/16/solid';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { IconClose } from '@/assets/IconClose';
import { IconEN } from '@/assets/IconEN';
import { IconES } from '@/assets/IconES';
import { IconFR } from '@/assets/IconFR';
import { IconLogin } from '@/assets/IconLogin';
import { IconPT } from '@/assets/IconPT';
import { IconRU } from '@/assets/IconRU';
import { IconTR } from '@/assets/IconTR';
import { cn } from '@/utils/cn';
import Button from '../Button';

export default function Header({
  token,
  type = 'default',
}: {
  type?: 'auth' | 'default' | 'landing' | 'detail';
  token: boolean;
}) {
  const [scrollHeight, setScrollHeight] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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

  console.log(isModalOpen, 'isModalOpen');

  return (
    <div
      className={cn(
        'fixed top-0 flex items-center justify-center w-full h-[92px] transition-all z-50 bg-white sm:bg-transparent py-9',
        {
          'shadow sm:bg-backgroundColor': scrollHeight,
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
          <LanguageModal isOpen={isModalOpen} onClose={closeModal} />
          <Button
            className="w-32"
            variant={type === 'detail' ? 'hborderprimary' : !scrollHeight ? 'hborderlight' : 'hborderprimary'}
            type={'button'}
            title={''}
            onClickDiv={openModal}
          >
            <span className="hidden md:flex">Dil</span>
            <LanguageIcon width={12} height={12} />
          </Button>
        </div>
      </div>
    </div>
  );
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LanguageModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const lg = 'tr';
  return (
    <div
      id="crud-modal"
      className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50 select-none backdrop-blur-md"
      aria-hidden={!isOpen}
    >
      <div className="relative p-4 w-full max-w-md max-h-[90vh] overflow-auto">
        {/* Modal content */}
        <div className="bg-primaryColor rounded-lg shadow">
          {/* Modal header */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b border-solid border-primaryDisabled rounded-t">
            <h3 className="text-lg font-semibold text-white ">Dil Seçiminizi Yapın</h3>
            <Button onClick={onClose} type={'button'} variant={'border'} title={''}>
              <IconClose />
            </Button>
          </div>
          {/* Modal body */}
          <div className="p-4 md:p-5 grid grid-cols-2 gap-4">
            <Button
              variant={lg === 'tr' ? 'border' : 'light'}
              title=""
              size={'md'}
              type={'button'}
              className={'w-full'}
            >
              <IconTR />
              Turkish
            </Button>

            <Button variant="light" title="" size={'md'} type={'button'} className={'w-full'}>
              <IconEN />
              English
            </Button>

            <Button variant="light" title="" size={'md'} type={'button'} className={'w-full'}>
              <IconES />
              Spanish
            </Button>

            <Button variant="light" title="" size={'md'} type={'button'} className={'w-full'}>
              <IconFR />
              French
            </Button>

            <Button variant="light" title="" size={'md'} type={'button'} className={'w-full'}>
              <IconPT />
              Portuguese
            </Button>

            <Button variant="light" title="" size={'md'} type={'button'} className={'w-full'}>
              <IconRU />
              Russian
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
