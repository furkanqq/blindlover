'use client';

import AppLayout from '@/components/AppLayout';
import ResultPageComponent from '@/components/ResultPageComponent';

export default function ActivatePage() {
  return (
    <AppLayout type="auth">
      <ResultPageComponent
        imgUrl={'/pleaseVerify.png'}
        title={'Activate Your Account'}
        desc={
          'Please confirm your email address by clicking the button below. Verifying your email will grant you full access to your account and ensure a more secure experience.'
        }
        sendB
        logoutB
      />
    </AppLayout>
  );
}
