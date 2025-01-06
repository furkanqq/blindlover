'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';

import AppLayout from '@/components/AppLayout';
import { Container } from '@/components/Container';

export default function PrivacyPage() {
  const t = useTranslations('PrivacyPage');
  return (
    <AppLayout type="detail" className=" bg-[url(/heartPattern1.png)]">
      <Container className="min-h-[50vh] pt-24 sm:pt-32">
        <div className="privacy-policy max-w-5xl mx-auto p-12 bg-white rounded-lg shadow-xl border border-solid">
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
          <p className="text-gray-700 mb-2">{t('section1Content')}</p>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li>{t('section1List.one')}</li>
            <li>{t('section1List.two')}</li>
            <li>{t('section1List.three')}</li>
            <li>{t('section1List.four')}</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-800 mb-2">{t('section2Title')}</h2>
          <p className="text-gray-700 mb-2">{t('section2Content')}</p>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li>{t('section2List.one')}</li>
            <li>{t('section2List.two')}</li>
            <li>{t('section2List.three')}</li>
            <li>{t('section2List.four')}</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-800 mb-2">{t('section3Title')}</h2>
          <p className="text-gray-700 mb-2">{t('section3Content')}</p>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li>{t('section3List.one')}</li>
            <li>{t('section3List.two')}</li>
            <li>{t('section3List.three')}</li>
          </ul>
          {/* <p className="text-gray-700 mb-4">
            Çerezleri tarayıcı ayarlarınızdan yönetebilir veya devre dışı bırakabilirsiniz.
          </p> */}

          <h2 className="text-xl font-semibold text-gray-800 mb-2">{t('section4Title')}</h2>
          <p className="text-gray-700 mb-2">{t('section4Content')}</p>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li>{t('section4List.one')}</li>
            <li>{t('section4List.two')}</li>
            <li>{t('section4List.three')}</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-800 mb-2">{t('section5Title')}</h2>
          <p className="text-gray-700 mb-4">{t('section5Content')} </p>

          <h2 className="text-xl font-semibold text-gray-800 mb-2">{t('section6Title')}</h2>
          <p className="text-gray-700 mb-4">{t('section6Content')}</p>

          <h2 className="text-xl font-semibold text-gray-800 mb-2">{t('section7Title')}</h2>
          <p className="text-gray-700 mb-2">{t('section6Content')}</p>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li>{t('section7List.one')}</li>
            <li>{t('section7List.two')}</li>
            <li>{t('section7List.three')}</li>
            <li>{t('section7List.four')}</li>
          </ul>
          {/* <p className="text-gray-700 mb-4">
            Haklarınızı kullanmak için bizimle iletişime geçebilirsiniz:{' '}
            <Link href="mailto:hello@blindlover.com" className="text-blue-600 hover:underline">
              hello@blindlover.com
            </Link>
          </p> */}

          <h2 className="text-xl font-semibold text-gray-800 mb-2">{t('section8Title')}</h2>
          <p className="text-gray-700 mb-4">{t('section8Content')}</p>

          <h2 className="text-xl font-semibold text-gray-800 mb-2">{t('section9Title')}</h2>
          <p className="text-gray-700 mb-4">{t('section9Content')}</p>

          <p className="text-gray-700 mt-6">{t('closing')}</p>
        </div>
      </Container>
    </AppLayout>
  );
}
