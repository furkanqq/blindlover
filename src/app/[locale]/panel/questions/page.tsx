'use client';

import { useAtom } from 'jotai';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { IconChevronLeft } from '@/assets/IconChevronLeft';
import { IconChevronRight } from '@/assets/IconChevronRight';
import AppLayout from '@/components/AppLayout';
import Button from '@/components/Button';
import CircularProgressBar from '@/components/CircularProgressBar';
import { Container } from '@/components/Container';
import LoadingScreen from '@/components/LoadingScreen';
import QuizStepper from '@/components/QuizStepper';
import { Link } from '@/i18n/routing';
import { BlindServices } from '@/services/manager';
import { questionListAtom } from '@/stores';

interface TypeAnswer {
  questionId: string;
  answer: 'NO' | 'YES' | 'EMPTY';
}

interface TypeOptions {
  label: 'NO' | 'EMPTY' | 'YES';
  value: 'No' | 'Empty' | 'Yes';
}

export default function QuestionsPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [animationClass, setAnimationClass] = useState('');
  const [allAnswer, setAllAnswer] = useState<TypeAnswer[]>([]);
  const [questions] = useAtom(questionListAtom);
  const t = useTranslations('ResultPage');
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

  console.log(questions, 'questions');

  useEffect(() => {
    BlindServices.QuestionList();
  }, []);

  const options: TypeOptions[] = [
    { label: 'NO', value: 'No' },
    { label: 'EMPTY', value: 'Empty' },
    { label: 'YES', value: 'Yes' },
  ];

  const handleAnswer = (answer: 'NO' | 'YES' | 'EMPTY') => {
    if (!questions) return;

    const questionId = questions[currentQuestionIndex]._id.toString();

    setAllAnswer((prevAnswers) => {
      const existingAnswerIndex = prevAnswers.findIndex((ans) => ans.questionId.toString() === questionId.toString());
      const updatedAnswers = [...prevAnswers];

      if (existingAnswerIndex !== -1) {
        updatedAnswers[existingAnswerIndex].answer = answer; // Update existing answer
      } else {
        updatedAnswers.push({ questionId, answer }); // Add new answer
      }

      return updatedAnswers;
    });

    triggerAnimation(() => {
      setCurrentQuestionIndex((prev) => prev + 1);
    });
  };

  const triggerAnimation = (callback: () => void) => {
    setAnimationClass('-translate-x-full');
    setTimeout(() => {
      callback();
      setAnimationClass('translate-x-full');
      setTimeout(() => setAnimationClass(''), 300);
    }, 300);
  };

  useEffect(() => {
    if (!questions || currentQuestionIndex > questions.length) return;

    if (currentQuestionIndex === 50) {
      BlindServices.Answer({ answers: allAnswer, answerLanguage: locale as 'tr' | 'en' | 'es' | 'fr' | 'ru' | 'pt' });
    }
  }, [currentQuestionIndex, questions, allAnswer]);

  if (!questions) {
    return <LoadingScreen />;
  }

  const localKey: keyof (typeof questions)[0] = `${country}` as keyof (typeof questions)[0];

  return (
    <AppLayout className="relative bg-primaryColor w-full" type="auth">
      <div className="absolute bg-fixed bg-[url('/pattern.webp')] bg-repeat bg-contain opacity-35 w-full h-full top-0 left-0"></div>
      <Container className="relative z-1 h-[100vh] flex justify-center items-center">
        {currentQuestionIndex <= questions.length ? (
          <div className="bg-backgroundColor bg-[url(/heartPattern1.png)] bg-cover w-full h-[80%] rounded-xl overflow-hidden px-12 flex flex-col justify-center items-center gap-12">
            <div className="flex flex-col justify-center items-center gap-4">
              <Image src={'/blindlover.png'} alt="Blind Lover" width={200} height={120} />
              <div className="md:text-4xl w-full md:w-[40%] text-center font-semibold">{t('thanks')}</div>
              <Link href={'/'} className="text-white">
                <Button variant={'primary'} type={'button'} title={t('back_to_home')}>
                  {t('back_to_home')}
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-backgroundColor w-full h-[95%] md:h-[80%] rounded-xl overflow-hidden pt-4 md:py-0 px-3 md:px-12">
            <div className="h-[20%] flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center justify-center w-20">
                <span className="text-[32px] mr-1">{`${currentQuestionIndex + 1 >= 10 ? '' : '0'}${currentQuestionIndex + 1}`}</span>
                <span>/ {questions.length}</span>
              </div>
              <div className="flex flex-col justify-center items-center gap-4">
                <QuizStepper currentQuestion={currentQuestionIndex + 1} totalQuestions={questions.length} steps={5} />
                <div className="p-2 bg-primaryColor text-white rounded-md text-[12px]">
                  {t(questions[currentQuestionIndex].category)}
                </div>
              </div>
              <div className="hidden md:flex items-center justify-center w-20">
                <CircularProgressBar percentage={(currentQuestionIndex + 1) * (100 / questions.length)} />
              </div>
            </div>
            <div className="h-[70%] flex flex-col justify-start pt-12 items-center gap-12">
              <div
                className={`h-full flex flex-col items-center gap-12 transition-transform duration-300 ease-in-out w-full ${animationClass}`}
                key={questions[currentQuestionIndex]._id}
              >
                <h1 className="text-xl md:text-[44px] h-28 md:leading-[56px] text-center font-semibold px-4 md:px-28">
                  {(questions[currentQuestionIndex][localKey] as string) || ''}
                </h1>
                <div className="flex gap-4 md:gap-20">
                  {options.map((option, index) => (
                    <div
                      key={index}
                      className="flex justify-center items-center bg-primaryColor w-20 h-16 md:w-44 md:h-32 rounded-md active:scale-[0.98] cursor-pointer"
                      onClick={() => handleAnswer(option.label)}
                    >
                      <span className="md:text-[32px] text-white">{t(option.value.toUpperCase())}</span>
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
                  <span>{t('back')}</span>
                </Button>
                <Button
                  variant={'secondary'}
                  type={'button'}
                  title={''}
                  disabled={currentQuestionIndex === questions.length - 1}
                  onClick={() => handleAnswer('EMPTY')}
                >
                  <span>{t('next')}</span>
                  <IconChevronRight width={16} height={16} />
                </Button>
              </div>
            </div>
            <div className="h-[10%] flex justify-center items-center">
              <div className="text-[12px] flex justify-center items-center h-10 text-slate-700 border-r border-r-slate-800/30 pr-6 mr-1">
                {t('created')}
              </div>
              <Link href={'/'} className="">
                <Image src={'/blindlover_text.png'} alt="Blind Lover" width={150} height={90} />
              </Link>
            </div>
          </div>
        )}
      </Container>
    </AppLayout>
  );
}
