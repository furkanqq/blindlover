'use client';

import AppLayout from '@/components/AppLayout';
import ResultPageComponent from '@/components/ResultPageComponent';

export default function NotApprovedPage() {
  return (
    <AppLayout type="auth">
      {/* <Container className="h-[100vh] flex justify-center items-center">
        <div className=" flex flex-col gap-6 w-full p-4 text-center justify-center items-center rounded-lg sm:p-8 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex justify-center items-center">
            <Image src="/notApproved.png" alt="logo" width={600} height={180} />
          </div>
          <h5 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">Please Verify</h5>
          <p className="mb-5 w-96 text-base text-gray-500 sm:text-lg dark:text-gray-400">
            We noticed that your account has not been verified. Please verify your account by clicking the link we sent
            to your email.
          </p>
          <div className="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 rtl:space-x-reverse">
            <Button variant={'primary'} className="w-32" type={'button'} size="md" title={''}>
              Try Again
            </Button>

            <Button variant={'light'} className="w-32" type={'button'} size="md" title={''}>
              Logout
            </Button>
          </div>
        </div>
      </Container> */}
      <ResultPageComponent
        imgUrl={'/notApproved.png'}
        title={'Please Verify'}
        desc={
          ' We noticed that your account has not been verified. Please verify your account by clicking the link we sent to your email.'
        }
        tryB
        logoutB
      />
    </AppLayout>
  );
}
