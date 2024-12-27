'use client';

import AppLayout from '@/components/AppLayout';
import ResultPageComponent from '@/components/ResultPageComponent';

export default function NotApprovedPage() {
  return (
    <AppLayout type="auth">
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
