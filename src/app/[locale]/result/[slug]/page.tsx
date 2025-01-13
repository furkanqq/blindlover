'use client';

import { useAtom } from 'jotai';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

import AppLayout from '@/components/AppLayout';
import { Container } from '@/components/Container';
import LoadingScreen from '@/components/LoadingScreen';
import { BlindServices } from '@/services/manager';
import { AiResultResponse, AiResultResponseLanguages, QuestionResult } from '@/services/type';
import { resultAtom } from '@/stores';
import { cn } from '@/utils/cn';

const ResultContainer = ({ result, country }: { result: QuestionResult['data']; country: string }) => {
  const [visibleSections, setVisibleSections] = useState<string[]>([]);
  const t = useTranslations('ResultPage');

  const observer = useRef<IntersectionObserver | null>(null); // IntersectionObserver türünü belirt

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-id');
            if (id) {
              setVisibleSections((prev) => Array.from(new Set([...prev, id])));
            }
          }
        });
      },
      { threshold: 0.2 }, // Eleman %20 görünür olduğunda tetiklenir
    );

    const sections = document.querySelectorAll('.fade-section');
    sections.forEach((section) => observer.current?.observe(section)); // Observer varsa çalıştır

    return () => {
      sections.forEach((section) => observer.current?.unobserve(section)); // Observer varsa çalıştır
      observer.current = null; // Bellek sızıntısını önlemek için sıfırla
    };
  }, []);

  const localKey = `${country}` as keyof AiResultResponseLanguages;

  return (
    <Container className="pt-24 grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6">
      {[
        {
          id: 'compatibility',
          title: 'rate',
          content: (
            <>
              <h2 className="relative z-[1] text-5xl md:text-[80px] font-extrabold">
                {(result.aiResultResponse[localKey] as AiResultResponse)?.lovePercentage}
              </h2>
            </>
          ),
        },
        {
          id: 'generalRelationStatus',
          title: 'GENERAL_RELATION_STATUS',
          content: (
            <h2 className="text-[14px] md:text-[18px] font-semibold text-center">
              {(result.aiResultResponse[localKey] as AiResultResponse)?.answerCategoryAnalysis?.generalRelationStatus}
            </h2>
          ),
          image: '/general.png',
        },
        {
          id: 'emotionalAttachment',
          title: 'EMOTIONAL_ATTACHMENT',
          content: (
            <h2 className="text-[14px] md:text-[18px] font-semibold text-center">
              {(result.aiResultResponse[localKey] as AiResultResponse).answerCategoryAnalysis.emotionalAttachment}
            </h2>
          ),
          image: '/emotional.png',
        },
        {
          id: 'loyaltyAndTrust',
          title: 'LOYALTY_AND_TRUST',
          content: (
            <h2 className="text-[14px] md:text-[18px] font-semibold text-center">
              {(result.aiResultResponse[localKey] as AiResultResponse).answerCategoryAnalysis.loyaltyAndTrust}
            </h2>
          ),
          image: '/trust.png',
        },
        {
          id: 'romanticBehavior',
          title: 'ROMANTIC_BEHAVIOR',
          content: (
            <h2 className="text-[14px] md:text-[18px] font-semibold text-center">
              {(result.aiResultResponse[localKey] as AiResultResponse).answerCategoryAnalysis.romanticBehavior}
            </h2>
          ),
          image: '/romantic.png',
        },
        {
          id: 'funAndDailyHabits',
          title: 'FUN_AND_DAILY_HABITS',
          content: (
            <h2 className="text-[14px] md:text-[18px] font-semibold text-center">
              {(result.aiResultResponse[localKey] as AiResultResponse).answerCategoryAnalysis.funAndDailyHabits}
            </h2>
          ),
          image: '/fun.png',
        },
        {
          id: 'aiComment',
          title: 'ai_comment',
          content: (
            <h2 className="text-[14px] md:text-[18px] font-semibold text-center">
              {(result.aiResultResponse[localKey] as AiResultResponse).comment}
            </h2>
          ),
          image: '/comment.png',
        },
      ].map(({ id, title, content, image }) => (
        <div
          key={id}
          data-id={id}
          className={cn(
            `relative overflow-hidden  fade-section h-[45vh] flex flex-col justify-center items-center gap-4 transition-opacity duration-700 px-12 text-center rounded-md bg-white`,
            {
              'animate-flip-up animate-duration-500': visibleSections.includes(id),
              'opacity-0': !visibleSections.includes(id),
              'md:col-span-2 bg-primaryColor text-white': id === 'compatibility',
              'animate-delay-100': id === 'compatibility',
              'animate-delay-200':
                id === 'generalRelationStatus' || id === 'loyaltyAndTrust' || id === 'funAndDailyHabits',
              'animate-delay-300': id === 'emotionalAttachment' || id === 'romanticBehavior' || id === 'aiComment',
              'border-2 border-solid border-blue-600 text-blue-600': id === 'generalRelationStatus',
              'border-2 border-solid border-red-500 text-red-500': id === 'emotionalAttachment',
              'border-2 border-solid border-green-500 text-green-500': id === 'loyaltyAndTrust',
              'border-2 border-solid border-pink-500 text-pink-500': id === 'romanticBehavior',
              'border-2 border-solid border-orange-500 text-orange-500': id === 'funAndDailyHabits',
              'border-2 border-solid border-purple-500 text-purple-500': id === 'aiComment',
            },
          )}
        >
          {id === 'compatibility' && (
            <div className="absolute w-full h-full bg-[url(/heartPattern.png)] bg-cover bg-opacity-35 animate-card-custom-pulse"></div>
          )}
          {id !== 'compatibility' && (
            <div className="absolute w-full h-full bg-[url(/heartPattern1.png)] bg-cover opacity-40"></div>
          )}
          <h1 className="relative z-[1] text-base md:text-[28px] font-bold">{t(title)}</h1>
          {content}
          {id !== 'compatibility' && <Image src={image as string} alt={'image'} width={80} height={100} />}
        </div>
      ))}
    </Container>
  );
};

export default function ResultPage() {
  const [result] = useAtom(resultAtom);
  const { slug } = useParams();
  const t = useTranslations('ResultPage');
  const [currentIndex, setCurrentIndex] = useState(0);
  const locale = useLocale();
  const [country, setCountry] = useState<string>('');

  useEffect(() => {
    if (locale === 'tr') {
      setCountry('turkish');
    } else if (locale === 'en') {
      setCountry('english');
    } else if (locale === 'fr') {
      setCountry('french');
    } else if (locale === 'es') {
      setCountry('spanish');
    } else if (locale === 'ru') {
      setCountry('russian');
    } else if (locale === 'pt') {
      setCountry('portuguese');
    }
  }, [locale]);

  useEffect(() => {
    BlindServices.QuestionResult(slug as string);
  }, [slug]);

  if (!result) {
    return <LoadingScreen />;
  }

  const localKey = `${country}` as keyof AiResultResponseLanguages;
  return (
    <React.Fragment>
      {currentIndex === 7 ? (
        <AppLayout type="detail" slug>
          <ResultContainer result={result} country={country} />
        </AppLayout>
      ) : (
        <div className="relative h-screen overflow-hidden bg-primaryColor cursor-pointer">
          <div className="z-[0] absolute bg-[url(/heartPattern1.png)] h-full w-full animate-jump animate-infinite animate-duration-[8000ms] animate-ease-linear"></div>
          <div
            className={cn(
              'hidden md:flex absolute p-4 opacity-20 top-20 transition-transform duration-500 rounded-md border-2 border-solid border-white font-semibold text-xs md:text-lg text-white',
              {
                'md:translate-x-[70vw]': currentIndex % 2 === 0,
                'md:translate-x-[10vw]': currentIndex % 2 !== 0,
              },
            )}
          >
            {t('click')}
          </div>
          {currentIndex === 0 && (
            <div
              className="relative z-1 flex flex-col justify-center items-center h-full text-white animate-jump-in animate-duration-[1500ms] animate-ease-in-out"
              onClick={() => setCurrentIndex(1)}
            >
              <h1 className="md:text-[40px] text-center">{t('rate')}</h1>
              <h2 className="text-7xl md:text-[200px] font-extrabold">
                {' '}
                {(result.aiResultResponse[localKey] as AiResultResponse)?.lovePercentage}
              </h2>
            </div>
          )}
          {currentIndex === 1 && (
            <div
              className="relative font-extrabold gap-4 z-1 flex flex-col justify-center items-center h-full text-white animate-jump-in animate-duration-[1500ms] animate-ease-in-out"
              onClick={() => setCurrentIndex(2)}
            >
              <h1 className="md:text-[40px] text-center">{t('GENERAL_RELATION_STATUS')}</h1>
              <h2 className="md:text-[40px] w-[90%] md:w-[50%] font-semibold text-center">
                {(result.aiResultResponse[localKey] as AiResultResponse).answerCategoryAnalysis.generalRelationStatus}
              </h2>
            </div>
          )}
          {currentIndex === 2 && (
            <div
              className="relative font-extrabold gap-4 z-1 flex flex-col justify-center items-center h-full text-white animate-jump-in animate-duration-[1500ms] animate-ease-in-out"
              onClick={() => setCurrentIndex(3)}
            >
              <h1 className="md:text-[40px] text-center">{t('EMOTIONAL_ATTACHMENT')}</h1>
              <h2 className="md:text-[40px] w-[90%] md:w-[50%] font-semibold text-center">
                {(result.aiResultResponse[localKey] as AiResultResponse).answerCategoryAnalysis.emotionalAttachment}
              </h2>
            </div>
          )}
          {currentIndex === 3 && (
            <div
              className="relative font-extrabold gap-4 z-1 flex flex-col justify-center items-center h-full text-white animate-jump-in animate-duration-[1500ms] animate-ease-in-out"
              onClick={() => setCurrentIndex(4)}
            >
              <h1 className="md:text-[40px] text-center">{t('LOYALTY_AND_TRUST')}</h1>
              <h2 className="md:text-[40px] w-[90%] md:w-[50%] font-semibold text-center">
                {(result.aiResultResponse[localKey] as AiResultResponse).answerCategoryAnalysis.loyaltyAndTrust}
              </h2>
            </div>
          )}
          {currentIndex === 4 && (
            <div
              className="relative font-extrabold gap-4 z-1 flex flex-col justify-center items-center h-full text-white animate-jump-in animate-duration-[1500ms] animate-ease-in-out"
              onClick={() => setCurrentIndex(5)}
            >
              <h1 className="md:text-[40px] text-center">{t('ROMANTIC_BEHAVIOR')}</h1>
              <h2 className="md:text-[40px] w-[90%] md:w-[50%] font-semibold text-center">
                {(result.aiResultResponse[localKey] as AiResultResponse).answerCategoryAnalysis.romanticBehavior}
              </h2>
            </div>
          )}
          {currentIndex === 5 && (
            <div
              className="relative font-extrabold gap-4 z-1 flex flex-col justify-center items-center h-full text-white animate-jump-in animate-duration-[1500ms] animate-ease-in-out"
              onClick={() => setCurrentIndex(6)}
            >
              <h1 className="md:text-[40px] text-center">{t('FUN_AND_DAILY_HABITS')}</h1>
              <h2 className="md:text-[40px] w-[90%] md:w-[50%] font-semibold text-center">
                {(result.aiResultResponse[localKey] as AiResultResponse).answerCategoryAnalysis.funAndDailyHabits}
              </h2>
            </div>
          )}
          {currentIndex === 6 && (
            <div
              className="relative font-extrabold gap-4 z-1 flex flex-col justify-center items-center h-full text-white animate-jump-in animate-duration-[1500ms] animate-ease-in-out"
              onClick={() => setCurrentIndex(7)}
            >
              <h1 className="md:text-[40px] text-center">{t('ai_comment')}</h1>
              <h2 className="md:text-[40px] w-[90%] md:w-[50%] font-semibold text-center">
                {(result.aiResultResponse[localKey] as AiResultResponse).comment}
              </h2>
            </div>
          )}
        </div>
      )}
    </React.Fragment>
  );
}
