'use client';

import { useLocale, useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';

import { AdSectionFaq, AdVerticalFaq } from '@/components/Ads';
import AppLayout from '@/components/AppLayout';
import { FAQ } from '@/components/FAQ';
import { FAQConfig_en, FAQConfig_es, FAQConfig_fr, FAQConfig_pt, FAQConfig_ru, FAQConfig_tr } from '@/config/FAQConfig';

export default function FAQsPage() {
  const locale = useLocale();
  const t = useTranslations('FAQPage');
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
    <AppLayout type="detail" className="">
      <div className="bg-[url(/heartPattern.png)] bg-cover flex flex-col justify-center items-center bg-transparent text-foreground text-center h-[400px] w-full">
        <h1 className="text-4xl font-bold">{t('faq')}</h1>
        <p className="text-md text-gray-500 mt-4">{t('faq_long')}</p>
      </div>
      <div className="border border-solid border-black">
        <AdSectionFaq dataAdSlot={'3323246493'} dataAdFormat={'auto'} dataFullWidthResponsive={true} />
      </div>
      <div className="flex">
        <div className="border border-solid border-black">
          <AdVerticalFaq dataAdSlot={'1590128892'} dataAdFormat="auto" dataFullWidthResponsive={true} />
        </div>
        <FAQ FAQuestions={FAQConfig} type={'faqs'} />
        <div className="border border-solid border-black">
          <AdVerticalFaq dataAdSlot={'1590128892'} dataAdFormat="auto" dataFullWidthResponsive={true} />
        </div>
      </div>
    </AppLayout>
  );
}
