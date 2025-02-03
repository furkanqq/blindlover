'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useState } from 'react';

import { AdPopupQuestion } from '@/components/Ads';
import AppLayout from '@/components/AppLayout';
import { Container } from '@/components/Container';

export default function CookiePolicyPage() {
  const t = useTranslations('CookiePage');
  const [isOpen, setIsOpen] = useState(true);

  return (
    <AppLayout type="detail" className="bg-[url(/heartPattern1.png)]">
      {isOpen && (
        <AdPopupQuestion
          dataAdSlot={'7786181204'}
          dataAdFormat={'auto'}
          dataFullWidthResponsive={true}
          setIsOpen={setIsOpen}
        />
      )}
      <Container className="min-h-[50vh] pt-24 sm:pt-32">
        <div className="cookie-policy max-w-5xl mx-auto p-12 bg-white rounded-lg shadow-xl border border-solid">
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

          <h2 className="text-xl font-semibold text-gray-800 mb-2">{t('whatAreCookiesTitle')}</h2>
          <p className="text-gray-700 mb-4">{t('whatAreCookies')}</p>

          <h2 className="text-xl font-semibold text-gray-800 mb-2">{t('cookiesWeUseTitle')}</h2>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li>
              <strong>{t('cookiesWeUse.title1')}:</strong> {t('cookiesWeUse.description1')}
            </li>
            <li>
              <strong>{t('cookiesWeUse.title2')}:</strong> {t('cookiesWeUse.description2')}
            </li>
            <li>
              <strong>{t('cookiesWeUse.title3')}:</strong> {t('cookiesWeUse.description3')}
            </li>
            <li>
              <strong>{t('cookiesWeUse.title4')}:</strong> {t('cookiesWeUse.description4')}
            </li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-800 mb-2">{t('manageCookiesTitle')}</h2>
          <p className="text-gray-700 mb-4">{t('manageCookies')} </p>

          <h2 className="text-xl font-semibold text-gray-800 mb-2">{t('thirdPartyCookiesTitle')}</h2>
          <p className="text-gray-700 mb-4">{t('thirdPartyCookies')}</p>

          <h2 className="text-xl font-semibold text-gray-800 mb-2">{t('cookiesRetentionTitle')}</h2>
          <p className="text-gray-700 mb-4">{t('cookiesRetention')}</p>

          <h2 className="text-xl font-semibold text-gray-800 mb-2">{t('changesTitle')}</h2>
          <p className="text-gray-700 mb-4">{t('changes')}</p>

          <h2 className="text-xl font-semibold text-gray-800 mb-2">{t('moreInfoTitle')}</h2>
          <p className="text-gray-700 mb-4">
            {t('moreInfo')}
            <br />
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
