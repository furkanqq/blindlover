'use client';

import { ArrowLeftIcon } from '@heroicons/react/16/solid';
import { useAtom } from 'jotai';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { AdSectionBlog, AdVerticalFaq } from '@/components/Ads';
import AppLayout from '@/components/AppLayout';
import { Container } from '@/components/Container';
import LoadingScreen from '@/components/LoadingScreen';
import { MovieCard } from '@/components/MovieCard';
import { Link } from '@/i18n/routing';
import { DirectusServices } from '@/services/manager';
import { categoryImageAtom, movieListAtom } from '@/stores';

const ITEMS_PER_PAGE = 10;

export default function MoviesPage() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [movies] = useAtom(movieListAtom);
  const locale = useLocale();
  const t = useTranslations('BlogPage');
  const [categoryImage] = useAtom(categoryImageAtom);
  const { slug } = useParams();

  useEffect(() => {
    DirectusServices.MovieList();
  }, []);

  if (!movies || !locale) {
    return <LoadingScreen />;
  }

  const categoryKeyPrefix = `category_${locale.split('-')[0]}` as keyof (typeof movies)[0];
  const filteredMovies = movies.filter(
    (item) =>
      (item[categoryKeyPrefix] as string).toLowerCase() === decodeURIComponent((slug as string).replace(/_/g, ' ')),
  );

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
        <Container>
          <Link href="/blog/movies">
            <div className="pt-6 cursor-pointer flex gap-3">
              <ArrowLeftIcon width={24} height={24} />
              <span>{t('all_categories')}</span>
            </div>
          </Link>
        </Container>

        <div className="flex md:flex-row flex-col justify-between">
          <div className="hidden md:flex justify-center items-center">
            <AdVerticalFaq dataAdSlot={'1590128892'} dataAdFormat="auto" dataFullWidthResponsive={true} />
          </div>
          <div className="mt-6">
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
          </div>
          <div className="hidden md:flex justify-center items-center">
            <AdVerticalFaq dataAdSlot={'1590128892'} dataAdFormat="auto" dataFullWidthResponsive={true} />
          </div>
        </div>

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
