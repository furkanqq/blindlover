'use client';

import { useLocale, useTranslations } from 'next-intl';
import { NextSeo } from 'next-seo';
import { useEffect, useState } from 'react';

// import { AdSectionLanding } from '@/components/Ads';
import AppLayout from '@/components/AppLayout';
import Banner from '@/components/Banner';
import { CardSection } from '@/components/CardSection';
import { Container } from '@/components/Container';
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
      <NextSeo
        title="Blind Lover | AI-Powered Relationship Compatibility Analysis"
        description="Blind Lover analyzes your relationship compatibility with a 50-question AI-generated test and provides a personalized evaluation."
        canonical={`https://blindlover.com/${locale}`}
        openGraph={{
          title: 'Blind Lover | Relationship Compatibility Test',
          description:
            'Blind Lover analyzes your relationship compatibility with a 50-question AI-generated test and provides a personalized evaluation.',
          type: 'website',
          url: `https://blindlover.com/${locale}`,
        }}
      />
      <Banner />
      {/* <AdSectionLanding dataAdSlot={'3323246493'} dataAdFormat={'auto'} dataFullWidthResponsive={true} /> */}
      <CardSection />
      <HeaderSection />
      {/* <AdSectionLanding dataAdSlot={'4347288207'} dataAdFormat={'auto'} dataFullWidthResponsive={true} /> */}
      <CTASection />
      <Slider startIndex={0} endIndex={5} mirror={false} title={t('slider_title')} />
      {/* <AdSectionLanding dataAdSlot={'3323246493'} dataAdFormat={'auto'} dataFullWidthResponsive={true} /> */}
      <MovieSeriesSlider mirror title={t('slider_title_two')} />
      {/* <AdSectionLanding dataAdSlot={'7840612986'} dataAdFormat={'auto'} dataFullWidthResponsive={true} /> */}
      <Container>
        <FAQ FAQuestions={FAQConfig.slice(0, 4)} type={'landing'} />
      </Container>
    </AppLayout>
  );
}
