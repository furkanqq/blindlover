'use client';

import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';

import AppLayout from '@/components/AppLayout';
import LoadingScreen from '@/components/LoadingScreen';
import { BlindServices } from '@/services/manager';
import { answerListAtom } from '@/stores';

export default function ResultPage() {
  const [answerList] = useAtom(answerListAtom);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    BlindServices.QuestionResult();
  }, []);

  console.log(answerList, 'answerList');

  if (!answerList) {
    return <LoadingScreen />;
  }
  return (
    <AppLayout type="auth" className="bg-primaryColor">
      <div className="relative h-screen">
        <div className="z-[0] absolute bg-[url(/heartPattern1.png)] h-full w-full animate-jump animate-thrice animate-duration-[12000ms] animate-ease-linear"></div>
        {currentIndex === 0 && (
          <div
            className="relative z-1 flex flex-col justify-center items-center h-full text-white animate-jump-in animate-duration-[1500ms] animate-ease-in-out"
            onClick={() => setCurrentIndex(1)}
          >
            <h1 className="text-[40px]">Uyumluluk Oranınız</h1>
            <h2 className="text-[200px] font-extrabold">{answerList[0].aiResultResponse.turkish.lovePercentage}</h2>
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
              {answerList[0].aiResultResponse.turkish.answerCategoryAnalysis.generalRelationStatus}
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
              {answerList[0].aiResultResponse.turkish.answerCategoryAnalysis.emotionalAttachment}
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
              {answerList[0].aiResultResponse.turkish.answerCategoryAnalysis.loyaltyAndTrust}
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
              {answerList[0].aiResultResponse.turkish.answerCategoryAnalysis.romanticBehavior}
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
              {answerList[0].aiResultResponse.turkish.answerCategoryAnalysis.funAndDailyHabits}
            </h2>
          </div>
        )}
        {currentIndex === 6 && (
          <div
            className="relative font-extrabold gap-4 z-1 flex flex-col justify-center items-center h-full text-white animate-jump-in animate-duration-[1500ms] animate-ease-in-out"
            onClick={() => setCurrentIndex(6)}
          >
            <h1 className="text-[40px]">YAPAY ZEKA YORUMU</h1>
            <h2 className="text-[40px] w-[90%] md:w-[50%] font-semibold text-center">
              {answerList[0].aiResultResponse.turkish.comment}
            </h2>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
