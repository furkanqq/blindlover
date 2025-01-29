'use client';

import { useAtom } from 'jotai';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

import { AdPopupQuestion, AdSectionResult } from '@/components/Ads';
import AppLayout from '@/components/AppLayout';
import { Container } from '@/components/Container';
import LoadingScreen from '@/components/LoadingScreen';
import { BlindServices } from '@/services/manager';
import { QuestionResult } from '@/services/type';
import { resultAtom } from '@/stores';
import { cn } from '@/utils/cn';

const ResultContainer = ({ result }: { result: QuestionResult['data'] }) => {
  const [removeAds, setRemoveAds] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);

  // const downloadImage = async () => {
  //   setRemoveAds(true);
  //   // if (!divRef.current) return;

  //   // try {
  //   //   // Görsel boyutlarını manuel ayarlıyoruz
  //   //   const dataUrl = await toPng(divRef.current, {
  //   //     width: divRef.current.offsetWidth * 1.2, // Div'in genişliği
  //   //     height: divRef.current.offsetHeight, // Div'in yüksekliği
  //   //     style: {
  //   //       transform: 'scale(1)', // Boyutlandırma hatalarını önler
  //   //       transformOrigin: 'top left', // Scale ayarının referans noktasını belirler
  //   //     },
  //   //   });

  //   //   // const dataUrl = await toPng(divRef.current, {
  //   //   //   width: 1080, // Özel genişlik (ör. 1080px)
  //   //   //   height: 1920, // Özel yükseklik (ör. 1920px)
  //   //   // });

  //   //   // PNG'yi indir
  //   //   const link = document.createElement('a');
  //   //   link.href = dataUrl;
  //   //   link.download = 'test-result.png';
  //   //   link.click();
  //   //   setTimeout(() => {
  //   //     setRemoveAds(false);
  //   //   }, 500);
  //   // } catch (error) {
  //   //   console.error('Error creating image: ', error);
  //   // }

  //   if (!divRef.current) return;

  //   try {
  //     // Görseli Base64 olarak al
  //     const dataUrl = await toPng(divRef.current, {
  //       width: divRef.current.offsetWidth,
  //       height: divRef.current.offsetHeight,
  //       style: {
  //         transform: 'scale(1)',
  //         transformOrigin: 'top left',
  //       },
  //     });

  //     // Base64 formatındaki görseli paylaşmak için kullan
  //     const message = 'Skorumu paylaş! 🎉 İşte test sonucum:';
  //     const encodedMessage = encodeURIComponent(message);
  //     const encodedImage = encodeURIComponent(dataUrl);

  //     // Twitter paylaşımı örneği
  //     const twitterUrl = `https://x.com/compose/post?text=${encodedMessage}&url=${encodedImage}`;

  //     // Kullanıcıyı sosyal medya paylaşım sayfasına yönlendir
  //     window.open(twitterUrl, '_blank');
  //   } catch (error) {
  //     console.error('Error sharing image: ', error);
  //   }
  // };
  const [visibleSections, setVisibleSections] = useState<string[]>([]);
  const t = useTranslations('ResultPage');

  const as = false;
  if (as) {
    setRemoveAds(false);
  }

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
      { threshold: 0.3 }, // Eleman %30 görünür olduğunda tetiklenir
    );

    const sections = document.querySelectorAll('.fade-section');
    sections.forEach((section) => observer.current?.observe(section)); // Observer varsa çalıştır

    return () => {
      sections.forEach((section) => observer.current?.unobserve(section)); // Observer varsa çalıştır
      observer.current = null; // Bellek sızıntısını önlemek için sıfırla
    };
  }, []);

  return (
    <>
      {/* {' '}
      <button onClick={downloadImage} className="mt-52 bg-blue-500 text-white px-4 py-2 rounded-md">
        Görseli İndir
      </button> */}
      <Container ref={divRef} className="pt-24 grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6">
        {[
          {
            id: 'compatibility',
            title: 'rate',
            content: (
              <>
                <h2 className="relative z-[1] text-5xl md:text-[80px] font-extrabold">
                  {result.aiResultResponse.result.lovePercentage}
                </h2>
              </>
            ),
          },
          {
            id: 'ads',
            title: 'rate',
            content: (
              <>
                <h2 className="relative z-[1] text-5xl md:text-[80px] font-extrabold">
                  {result.aiResultResponse.result.lovePercentage}
                </h2>
              </>
            ),
          },
          {
            id: 'generalRelationStatus',
            title: 'GENERAL_RELATION_STATUS',
            content: (
              <h2 className="text-[14px] md:text-[18px] font-semibold text-center">
                {result.aiResultResponse.result?.answerCategoryAnalysis?.generalRelationStatus}
              </h2>
            ),
            image: '/general.png',
          },
          {
            id: 'emotionalAttachment',
            title: 'EMOTIONAL_ATTACHMENT',
            content: (
              <h2 className="text-[14px] md:text-[18px] font-semibold text-center">
                {result.aiResultResponse.result.answerCategoryAnalysis.emotionalAttachment}
              </h2>
            ),
            image: '/emotional.png',
          },
          {
            id: 'loyaltyAndTrust',
            title: 'LOYALTY_AND_TRUST',
            content: (
              <h2 className="text-[14px] md:text-[18px] font-semibold text-center">
                {result.aiResultResponse.result.answerCategoryAnalysis.loyaltyAndTrust}
              </h2>
            ),
            image: '/trust.png',
          },
          {
            id: 'romanticBehavior',
            title: 'ROMANTIC_BEHAVIOR',
            content: (
              <h2 className="text-[14px] md:text-[18px] font-semibold text-center">
                {result.aiResultResponse.result.answerCategoryAnalysis.romanticBehavior}
              </h2>
            ),
            image: '/romantic.png',
          },
          {
            id: 'funAndDailyHabits',
            title: 'FUN_AND_DAILY_HABITS',
            content: (
              <h2 className="text-[14px] md:text-[18px] font-semibold text-center">
                {result.aiResultResponse.result.answerCategoryAnalysis.funAndDailyHabits}
              </h2>
            ),
            image: '/fun.png',
          },
          {
            id: 'aiComment',
            title: 'ai_comment',
            content: (
              <h2 className="text-[14px] md:text-[18px] font-semibold text-center">
                {result.aiResultResponse.result.comment}
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
                'md:col-span-2 bg-primaryColor': id === 'ads',
                hidden: id === 'ads' && removeAds === true,
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
            {id === 'ads' ? (
              <div className="h-[240px] w-full">
                <AdSectionResult dataAdSlot={'7840612986'} dataAdFormat={'auto'} dataFullWidthResponsive={true} />
              </div>
            ) : (
              <>
                {id === 'compatibility' && (
                  <div className="absolute w-full h-full bg-[url(/heartPattern.png)] bg-cover bg-opacity-35 animate-card-custom-pulse"></div>
                )}
                {id !== 'compatibility' && (
                  <div className="absolute w-full h-full bg-[url(/heartPattern1.png)] bg-cover opacity-40"></div>
                )}
                <h1 className="relative z-[1] text-base md:text-[28px] font-bold">{t(title)}</h1>
                {content}
                {id !== 'compatibility' && <Image src={image as string} alt={'image'} width={80} height={100} />}
              </>
            )}
          </div>
        ))}
      </Container>
    </>
  );
};

export default function ResultPage() {
  const [result] = useAtom(resultAtom);
  const { slug } = useParams();
  const t = useTranslations('ResultPage');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    BlindServices.QuestionResult(slug as string);
  }, [slug]);

  useEffect(() => {
    if (currentIndex === 7) {
      setIsOpen(true);
    }
  }, [currentIndex]);

  if (!result) {
    return <LoadingScreen />;
  }

  return (
    <React.Fragment>
      {isOpen && (
        <AdPopupQuestion
          dataAdSlot={'7786181204'}
          dataAdFormat={'auto'}
          dataFullWidthResponsive={true}
          setIsOpen={setIsOpen}
        />
      )}
      {currentIndex === 7 ? (
        <AppLayout type="detail" slug>
          <ResultContainer result={result} />
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
                {result.aiResultResponse.result?.lovePercentage}
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
                {result.aiResultResponse.result.answerCategoryAnalysis.generalRelationStatus}
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
                {result.aiResultResponse.result.answerCategoryAnalysis.emotionalAttachment}
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
                {result.aiResultResponse.result.answerCategoryAnalysis.loyaltyAndTrust}
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
                {result.aiResultResponse.result.answerCategoryAnalysis.romanticBehavior}
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
                {result.aiResultResponse.result.answerCategoryAnalysis.funAndDailyHabits}
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
                {result.aiResultResponse.result.comment}
              </h2>
            </div>
          )}
        </div>
      )}
    </React.Fragment>
  );
}
