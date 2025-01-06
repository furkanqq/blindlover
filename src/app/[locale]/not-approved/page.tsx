'use client';

import { useTranslations } from 'next-intl';

import AppLayout from '@/components/AppLayout';
import ResultPageComponent from '@/components/ResultPageComponent';

export default function NotApprovedPage() {
  const t = useTranslations('NotApprovedPage');
  return (
    <AppLayout type="auth">
      <ResultPageComponent imgUrl={'/notApproved.png'} title={t('title')} desc={t('desc')} tryB logoutB />
    </AppLayout>
  );
}
