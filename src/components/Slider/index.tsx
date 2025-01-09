import { ArrowRightIcon } from '@heroicons/react/16/solid';
import { useAtom } from 'jotai';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import { Link } from '@/i18n/routing';
import { DirectusServices } from '@/services/manager';
import { blogListAtom } from '@/stores';
import { cn } from '@/utils/cn';
import Button from '../Button';
import { Container } from '../Container';
import MarkdownContent from '../MarkdownContent';

const Slider = ({
  title,
  mirror,
  startIndex,
  endIndex,
}: {
  title: string;
  mirror: boolean;
  startIndex: number;
  endIndex: number;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [blogList] = useAtom(blogListAtom);
  const locale = useLocale();
  const t = useTranslations('BlogPage');

  useEffect(() => {
    DirectusServices.BlogList();
  }, []);

  if (!blogList) {
    return null;
  }

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? endIndex - startIndex - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === endIndex - startIndex - 1 ? 0 : prevIndex + 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <Container className="pt-32 md:pt-52">
      <div className="relative w-full bg-white border border-solid p-12 rounded-md">
        <h2 className="absolute top-[-60px] left-[50%] translate-x-[-50%] mb-4 text-base md:text-3xl  w-full md:w-full tracking-tight font-extrabold text-center text-black ">
          {title}
        </h2>
        {/* Carousel Wrapper */}
        <div className="relative h-56 overflow-hidden rounded-lg md:h-72">
          {blogList.slice(startIndex, endIndex).map((blog, index) => {
            const titleKey = `title_${locale.split('-')[0]}` as keyof typeof blog;
            const descKey = `content_${locale.split('-')[0]}` as keyof typeof blog;
            return (
              <div
                key={blog.id}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  index === currentIndex ? 'opacity-100 z-0' : 'opacity-0 z-[-1]'
                }`}
              >
                <div
                  className={cn('flex flex-col sm:flex-row relative bg-white h-full w-full', {
                    'flex-col-reverse sm:flex-row-reverse': mirror,
                  })}
                >
                  <div className="relative w-full mb-2 md:mb-0 md:w-[40%] h-full">
                    <Link href={'/'}>
                      <Image className="rounded-l-lg" src="/blog.png" alt="Blog Image" fill objectFit="cover" />
                    </Link>
                  </div>
                  <div className="flex flex-col justify-start gap-3 w-full md:w-[60%] h-full px-5">
                    <Link href="/">
                      <h5 className="mb-2 text-xs md:text-2xl font-bold tracking-tight text-gray-900">
                        {blog[titleKey]}
                      </h5>
                    </Link>

                    <MarkdownContent
                      content={blog[descKey].toString().slice(0, 200)}
                      className={cn(
                        'hidden md:flex flex-col pr-4 pl-0 font-normal text-gray-700 dark:text-gray-400 text-xs md:text-[14px]',
                        {
                          'pl-4 pr-0': mirror,
                        }
                      )}
                    />

                    <Link
                      href={{
                        pathname: '/blog/contents/[slug]',
                        params: { slug: blog.slug },
                      }}
                    >
                      <Button type={'button'} title={'Read More'} variant={'primary'} className="!text-xs">
                        {t('read_more')}
                        <ArrowRightIcon className="hidden" width={16} height={16} />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {/* Indicators */}
        <div className="absolute flex justify-center space-x-3 bottom-4 left-1/2 transform -translate-x-1/2">
          {blogList.slice(startIndex, endIndex).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full ${index === currentIndex ? 'bg-primaryColor' : 'bg-gray-400'}`}
              aria-label={`Slide ${index + 1}`}
            ></button>
          ))}
        </div>
        {/* Previous Button */}
        <button
          onClick={goToPrevious}
          className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 group focus:outline-none"
          aria-label="Previous"
        >
          <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primaryColor group-hover:bg-primaryDisabled border-4 border-solid border-white">
            <svg className="w-4 h-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
          </span>
        </button>
        {/* Next Button */}
        <button
          onClick={goToNext}
          className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 group focus:outline-none"
          aria-label="Next"
        >
          <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primaryColor group-hover:bg-primaryDisabled border-4 border-solid border-white">
            <svg className="w-4 h-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </span>
        </button>
      </div>
    </Container>
  );
};

export { Slider };
