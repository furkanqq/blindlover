'use client';

import { useLocale, useTranslations } from 'next-intl';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { useState } from 'react';

import { AdPopupQuestion } from '@/components/Ads';
import AppLayout from '@/components/AppLayout';
import { Container } from '@/components/Container';

export default function TermsOfUsePage() {
  const t = useTranslations('TermsPage');
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <AppLayout type="detail" className="bg-[url(/heartPattern1.png)]">
      <NextSeo
        title="Terms & Conditions | Blind Lover"
        description="Review our terms and conditions before using Blind Lover. Understand your rights and responsibilities."
        canonical={`https://blindlover.com/${locale}/terms`}
        openGraph={{
          url: `https://blindlover.com/${locale}/terms`,
          title: 'Terms & Conditions | Blind Lover',
          description: 'Review our terms and conditions before using Blind Lover.',
        }}
      />
      {isOpen && (
        <AdPopupQuestion
          dataAdSlot={'7786181204'}
          dataAdFormat={'auto'}
          dataFullWidthResponsive={true}
          setIsOpen={setIsOpen}
        />
      )}
      <Container className="min-h-[50vh] pt-24 sm:pt-32">
        <div className="terms-of-use max-w-5xl mx-auto p-12 bg-white rounded-lg shadow-xl border border-solid">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">{t('title')}</h1>
          <p className="text-gray-700 mb-4">
            {t.rich('intro', {
              Link: (chunks) => (
                <Link
                  href="https://blindlover.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {chunks}
                </Link>
              ),
            })}
          </p>

          <h2 className="text-xl font-semibold text-gray-800 mb-2">{t('section1Title')}</h2>
          <p className="text-gray-700 mb-4">{t('section1Content')}</p>

          <h2 className="text-xl font-semibold text-gray-800 mb-2">{t('section2Title')}</h2>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li>{t('section2Content.one')}</li>
            <li>{t('section2Content.two')}</li>
            <li>{t('section2Content.three')}</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-800 mb-2">{t('section3Title')}</h2>
          <p className="text-gray-700 mb-4">{t('section3Content')}</p>

          <h2 className="text-xl font-semibold text-gray-800 mb-2">{t('section4Title')}</h2>
          <p className="text-gray-700 mb-4">{t('section4Content')}</p>

          <h2 className="text-xl font-semibold text-gray-800 mb-2">{t('section5Title')}</h2>
          <p className="text-gray-700 mb-4">{t('section5Content')}</p>

          <h2 className="text-xl font-semibold text-gray-800 mb-2">{t('section6Title')}</h2>
          <p className="text-gray-700 mb-4">{t('section6Content')}</p>

          <h2 className="text-xl font-semibold text-gray-800 mb-2">{t('section7Title')}</h2>
          <p className="text-gray-700 mb-4">{t('section7Content')}</p>

          <h2 className="text-xl font-semibold text-gray-800 mb-2">{t('section8Title')}</h2>
          <p className="text-gray-700 mb-4">{t('section8Content')}</p>
          <p className="text-gray-700">
            {t('email')}{' '}
            <Link href="mailto:hello@blindlover.com" className="text-blue-600 hover:underline">
              hello@blindlover.com
            </Link>
          </p>
        </div>
      </Container>
    </AppLayout>
  );
}
