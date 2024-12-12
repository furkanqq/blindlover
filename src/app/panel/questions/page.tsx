'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { IconChevronLeft } from '@/assets/IconChevronLeft';
import { IconChevronRight } from '@/assets/IconChevronRight';
import AppLayout from '@/components/AppLayout';
import Button from '@/components/Button';
import CircularProgressBar from '@/components/CircularProgressBar';
import { Container } from '@/components/Container';
import QuizStepper from '@/components/QuizStepper';
import { questions } from '@/config/dummyQuestions';

export default function QuestionsPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [animationClass, setAnimationClass] = useState('');

  const handleAnswer = () => {
    if (currentQuestionIndex < questions.length - 1) {
      // Animasyonu tetikle
      setAnimationClass('-translate-x-full');
      setTimeout(() => {
        setCurrentQuestionIndex((prev) => prev + 1);
        setAnimationClass('translate-x-full');
        setTimeout(() => setAnimationClass(''), 300); // Animasyon bitince sıfırla
      }, 300);
    }
  };

  return (
    <AppLayout className="relative bg-primaryColor w-full" type="auth">
      <div className="absolute bg-fixed bg-[url('/pattern.webp')] bg-repeat bg-contain opacity-35 w-full h-full top-0 left-0"></div>
      <Container className="relative z-1 h-[100vh] flex justify-center items-center">
        <div className="bg-backgroundColor w-full h-[80%] rounded-xl overflow-hidden px-12">
          <div className="h-[15%] flex justify-between">
            <div className="flex items-center justify-center w-20">
              <span className="text-[32px] mr-1">{`${currentQuestionIndex + 1 >= 10 ? '' : '0'}${currentQuestionIndex + 1}`}</span>
              <span>/ {questions.length}</span>
            </div>
            <div className="flex justify-center items-center">
              <QuizStepper currentQuestion={currentQuestionIndex + 1} totalQuestions={questions.length} steps={5} />
            </div>
            <div className="flex items-center justify-center w-20">
              <CircularProgressBar percentage={(currentQuestionIndex + 1) * (100 / questions.length)} />
            </div>
          </div>
          <div className="h-[70%] flex flex-col justify-start pt-12 items-center gap-12">
            <div
              className={`h-full flex flex-col items-center gap-12 transition-transform duration-300 ease-in-out w-full ${animationClass}`}
              key={questions[currentQuestionIndex].id}
            >
              <h1 className="text-[44px] h-28 leading-[56px] text-center font-semibold px-28">
                {questions[currentQuestionIndex].question}
              </h1>
              <div className="flex gap-20">
                {questions[currentQuestionIndex].options.map((option, index) => (
                  <div
                    key={index}
                    className="flex justify-center items-center bg-primaryColor w-44 h-32 rounded-md active:scale-[0.98] cursor-pointer"
                    onClick={handleAnswer}
                  >
                    <span className="text-[32px] text-white">{option}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-between w-full">
              <Button
                variant={'secondary'}
                type={'button'}
                title={''}
                disabled={currentQuestionIndex === 0}
                onClick={() => setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0))}
              >
                <IconChevronLeft width={16} height={16} />
                <span>Back</span>
              </Button>
              <Button
                variant={'secondary'}
                type={'button'}
                title={''}
                disabled={currentQuestionIndex === questions.length - 1}
                onClick={handleAnswer}
              >
                <span>Next</span>
                <IconChevronRight width={16} height={16} />
              </Button>
            </div>
          </div>
          <div className="h-[15%] flex justify-center items-center">
            <div className="text-[12px] flex justify-center items-center h-10 text-slate-700 border-r border-r-slate-800/30 pr-6 mr-1">
              These questions were created with
            </div>
            <Link href={'/'} className="">
              <Image src={'/blindlover_text.png'} alt="Blind Lover" width={150} height={90} />
            </Link>
          </div>
        </div>
      </Container>
    </AppLayout>
  );
}
