'use client';

import { useTranslations } from 'next-intl';

import AppLayout from '@/components/AppLayout';
import Banner from '@/components/Banner';
import { CardSection } from '@/components/CardSection';
import { CTASection } from '@/components/CTASection';
import { FAQ } from '@/components/FAQ';
import { HeaderSection } from '@/components/HeaderSection';
import { Slider } from '@/components/Slider';
import { FAQConfig } from '@/config/FAQConfig';

export default function Home() {
  const t = useTranslations('LandingPage');
  return (
    <AppLayout type="landing">
      <Banner />
      <CardSection />
      <HeaderSection />
      <CTASection />
      <Slider startIndex={0} endIndex={5} mirror={false} title={t('slider_title')} />
      <Slider startIndex={6} endIndex={11} mirror title={t('slider_title_two')} />
      <FAQ FAQuestions={FAQConfig.slice(0, 4)} type={'landing'} />
    </AppLayout>
  );
}
