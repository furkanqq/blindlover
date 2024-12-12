import Image from 'next/image';
import Link from 'next/link';

import Button from '@/components/Button';
import { Container } from '@/components/Container';

export default function ResultPageComponent({
  imgUrl,
  imgWidth,
  imgHeight,
  title,
  desc,
  logoutB,
  homeB,
  tryB,
  sendB,
}: {
  imgUrl: string;
  imgWidth?: number;
  imgHeight?: number;
  title: string;
  desc: string;
  logoutB?: boolean;
  homeB?: boolean;
  tryB?: boolean;
  sendB?: boolean;
}) {
  return (
    <Container className="h-[100vh] flex justify-center items-center">
      <div className=" flex flex-col gap-6 w-full p-4 text-center justify-center items-center rounded-lg sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex justify-center items-center">
          <Image
            src={imgUrl ? imgUrl : ''}
            alt="logo"
            width={imgWidth ? imgWidth : 600}
            height={imgHeight ? imgHeight : 180}
          />
        </div>
        <h5 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">{title}</h5>
        <p className="mb-5 md:w-96 text-base text-gray-500 sm:text-lg dark:text-gray-400">{desc}</p>
        <div className="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 rtl:space-x-reverse">
          {sendB && (
            <Button variant={'primary'} className="w-32" type={'button'} size="md" title={''}>
              Send Email
            </Button>
          )}

          {tryB && (
            <Button variant={'primary'} className="w-32" type={'button'} size="md" title={''}>
              Try Again
            </Button>
          )}

          {logoutB && (
            <Button variant={'light'} className="w-32" type={'button'} size="md" title={''}>
              Logout
            </Button>
          )}

          {homeB && (
            <Link href={'/'}>
              <Button variant={'primary'} className="w-44" type={'button'} size="md" title={''}>
                Go to Homepage
              </Button>
            </Link>
          )}
        </div>
      </div>
    </Container>
  );
}
