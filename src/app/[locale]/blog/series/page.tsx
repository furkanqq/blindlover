'use client';

import { useAtom } from 'jotai';
import { useLocale, useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';

import AppLayout from '@/components/AppLayout';
import { Container } from '@/components/Container';
import LoadingScreen from '@/components/LoadingScreen';
import { MovieCard } from '@/components/MovieCard';
import { DirectusServices } from '@/services/manager';
import { seriesListAtom } from '@/stores';

const ITEMS_PER_PAGE = 10;

export default function SeriesPage() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [series] = useAtom(seriesListAtom);
  const locale = useLocale();
  const t = useTranslations('BlogPage');
  const [category, setCategory] = useState<string>(t('all_series'));

  useEffect(() => {
    DirectusServices.SeriesList();
    setCategory(t('all_series'));
  }, []);

  if (!series || !locale) {
    return <LoadingScreen />;
  }

  const categoryKeyPrefix = `category_${locale.split('-')[0]}` as keyof (typeof series)[0];
  const filteredSeries =
    category === t('all_series') ? series : series.filter((item) => item[categoryKeyPrefix] === category);

  const currentSeries = filteredSeries.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  //   const uniqueCategories = [t('all_series'), ...new Set(series.map((item) => item[categoryKeyPrefix]))];

  const totalPages = Math.ceil(filteredSeries.length / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <AppLayout type="detail">
      <div className="">
        <div className="shadow-lg bg-[url(/heartPattern.png)] bg-cover flex flex-col justify-center items-center text-foreground text-center h-[400px] w-full">
          <h1 className="text-4xl font-bold">
            <span className="text-primaryColor">{t('title').split(' ')[0]}</span>{' '}
            {t('title').split(' ').slice(1).join(' ')}
          </h1>
          <p className="text-md text-gray-500 mt-4">{t('subtitle')}</p>
        </div>

        {/* <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 py-4">
            {uniqueCategories.map((cate, index) => (
              <div
                key={index}
                className={cn('cursor-pointer hover:scale-[1.01] border text-center rounded-lg py-3', {
                  'col-span-2': index === 0,
                  'border-solid border-primaryColor': cate === category,
                })}
                onClick={() => setCategory(cate as string)}
              >
                {cate}
              </div>
            ))}
          </div>
        </Container> */}

        <Container className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {currentSeries.map((series, index) => {
              const descKey = `series_content_${locale.split('-')[0]}` as keyof typeof series;
              return (
                <MovieCard
                  key={index}
                  title={series.series_name}
                  desc={series[descKey] as string}
                  image="/blog.png"
                  link={series.link}
                />
              );
            })}
          </div>
        </Container>

        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-8 space-x-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 rounded-md border transition duration-300 ${
                  page === currentPage ? 'bg-primaryColor text-white' : 'bg-white text-primaryColor border-primaryColor'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
