'use client';

import { useLocale, useTranslations } from 'next-intl';
import React from 'react';

import AppLayout from '@/components/AppLayout';
import { Card } from '@/components/Card';
import { Container } from '@/components/Container';
import LoadingScreen from '@/components/LoadingScreen';

export default function BlogPage() {
  const locale = useLocale();
  const t = useTranslations('BlogPage');

  if (!locale) {
    return <LoadingScreen />;
  }

  return (
    <AppLayout type="detail" className="">
      <div className="">
        {/* Banner */}
        <div className="shadow-lg bg-[url(/heartPattern.png)] bg-cover flex flex-col justify-center items-center bg-transparent text-foreground text-center h-[300px] w-full">
          <h1 className="text-4xl font-bold">
            <span className="text-primaryColor">{t('title').split(' ')[0]}</span>{' '}
            {t('title').split(' ').slice(1).join(' ')}
          </h1>
          <p className="text-md text-gray-500 mt-4">{t('subtitle')}</p>
        </div>

        {/* Blog Cards */}
        <Container className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card
              key={1}
              title={'AŞK’ınız İçin Öneriler ve Eğlenceli Fikirler'}
              desc={
                'Alt metin: İlişkinizi her daim dinamik tutacak, beraber keyli vakit geçirmeniz için bazı kirlerimiz var'
              }
              image={'/blog.png'}
              link={'/contents'}
              buttonText={t('read_more')}
            />
            <Card
              key={2}
              title={'SİZ’in İçin Seçtiğimiz En Güzel Filmler'}
              desc={
                'Sevdiğinle birlikteyken hangi filmi izlesek diye düşünmene gerek yok çünkü biz senin için en güzel filmleri seçtik. Modunuz ne tür film izlemek istiyorsa, içinde AŞK olan lmlerimize mutlaka göz atın!'
              }
              image={'/blog.png'}
              link={'/movies'}
              buttonText={t('read_more')}
            />
            <Card
              key={3}
              title={'SİZ’in İçin Seçtiğimiz En Güzel Diziler'}
              desc={
                'Sevdiğinle birlikteyken hangi diziye başlasak diye düşünmene gerek yok çünkü biz senin için en güzel dizileri seçtik. Modunuz ne tür dizi izlemek istiyorsa, içinde AŞK olan efsane dizilerimize mutlaka göz atın!'
              }
              image={'/blog.png'}
              link={'/series'}
              buttonText={t('read_more')}
            />
          </div>
        </Container>
      </div>
    </AppLayout>
  );
}
