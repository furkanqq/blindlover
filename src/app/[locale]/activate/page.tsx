'use client';

import { useTranslations } from 'next-intl';

import AppLayout from '@/components/AppLayout';
import ResultPageComponent from '@/components/ResultPageComponent';

export default function ActivatePage() {
  const t = useTranslations('ActivatePage');
  return (
    <AppLayout type="auth">
      <ResultPageComponent imgUrl={'/pleaseVerify.png'} title={t('title')} desc={t('desc')} sendB homeB />
    </AppLayout>
  );
}
