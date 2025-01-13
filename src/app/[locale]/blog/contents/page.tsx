'use client';

import { useAtom } from 'jotai';
import { useLocale, useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';

import AppLayout from '@/components/AppLayout';
import { BlogCard } from '@/components/BlogCard';
import { Container } from '@/components/Container';
import LoadingScreen from '@/components/LoadingScreen';
import { DirectusServices } from '@/services/manager';
import { blogListAtom } from '@/stores';

const ITEMS_PER_PAGE = 12;

export default function BlogPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [blogs] = useAtom(blogListAtom);
  const locale = useLocale();
  const t = useTranslations('BlogPage');

  useEffect(() => {
    DirectusServices.BlogList();
  }, []);

  if (!blogs || !locale) {
    return <LoadingScreen />;
  }

  const totalPages = Math.ceil(blogs.length / ITEMS_PER_PAGE);
  const currentBlogs = blogs.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  console.log(blogs, 'blogs');

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
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {currentBlogs.map((blog, index) => {
              const titleKey = `title_${locale.split('-')[0]}` as keyof typeof blog;
              const descKey = `content_${locale.split('-')[0]}` as keyof typeof blog;

              return (
                <BlogCard
                  key={index}
                  title={blog[titleKey] as string}
                  desc={blog[descKey].toString().slice(0, 120)}
                  image={`${process.env.NEXT_PUBLIC_DIRECTUS_API_URL + '/assets/' + blog?.small_image}`}
                  link={blog.slug}
                  buttonText={t('read_more')}
                />
              );
            })}
          </div>
        </Container>

        {/* Pagination */}
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
      </div>
    </AppLayout>
  );
}
