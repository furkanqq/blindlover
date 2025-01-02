'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React, { useContext } from 'react';

import AppLayout from '@/components/AppLayout';
import Button from '@/components/Button';
import { Container } from '@/components/Container';
import { CTASection } from '@/components/CTASection';
import { Link } from '@/i18n/routing';
import { AuthContext } from '@/provider/Auth';

export default function AboutPage() {
  const { token } = useContext(AuthContext);
  const t = useTranslations('AboutPage');
  return (
    <AppLayout type="detail" className="">
      <div className="">
        {/* Banner */}
        <div className="bg-[url(/heartPattern.png)] bg-cover flex flex-col justify-center items-center bg-transparent text-foreground text-center h-[50vh] w-full">
          <h1 className="text-2xl md:text-6xl font-bold">{t('banner.title')}</h1>
          <p className="text-sm md:text-md text-gray-500 mt-4">{t('banner.subtitle')}</p>
        </div>

        <Container className="h-[70vh] flex justify-between mt-20">
          <div className="relative h-full w-[36%] hidden md:flex">
            <Image src="/about.png" alt="Blind Lover" fill objectFit="cover" objectPosition="top" />
          </div>
          <div className="w-full md:w-[60%] h-full flex flex-col justify-center gap-6">
            <h2 className="text-3xl md:text-5xl text-center md:text-start md:h-24 font-semibold flex items-center bg-gradient-to-r from-black via-primaryDisabled to-primaryColor text-transparent bg-clip-text">
              <span>{t('firstSection.title')}</span>
            </h2>
            <p>{t('firstSection.desc')}</p>
            <p>{t('firstSection.desc_two')}</p>
            <Link href={'/panel'}>
              <Button size="md" type={'button'} title={'Lets Start'} variant={'primary'} className="w-full md:w-fit">
                {t('firstSection.button')}
              </Button>
            </Link>
          </div>
        </Container>

        <Container className="mt-24 sm-mt-32">
          <div className="rounded-lg text-center">
            <h1 className="text-4xl font-extrabold mb-6 border-b-[1px] border-white pb-4">
              {' '}
              {t('secondSection.title')}
            </h1>
            <div className="grid md:grid-cols-2 justify-center items-center gap-4">
              <div className="flex flex-col items-center justify-center rounded-lg h-36   bg-white px-4">
                <span className="text-3xl mr-4">🎯</span>
                <span className="text-md">{t('secondSection.first')}</span>
              </div>
              <div className="flex flex-col items-center justify-center rounded-lg h-36   bg-white px-4">
                <span className="text-3xl mr-4">💡</span>
                <span className="text-md">{t('secondSection.second')}</span>
              </div>
              <div className="flex flex-col items-center justify-center rounded-lg h-36   bg-white px-4">
                <span className="text-3xl mr-4">📱</span>
                <span className="text-md">{t('secondSection.third')}</span>
              </div>
              <div className="flex flex-col items-center justify-center rounded-lg h-36   bg-white px-4">
                <span className="text-3xl mr-4">🧠</span>
                <span className="text-md">{t('secondSection.fourth')}</span>
              </div>
            </div>
          </div>
        </Container>

        <Container className="mt-24 sm:mt-32">
          <div className=" text-gray-800 rounded-lg p-8 text-center bg-gradient-to-r bg-primaryColor">
            <h1 className="text-4xl font-extrabold mb-6 text-white">{t('thirdSection.title')}</h1>
            <p className="text-lg leading-relaxed text-white">{t('thirdSection.desc')}</p>
          </div>
        </Container>

        <CTASection />

        <Container className="mt-24 sm:mt-32 hidden md:flex">
          <div className="relative border border-solid  gap-6 rounded-lg overflow-hidden flex flex-col justify-center items-end bg-transparent text-foreground text-center h-[50vh] w-full shadow">
            <div className="absolute w-full h-full">
              <Image src="/aboutBanner.png" alt="Blind Lover" fill objectFit="cover" objectPosition="top" />
            </div>
            <h1 className="mr-24 relative z-1 text-4xl font-bold">{t('fourthSection.title')}</h1>
            <p className="mr-24 relative z-1 text-md text-primaryColor mt-4">{t('fourthSection.desc')}</p>

            <Link href={token ? '/panel' : '/register'} className="mr-24 relative z-1">
              <Button type={'button'} title={'Lets Start'} variant={'primary'} className="w-32">
                {token ? t('fourthSection.button') : t('fourthSection.button_two')}
              </Button>
            </Link>
          </div>
        </Container>
      </div>
    </AppLayout>
  );
}
