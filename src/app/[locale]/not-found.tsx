'use client';

import { useTranslations } from 'next-intl';

import AppLayout from '@/components/AppLayout';
import ResultPageComponent from '@/components/ResultPageComponent';

export default function ErrorNotFound() {
  const t = useTranslations('404Page');
  return (
    <AppLayout type="auth">
      <ResultPageComponent imgUrl={'/404.png'} title={t('title')} desc={t('desc')} homeB />
    </AppLayout>
  );
}
