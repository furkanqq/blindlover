'use client';

import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';

import AppLayout from '@/components/AppLayout';
import Button from '@/components/Button';
import { Container } from '@/components/Container';
import LoadingScreen from '@/components/LoadingScreen';
import { MovieCategory } from '@/config/category';
import { Link } from '@/i18n/routing';
import { BlindStore } from '@/provider';
import { categoryImageAtom } from '@/stores';

export default function MoviesPage() {
  const locale = useLocale();
  const t = useTranslations('BlogPage');

  if (!locale) {
    return <LoadingScreen />;
  }

  return (
    <AppLayout type="detail">
      <div className="">
        <div className="shadow-lg bg-[url(/heartPattern.png)] bg-cover flex flex-col justify-center items-center text-foreground text-center h-[300px] w-full">
          <h1 className="text-4xl font-bold">
            <span className="text-primaryColor">{t('title').split(' ')[0]}</span>{' '}
            {t('title').split(' ').slice(1).join(' ')}
          </h1>
          <p className="text-md text-gray-500 mt-4">{t('subtitle')}</p>
        </div>

        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 py-4 pt-10">
            {MovieCategory.map((cate, index) => (
              <article
                key={index}
                className="relative max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden"
              >
                <div className="relative h-40">
                  <Image className="" src={cate.image} alt="Blog Image" fill objectFit="cover" />
                </div>
                <div className="p-5 flex w-full flex-col justify-between sm:h-[17rem]">
                  <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">{t(cate.category_name)}</h5>

                  <div className="!mb-3 font-normal !text-gray-700 text-xs ">{t(cate.content)}</div>
                  <Link
                    className="w-full"
                    href={{
                      pathname: '/blog/movies/[slug]',
                      params: { slug: t(cate.category_name).toLowerCase().replace(/ /g, '_') },
                    }}
                  >
                    <Button
                      className="w-full"
                      type={'button'}
                      title={'Read More'}
                      variant={'primary'}
                      onClick={() => {
                        BlindStore.set(categoryImageAtom, cate.cover);
                      }}
                    >
                      {t('explore')}
                    </Button>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </div>
    </AppLayout>
  );
}
