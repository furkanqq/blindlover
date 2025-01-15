import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { Link } from '@/i18n/routing';
import Button from '../Button';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(true);
  const t = useTranslations('CookieConsent');

  const handleAccept = () => {
    // Çerezleri kabul ettiğini kaydet (örneğin, localStorage'a yaz)
    localStorage.setItem('cookiesAccepted', 'true');
    setIsVisible(false);
  };

  const handleDecline = () => {
    // Çerezleri reddettiğini kaydet
    localStorage.setItem('cookiesAccepted', 'false');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-2 flex flex-col gap-4 md:flex-row items-center justify-between left-2 right-2 rounded-lg z-40 animate-fade-up animate-delay-300 px-12 py-6 bg-primaryColor border border-solid shadow-lg  text-white text-center">
      <div className="flex md:flex-row flex-col text-sm gap-2">
        <span>{t('title')}</span>
        <Link className="underline text-blue-200" href={'/cookie-policy'}>
          {t('more')}
        </Link>
      </div>
      <div className="flex justify-center space-x-4">
        <Button onClick={handleDecline} type={'button'} title={''} className="md:w-44" variant={'border'}>
          {t('reject')}
        </Button>
        <Button onClick={handleAccept} type={'button'} title={''} className="md:w-44" variant={'green'}>
          {t('accept')}
        </Button>
      </div>
    </div>
  );
};

export default CookieConsent;
