'use client';

import { ArrowLeftIcon } from '@heroicons/react/16/solid';
import { useAtom } from 'jotai';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import { AdSectionBlog } from '@/components/Ads';
import AppLayout from '@/components/AppLayout';
import Button from '@/components/Button';
import { Container } from '@/components/Container';
import LoadingScreen from '@/components/LoadingScreen';
import { MovieCard } from '@/components/MovieCard';
import { MovieCategory } from '@/config/category';
import { DirectusServices } from '@/services/manager';
import { movieListAtom } from '@/stores';

const ITEMS_PER_PAGE = 10;

export default function MoviesPage() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [movies] = useAtom(movieListAtom);
  const locale = useLocale();
  const t = useTranslations('BlogPage');
  const [category, setCategory] = useState<string>('');
  const [categoryImage, setCategoryImage] = useState<string>('');

  useEffect(() => {
    DirectusServices.MovieList();
  }, []);

  if (!movies || !locale) {
    return <LoadingScreen />;
  }

  const categoryKeyPrefix = `category_${locale.split('-')[0]}` as keyof (typeof movies)[0];
  const filteredMovies = movies.filter((item) => item[categoryKeyPrefix] === category);

  const currentMovies = filteredMovies.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const totalPages = Math.ceil(filteredMovies.length / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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
        {category !== '' && (
          <Container>
            <div className="pt-6 cursor-pointer flex gap-3" onClick={() => setCategory('')}>
              <ArrowLeftIcon width={24} height={24} />
              <span>{t('all_categories')}</span>
            </div>
          </Container>
        )}

        {category === '' && (
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

                    <Button
                      type={'button'}
                      title={'Read More'}
                      variant={'primary'}
                      onClick={() => {
                        setCategory(t(cate.category_name));
                        setCategoryImage(cate.cover);
                      }}
                    >
                      {t('explore')}
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          </Container>
        )}
        {category !== '' && (
          <Container className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <article className="relative w-full bg-white border border-gray-200 flex rounded-lg shadow-lg overflow-hidden hover:scale-[1.03] transition-transform">
                <div className="relative h-full w-full hidden md:flex">
                  <Image className="" src={categoryImage} alt="Blog Image" fill objectFit="cover" />
                </div>
              </article>
              {currentMovies.slice(0, 3).map((movies, index) => {
                const descKey = `content_${locale.split('-')[0]}` as keyof typeof movies;
                return (
                  <MovieCard
                    key={index}
                    title={movies.movie_name}
                    desc={movies[descKey] as string}
                    link={movies.link}
                  />
                );
              })}
            </div>

            <AdSectionBlog dataAdSlot={'7963670409'} dataAdFormat={'auto'} dataFullWidthResponsive={true} />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {currentMovies.slice(3).map((movies, index) => {
                const descKey = `content_${locale.split('-')[0]}` as keyof typeof movies;
                return (
                  <MovieCard
                    key={index}
                    title={movies.movie_name}
                    desc={movies[descKey] as string}
                    link={movies.link}
                  />
                );
              })}
            </div>
          </Container>
        )}

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
