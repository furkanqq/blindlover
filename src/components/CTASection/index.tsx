import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useContext } from 'react';

import { Link } from '@/i18n/routing';
import { AuthContext } from '@/provider/Auth';
import Button from '../Button';
import { Container } from '../Container';

const CTASection = () => {
  const { token } = useContext(AuthContext);
  const t = useTranslations('LandingPage');

  return (
    <Container>
      <div className="w-full">
        <div className="mx-auto w-full pt-24 sm:pt-32">
          <div className="w-full relative isolate overflow-hidden  border border-solid bg-backgroundColor px-6 pt-16 pb-16 lg:pb-0 rounded-lg sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
            <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
              <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                {t('ctaSection.title')}
              </h2>
              <p className="mt-6 text-pretty text-lg/8 text-gray-500">{t('ctaSection.desc')}</p>
              <div className="mt-10 flex flex-col gap-3 justify-center items-center lg:items-start lg:justify-start">
                <Link href={token ? '/panel' : '/register'}>
                  <Button variant={'primary'} type={'button'} title={'Lets Start'}>
                    {t('ctaSection.button')}
                  </Button>
                </Link>
                <div className="text-primaryColor mt-2 text-[12px]">{t('ctaSection.nav')}</div>
                <div className="flex gap-2 relative">
                  <Link href={'/'} className="relative h-[50px] w-[120px]">
                    <Image src="/gplaybadge.png" alt="Google Play" fill objectFit="cover" />
                  </Link>
                  <Link href={'/'} className="relative h-[50px] w-[120px]">
                    <Image src="/appstore.png" alt="App Store" fill objectFit="cover" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="relative h-80 hidden lg:flex">
              <div className="absolute w-[800px] h-[800px] left-0 top-0  max-w-none overflow-hidden bg-white ring-1 ring-white/10">
                <Image src="/CTA.png" alt="App screenshot" fill />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export { CTASection };
