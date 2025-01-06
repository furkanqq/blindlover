'use client';

import { useTranslations } from 'next-intl';

import AppLayout from '@/components/AppLayout';
import ResultPageComponent from '@/components/ResultPageComponent';

export default function VerificationSuccessPage() {
  const t = useTranslations('VerificationSuccessPage');
  return (
    <AppLayout type="auth">
      <ResultPageComponent imgUrl={'/verificationSuccess.png'} title={t('title')} desc={t('desc')} homeB />
    </AppLayout>
  );
}
