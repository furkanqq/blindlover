'use client';

import { useAtom } from 'jotai';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { IconClose } from '@/assets/IconClose';
import AppLayout from '@/components/AppLayout';
import Button from '@/components/Button';
import { Container } from '@/components/Container';
import { BlindServices } from '@/services/manager';
import { profileInfoAtom } from '@/stores';
import { cn } from '@/utils/cn';

export default function PanelPage() {
  const router = useRouter();
  const [move, setMove] = useState(false);
  const [info] = useAtom(profileInfoAtom);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    BlindServices.ProfileInfo();
  }, []);

  const handleStartTest = () => {
    if (info?.emailVerified === false) {
      router.push('/not-approved');
    } else if (info?.relationInfo === null) {
      openModal();
    } else if (!info?.age || !info.gender || !info.name || info.age === '' || info.gender === '' || info.name === '') {
      router.push('/profile');
    } else {
      window.location.href = '/panel/questions';
    }
  };
  return (
    <AppLayout>
      <Container className="pt-32 h-fit">
        <div className="flex justify-center items-center flex-col  h-fit w-full gap-12">
          <div
            className={cn(
              "relative flex justify-between h-14 w-[50%] text-center text-gray-500 bg-gray-100 rounded-xl p-1 after:absolute after:content-[''] after:w-[50%] after:h-11 after:top-[50%] after:translate-y-[-50%] after:bg-white after:rounded-xl after:transition-transform after:duration-500 after:ease-in-out",
              {
                'after:translate-x-[96%]': move,
                'after:translate-x-[1%]': !move,
              }
            )}
          >
            <div
              onClick={() => setMove(false)}
              className="w-1/2 h-full relative z-10 text-center flex justify-center items-center cursor-pointer"
            >
              <span>Career Test on Information</span>
            </div>
            <div
              onClick={() => setMove(true)}
              className="w-1/2 h-full relative z-10 text-center flex justify-center items-center cursor-pointer"
            >
              <span>Test History</span>
            </div>
          </div>
          <div className="w-full">
            <div
              id="page1"
              className={cn('h-[50vh] flex w-full', {
                hidden: move,
              })}
            >
              <div className="flex flex-col items-center gap-12">
                <div className="flex flex-col items-center">
                  <h3 className="text-2xl">Discover Compatibility</h3>
                  <span className="text-xs text-slate-600">Are You Ready to Learn How Strong Your Bond Is?</span>
                </div>
                <div className="text-center md:px-40">
                  {` This test is designed to help you explore the compatibility between you and the person you're thinking
                  about! With 5 categories—General Relationship Status, Emotional Connection, Loyalty and Trust,
                  Romantic Gestures, and Fun & Daily Habits—this fun quiz consists of 50 questions that will help you
                  understand the depth of your bond. While answering the questions, consider your relationship with the
                  person in mind. The results will show your compatibility level and highlight the strengths of your
                  relationship. If you're ready, take the test to uncover the dynamics between you and map out your
                  relationship. Who knows, this journey might bring you even closer together!`}
                </div>
                <NavModal isOpen={isModalOpen} onClose={closeModal} />
                <div className="flex gap-12">
                  <Button
                    onClick={handleStartTest}
                    variant={'primary'}
                    size="md"
                    type={'button'}
                    title={''}
                    className="w-40"
                  >
                    Start Test
                  </Button>

                  <Button variant={'blue'} size="md" type={'button'} title={''} className="w-40">
                    Watch Video
                  </Button>
                </div>
              </div>
            </div>
            <div
              id="page2"
              className={cn('h-[100vh] hidden bg-blue-500 w-full border border-solid', {
                flex: move,
              })}
            ></div>
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
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">İlişki Bilgilerini Doldur</h3>
            <Button onClick={onClose} type={'button'} variant={'dark'} title={''}>
              <IconClose />
            </Button>
          </div>
          {/* Modal body */}
          <div className="p-4 md:p-5">
            <p className="mb-5">
              Teste başlayabilmeniz için, profilinizdeki Relationship Info bölümündeki soruları doldurmanız
              gerekmektedir. Lütfen önce bu bilgileri tamamlayın.
            </p>
            <Link href="/profile">
              <Button type="submit" title={''} variant={'blue'} size="md" className="w-full">
                Profile Git
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
