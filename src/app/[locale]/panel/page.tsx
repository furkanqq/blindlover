'use client';

import { useAtom } from 'jotai';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { IconClose } from '@/assets/IconClose';
import AppLayout from '@/components/AppLayout';
import Button from '@/components/Button';
import CircularProgressBar from '@/components/CircularProgressBar';
import { Container } from '@/components/Container';
import { Link } from '@/i18n/routing';
import { BlindServices } from '@/services/manager';
import { profileInfoAtom, resultListAtom } from '@/stores';
import { cn } from '@/utils/cn';
import { formatDate } from '@/utils/formatDate';

export default function PanelPage() {
  const router = useRouter();
  const [move, setMove] = useState(false);
  const [info] = useAtom(profileInfoAtom);
  const [resultList] = useAtom(resultListAtom);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const t = useTranslations('PanelPage');
  const locale = useLocale();

  useEffect(() => {
    BlindServices.ProfileInfo();
  }, []);

  useEffect(() => {
    if (resultList && resultList.length > 0) {
      return;
    }
    if (move) {
      BlindServices.QuestionResultList();
    }
  }, [move]);

  const handleStartTest = () => {
    if (info?.emailVerified === false) {
      router.push(`/${locale}/not-approved`);
    } else if (info?.relationInfo === null) {
      openModal();
    } else if (!info?.age || !info.gender || !info.name || info.age === '' || info.gender === '' || info.name === '') {
      router.push(`/${locale}/profile`);
    } else {
      window.location.href = `/${locale}/panel/questions`;
    }
  };

  if (resultList) {
    console.log(resultList[0]);
  }
  return (
    <AppLayout>
      <Container className="pt-32 h-fit">
        <div className="flex justify-center items-center flex-col  h-fit w-full gap-4 md:gap-12">
          <div
            className={cn(
              "relative flex justify-between h-14 w-full md:w-[50%] text-center text-gray-500 bg-gray-100 rounded-xl p-1 after:absolute after:content-[''] after:w-[50%] after:h-11 after:top-[50%] after:translate-y-[-50%] after:bg-white after:rounded-xl after:transition-transform after:duration-500 after:ease-in-out",
              {
                'after:translate-x-[96%]': move,
                'after:translate-x-[1%]': !move,
              }
            )}
          >
            <div
              onClick={() => setMove(false)}
              className="w-1/2 h-full relative z-10 text-center flex justify-center items-center cursor-pointer text-sm"
            >
              <span>{t('about_test')}</span>
            </div>
            <div
              onClick={() => setMove(true)}
              className="w-1/2 h-full relative z-10 text-center flex justify-center items-center cursor-pointer text-sm"
            >
              <span>{t('last_test')}</span>
            </div>
          </div>
          <div className="w-full">
            <div
              id="page1"
              className={cn('min-h-[50vh] flex w-full', {
                hidden: move,
              })}
            >
              <div className="flex flex-col items-center gap-4 md:gap-12">
                <div className="flex flex-col items-center">
                  <h3 className="text-2xl">{t('title')}</h3>
                  <span className="text-xs text-slate-600 px-12 text-center">{t('subtitle')}</span>
                </div>
                <div className="text-center md:px-40 text-sm md:text-base">{t('desc')}</div>
                <NavModal isOpen={isModalOpen} onClose={closeModal} />

                <Button
                  onClick={handleStartTest}
                  variant={'primary'}
                  size="md"
                  type={'button'}
                  title={''}
                  className="w-full md:w-52"
                >
                  {t('button')}
                </Button>
              </div>
            </div>
            <div
              id="page2"
              className={cn(
                'h-[50vh] hidden w-full border border-solid flex-col p-6 gap-3 overflow-auto shadow-inner',
                {
                  flex: move,
                }
              )}
            >
              {resultList && resultList.length > 0 ? (
                resultList.map((result, index) => (
                  <Link
                    href={{
                      pathname: '/result/[slug]',
                      params: { slug: result._id },
                    }}
                    key={index}
                  >
                    <div className="border border-solid rounded-md py-4 px-6 flex justify-between items-center bg-white">
                      <CircularProgressBar percentage={+result.aiResultResponse.turkish.lovePercentage.split('%')[0]} />
                      <div>{t('test_result')}</div>
                      <div>{formatDate(result.createdAt, { locale: `${locale}-${locale.toUpperCase()}` })}</div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="w-full h-full flex items-center justify-center text-center">
                  <span>{t('no_found')}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </AppLayout>
  );
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NavModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const t = useTranslations('PanelPage');
  if (!isOpen) return null;

  return (
    <div
      id="crud-modal"
      className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50"
      aria-hidden={!isOpen}
    >
      <div className="relative p-4 w-full max-w-md max-h-[90vh] overflow-auto">
        {/* Modal content */}
        <div className="bg-white rounded-lg shadow dark:bg-gray-700">
          {/* Modal header */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('info_title')}</h3>
            <Button onClick={onClose} type={'button'} variant={'dark'} title={''}>
              <IconClose />
            </Button>
          </div>
          {/* Modal body */}
          <div className="p-4 md:p-5">
            <p className="mb-5">{t('info_desc')}</p>
            <Link href="/profile">
              <Button type="submit" title={''} variant={'blue'} size="md" className="w-full">
                {t('info_nav')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
