import Image from 'next/image';

import AppLayout from '@/components/AppLayout';
import Button from '@/components/Button';
import { Container } from '@/components/Container';
import ResultPageComponent from '@/components/ResultPageComponent';

export default function VerificationSuccessPage() {
  return (
    <AppLayout type="auth">
      {/* <Container className="h-[100vh] flex justify-center items-center">
        <div className=" flex flex-col gap-6 w-full p-4 text-center justify-center items-center rounded-lg sm:p-8 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex justify-center items-center">
            <Image src="/verificationSuccess.png" alt="logo" width={600} height={180} />
          </div>
          <h5 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">Successfully Verified!</h5>
          <p className="mb-5 w-96 text-base text-gray-500 sm:text-lg dark:text-gray-400">
            Your account has been successfully verified. You can now access all features.
          </p>
          <div className="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 rtl:space-x-reverse">
            <Button variant={'primary'} className="w-44" type={'button'} size="md" title={''}>
              Go to Homepage
            </Button>
          </div>
        </div>
      </Container> */}
      <ResultPageComponent imgUrl={'/verificationSuccess.png'} title={'Successfully Verified!'} desc={'Your account has been successfully verified. You can now access all features.'} homeB/>
    </AppLayout>
  );
}
