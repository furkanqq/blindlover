'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import AppLayout from '@/components/AppLayout';
import Banner from '@/components/Banner';
import { CardSection } from '@/components/CardSection';
import { CTASection } from '@/components/CTASection';
import { FAQ } from '@/components/FAQ';
import { HeaderSection } from '@/components/HeaderSection';
import { MovieSeriesSlider } from '@/components/MovieSeriesSlider';
import { Slider } from '@/components/Slider';
import { FAQConfig_en, FAQConfig_es, FAQConfig_fr, FAQConfig_pt, FAQConfig_ru, FAQConfig_tr } from '@/config/FAQConfig';

export default function Home() {
  const t = useTranslations('LandingPage');
  const locale = useLocale();
  const [FAQConfig, setFAQConfig] = useState(FAQConfig_en);
  useEffect(() => {
    if (locale === 'tr') {
      setFAQConfig(FAQConfig_tr);
    } else if (locale === 'en') {
      setFAQConfig(FAQConfig_en);
    } else if (locale === 'fr') {
      setFAQConfig(FAQConfig_fr);
    } else if (locale === 'es') {
      setFAQConfig(FAQConfig_es);
    } else if (locale === 'ru') {
      setFAQConfig(FAQConfig_ru);
    } else if (locale === 'pt') {
      setFAQConfig(FAQConfig_pt);
    }
  }, [locale]);

  return (
    <AppLayout type="landing">
      <Banner />
      <CardSection />
      <HeaderSection />
      <CTASection />
      <Slider startIndex={0} endIndex={5} mirror={false} title={t('slider_title')} />
      <MovieSeriesSlider mirror title={t('slider_title_two')} />
      <FAQ FAQuestions={FAQConfig.slice(0, 4)} type={'landing'} />
    </AppLayout>
  );
}
