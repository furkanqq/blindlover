import { ArrowRightIcon } from '@heroicons/react/16/solid';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

import Button from '../Button';
import { Container } from '../Container';

interface Slide {
  id: number;
  src: string;
  alt: string;
}

const slides: Slide[] = [
  { id: 1, src: '/blog.png', alt: 'Slide 1' },
  { id: 2, src: '/app.webp', alt: 'Slide 2' },
  { id: 3, src: '/blog.png', alt: 'Slide 3' },
  { id: 4, src: '/blog.png', alt: 'Slide 4' },
  { id: 5, src: '/blog.png', alt: 'Slide 5' },
];

const Slider = ({ title }: { title: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <Container className="pt-32 md:pt-52">
      <div className="relative w-full bg-white p-6 rounded-md">
        <h2 className="absolute top-[-100px] left-[50%] translate-x-[-50%] mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-center text-foreground ">
          {title}
        </h2>
        {/* Carousel Wrapper */}
        <div className="relative h-56 overflow-hidden rounded-lg md:h-72">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 border border-solid ease-in-out ${
                index === currentIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="flex relative bg-white h-full w-full">
                <div className="relative w-[40%] h-full">
                  <Link href={'/'}>
                    <Image className="rounded-l-lg" src={slide.src} alt="Blog Image" fill objectFit="cover" />
                  </Link>
                </div>
                <div className="flex flex-col justify-center gap-2 w-[60%] h-full p-5">
                  <Link href="/">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                      Artificial Intelligence: The Technology Shaping Our Future
                    </h5>
                  </Link>
                  <p className="pr-4 font-normal text-gray-700 dark:text-gray-400 text-[14px]">
                    Discover how artificial intelligence is revolutionizing our lives and shaping the future. Discover
                    how artificial intelligence is revolutionizing our lives and shaping the future. Dour lives and
                    shaping the future. Discover how artificial intelligence is revolutionizing our
                  </p>
                  <Link href={'/blogs'}>
                    <Button type={'button'} title={'Read More'} variant={'primary'}>
                      Şimdi Oku...
                      <ArrowRightIcon width={16} height={16} />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Indicators */}
        <div className="absolute flex justify-center space-x-3 bottom-2 left-1/2 transform -translate-x-1/2">
          {slides.map((_, index) => (
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
