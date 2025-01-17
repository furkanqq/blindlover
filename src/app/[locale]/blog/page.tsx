'use client';

import { useLocale, useTranslations } from 'next-intl';
import React from 'react';

import { AdSectionBlog } from '@/components/Ads';
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
              title={t('blog_content_title')}
              desc={t('blog_content_desc')}
              image={'/blogCover.jpg'}
              link={'/contents'}
              buttonText={t('read_more')}
            />
            <Card
              key={2}
              title={t('blog_movies_title')}
              desc={t('blog_movies_desc')}
              image={'/moviesCover.jpg'}
              link={'/movies'}
              buttonText={t('read_more')}
            />
            <Card
              key={3}
              title={t('blog_series_title')}
              desc={t('blog_series_desc')}
              image={'/seriesCover.jpg'}
              link={'/series'}
              buttonText={t('read_more')}
            />
          </div>
        </Container>
        <AdSectionBlog dataAdSlot={'7963670409'} dataAdFormat={'auto'} dataFullWidthResponsive={true} />
      </div>
    </AppLayout>
  );
}
