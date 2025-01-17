'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState } from 'react';

import { IconArrowRight } from '@/assets/IconArrowRight';
import { cn } from '@/utils/cn';
import Button from '../Button';

const slidesData = [
  {
    image: '/banner.webp',
    title: 'banner.title',
    subtitle: 'banner.subtitle',
    buttonText: 'banner.button',
    link: '/register',
  },
  {
    image: '/banner3.webp',
    title: 'banner.title',
    subtitle: 'banner.subtitle',
    buttonText: 'banner.button',
    link: '/register',
  },
  {
    image: '/deneme.png',
    title: 'banner.title',
    subtitle: 'banner.subtitle',
    buttonText: 'banner.button',
    link: '/register',
  },
  // Daha fazla slide ekleyebilirsiniz...
];
export default function Banner() {
  // const { token } = useContext(AuthContext);
  // const t = useTranslations('LandingPage');

  return (
    // <div className="flex flex-col md:flex-row h-[100vh]">
    //   <div className="flex justify-center items-end pb-12 md:pb-0 md:items-center h-1/2 md:h-full w-full md:w-1/2">
    //     <div className="w-[65%] flex flex-col gap-4 md:gap-10 animate-fade animate-delay-300">
    //       <h1 className="text-[20px] leading-10 md:text-[44px]  md:leading-[60px] font-semibold">
    //         {t('banner.title')}
    //       </h1>
    //       <p className="text-[14px] hidden sm:flex text-foreground/50">{t('banner.subtitle')}</p>
    //       <Link href={token ? '/panel' : '/register'}>
    //         <Button
    //           className="flex justify-center items-center gap-4 w-full"
    //           variant="primary"
    //           title="Start Matching!"
    //           size="md"
    //           type={'button'}
    //         >
    //           <span>{t('banner.button')}</span>
    //           <IconArrowRight />
    //         </Button>
    //       </Link>
    //     </div>
    //   </div>
    //   <div className="relative flex justify-center items-center h-1/2 md:h-full bg-primaryColor w-full md:w-1/2">
    //     <div className="relative h-[80%] w-full z-[1] animate-fade animate-delay-300">
    //       <Image className="object-contain" src="/banner.webp" alt="Banner" fill />
    //     </div>
    //     <div className="absolute w-full h-full z-[0] opacity-30">
    //       <Image className="object-cover" src="/pattern.webp" alt="Banner" fill />
    //     </div>
    //   </div>
    // </div>
    <div>
      <Slider slides={slidesData} />
    </div>
  );
}

interface Slide {
  image: string;
  title: string;
  subtitle: string;
  buttonText: string;
  link: string;
}

interface SliderProps {
  slides: Slide[];
}

function Slider({ slides }: SliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const t = useTranslations('LandingPage');

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full h-[100vh] overflow-hidden">
      <div className="absolute flex gap-4 z-10 bottom-12 right-20">
        {slides.map((slide, index) => (
          <div
            className={cn('w-7 h-3 rounded-full border-2 border-solid border-white bg-white', {
              'bg-transparent scale-[1.2]': index === currentSlide,
            })}
            key={slide.title}
          ></div>
        ))}
      </div>
      <div
        className="flex transition-transform ease-out duration-500"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="min-w-full h-screen flex flex-col md:flex-row">
            <div className="flex justify-center items-end pb-12 md:pb-0 md:items-center h-1/2 md:h-full w-full md:w-1/2">
              <div className="w-[65%] flex flex-col gap-4 md:gap-10 animate-fade animate-delay-300">
                <h1 className="text-[20px] leading-10 md:text-[44px]  md:leading-[60px] font-semibold">
                  {t(slide.title)}
                </h1>
                <p className="text-[14px] hidden sm:flex text-foreground/50">{t(slide.subtitle)}</p>
                {/* <Link href={slide.link}> */}
                <Button
                  className="flex justify-center items-center gap-4 w-full"
                  variant="primary"
                  title="Start Matching!"
                  size="md"
                  type={'button'}
                >
                  <span>{t(slide.buttonText)}</span>
                  <IconArrowRight />
                </Button>
                {/* </Link> */}
              </div>
            </div>
            <div className="relative flex justify-center items-center h-1/2 md:h-full bg-primaryColor w-full md:w-1/2">
              <div className="relative h-[80%] w-full z-[1] animate-fade animate-delay-500">
                <Image className="object-contain" src={slide.image} alt={slide.title} fill />
              </div>
              <div className="absolute w-full h-full z-[0] animate-fade animate-delay-300">
                <Image className="object-cover !opacity-30" src="/pattern.webp" alt="Pattern" fill />
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={handlePrev}
        className="absolute text-4xl top-1/2 left-4 transform -translate-y-1/2 text-primaryColor"
      >
        ‹
      </button>
      <button onClick={handleNext} className="absolute text-4xl top-1/2 right-4 transform -translate-y-1/2 text-white">
        ›
      </button>
    </div>
  );
}
