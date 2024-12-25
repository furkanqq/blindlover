'use client';

import { useAtom } from 'jotai';
import { usePathname } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

import AppLayout from '@/components/AppLayout';
import { Container } from '@/components/Container';
import LoadingScreen from '@/components/LoadingScreen';
import { BlindServices } from '@/services/manager';
import { QuestionResult } from '@/services/type';
import { resultAtom } from '@/stores';
import { cn } from '@/utils/cn';

export default function ResultPage() {
  const [result] = useAtom(resultAtom);
  const pathname = usePathname();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    BlindServices.QuestionResult(pathname.slice(8));
  }, [pathname]);

  if (!result) {
    return <LoadingScreen />;
  }
  return (
    <React.Fragment>
      {currentIndex === 7 ? (
        <AppLayout type="detail">
          <ResultContainer result={result} />
        </AppLayout>
      ) : (
        <div className="relative h-screen bg-primaryColor cursor-pointer">
          <div className="z-[0] absolute bg-[url(/heartPattern1.png)] h-full w-full animate-jump animate-infinite animate-duration-[8000ms] animate-ease-linear"></div>
          <div
            className={cn(
              'absolute p-4 opacity-20 top-20 transition-transform duration-500 rounded-md border-2 border-solid border-white font-semibold text-lg text-white',
              {
                'translate-x-[80vw]': currentIndex % 2 === 0,
                'translate-x-[10vw]': currentIndex % 2 !== 0,
              }
            )}
          >
            Ekrana bas ve ilerle
          </div>
          {currentIndex === 0 && (
            <div
              className="relative z-1 flex flex-col justify-center items-center h-full text-white animate-jump-in animate-duration-[1500ms] animate-ease-in-out"
              onClick={() => setCurrentIndex(1)}
            >
              <h1 className="text-[40px]">Uyumluluk Oranınız</h1>
              <h2 className="text-[200px] font-extrabold">{result.aiResultResponse.turkish.lovePercentage}</h2>
              <h3>Partnerinizle harika bir uyum içindesiniz!</h3>
            </div>
          )}
          {currentIndex === 1 && (
            <div
              className="relative font-extrabold gap-4 z-1 flex flex-col justify-center items-center h-full text-white animate-jump-in animate-duration-[1500ms] animate-ease-in-out"
              onClick={() => setCurrentIndex(2)}
            >
              <h1 className="text-[40px]">GENEL İLİŞKİ DURUMU</h1>
              <h2 className="text-[40px] w-[90%] md:w-[50%] font-semibold text-center">
                {result.aiResultResponse.turkish.answerCategoryAnalysis.generalRelationStatus}
              </h2>
            </div>
          )}
          {currentIndex === 2 && (
            <div
              className="relative font-extrabold gap-4 z-1 flex flex-col justify-center items-center h-full text-white animate-jump-in animate-duration-[1500ms] animate-ease-in-out"
              onClick={() => setCurrentIndex(3)}
            >
              <h1 className="text-[40px]">DUYGUSAL BAĞLILIK</h1>
              <h2 className="text-[40px] w-[90%] md:w-[50%] font-semibold text-center">
                {result.aiResultResponse.turkish.answerCategoryAnalysis.emotionalAttachment}
              </h2>
            </div>
          )}
          {currentIndex === 3 && (
            <div
              className="relative font-extrabold gap-4 z-1 flex flex-col justify-center items-center h-full text-white animate-jump-in animate-duration-[1500ms] animate-ease-in-out"
              onClick={() => setCurrentIndex(4)}
            >
              <h1 className="text-[40px]">SADAKAT VE GÜVEN</h1>
              <h2 className="text-[40px] w-[90%] md:w-[50%] font-semibold text-center">
                {result.aiResultResponse.turkish.answerCategoryAnalysis.loyaltyAndTrust}
              </h2>
            </div>
          )}
          {currentIndex === 4 && (
            <div
              className="relative font-extrabold gap-4 z-1 flex flex-col justify-center items-center h-full text-white animate-jump-in animate-duration-[1500ms] animate-ease-in-out"
              onClick={() => setCurrentIndex(5)}
            >
              <h1 className="text-[40px]">ROMANTİK DAVRANIŞLAR</h1>
              <h2 className="text-[40px] w-[90%] md:w-[50%] font-semibold text-center">
                {result.aiResultResponse.turkish.answerCategoryAnalysis.romanticBehavior}
              </h2>
            </div>
          )}
          {currentIndex === 5 && (
            <div
              className="relative font-extrabold gap-4 z-1 flex flex-col justify-center items-center h-full text-white animate-jump-in animate-duration-[1500ms] animate-ease-in-out"
              onClick={() => setCurrentIndex(6)}
            >
              <h1 className="text-[40px]">EĞLENCE VE GÜNLÜK ALIŞKANLIKLAR</h1>
              <h2 className="text-[40px] w-[90%] md:w-[50%] font-semibold text-center">
                {result.aiResultResponse.turkish.answerCategoryAnalysis.funAndDailyHabits}
              </h2>
            </div>
          )}
          {currentIndex === 6 && (
            <div
              className="relative font-extrabold gap-4 z-1 flex flex-col justify-center items-center h-full text-white animate-jump-in animate-duration-[1500ms] animate-ease-in-out"
              onClick={() => setCurrentIndex(7)}
            >
              <h1 className="text-[40px]">YAPAY ZEKA YORUMU</h1>
              <h2 className="text-[40px] w-[90%] md:w-[50%] font-semibold text-center">
                {result.aiResultResponse.turkish.comment}
              </h2>
            </div>
          )}
        </div>
      )}
    </React.Fragment>
  );
}

const ResultContainer = ({ result }: { result: QuestionResult['data'] }) => {
  const [visibleSections, setVisibleSections] = useState<string[]>([]);

  const observer = useRef<IntersectionObserver | null>(null); // IntersectionObserver türünü belirt

  useEffect(() => {
    // Observer'ı oluştur
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
      { threshold: 0.2 } // Eleman %20 görünür olduğunda tetiklenir
    );

    const sections = document.querySelectorAll('.fade-section');
    sections.forEach((section) => observer.current?.observe(section)); // Observer varsa çalıştır

    return () => {
      sections.forEach((section) => observer.current?.unobserve(section)); // Observer varsa çalıştır
      observer.current = null; // Bellek sızıntısını önlemek için sıfırla
    };
  }, []);

  return (
    <Container className="pt-24 grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6">
      {[
        {
          id: 'compatibility',
          title: 'Uyumluluk Oranınız',
          content: (
            <>
              <h2 className="relative z-[1] text-5xl md:text-[80px] font-extrabold">
                {result.aiResultResponse.turkish.lovePercentage}
              </h2>
              <h3 className="relative z-[1] text-xs">Partnerinizle harika bir uyum içindesiniz!</h3>
            </>
          ),
        },
        {
          id: 'generalRelationStatus',
          title: 'GENEL İLİŞKİ DURUMU',
          content: (
            <h2 className="text-[14px] md:text-[18px] font-semibold text-center">
              {result.aiResultResponse.turkish.answerCategoryAnalysis.generalRelationStatus}
            </h2>
          ),
        },
        {
          id: 'emotionalAttachment',
          title: 'DUYGUSAL BAĞLILIK',
          content: (
            <h2 className="text-[14px] md:text-[18px] font-semibold text-center">
              {result.aiResultResponse.turkish.answerCategoryAnalysis.emotionalAttachment}
            </h2>
          ),
        },
        {
          id: 'loyaltyAndTrust',
          title: 'SADAKAT VE GÜVEN',
          content: (
            <h2 className="text-[14px] md:text-[18px] font-semibold text-center">
              {result.aiResultResponse.turkish.answerCategoryAnalysis.loyaltyAndTrust}
            </h2>
          ),
        },
        {
          id: 'romanticBehavior',
          title: 'ROMANTİK DAVRANIŞLAR',
          content: (
            <h2 className="text-[14px] md:text-[18px] font-semibold text-center">
              {result.aiResultResponse.turkish.answerCategoryAnalysis.romanticBehavior}
            </h2>
          ),
        },
        {
          id: 'funAndDailyHabits',
          title: 'EĞLENCE VE GÜNLÜK ALIŞKANLIKLAR',
          content: (
            <h2 className="text-[14px] md:text-[18px] font-semibold text-center">
              {result.aiResultResponse.turkish.answerCategoryAnalysis.funAndDailyHabits}
            </h2>
          ),
        },
        {
          id: 'aiComment',
          title: 'YAPAY ZEKA YORUMU',
          content: (
            <h2 className="text-[14px] md:text-[18px] font-semibold text-center">
              {result.aiResultResponse.turkish.comment}
            </h2>
          ),
        },
      ].map(({ id, title, content }) => (
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
            }
          )}
        >
          {id === 'compatibility' && (
            <div className="absolute w-full h-full bg-[url(/heartPattern.png)] bg-cover bg-opacity-35 animate-card-custom-pulse"></div>
          )}
          {id !== 'compatibility' && (
            <div className="absolute w-full h-full bg-[url(/heartPattern1.png)] bg-cover opacity-40"></div>
          )}
          <h1 className="relative z-[1] text-base md:text-[28px] font-bold">{title}</h1>
          {content}
          <hr />
        </div>
      ))}
    </Container>
  );
};
