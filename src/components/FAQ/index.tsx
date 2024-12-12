import { ArrowRightIcon } from '@heroicons/react/16/solid';
import Link from 'next/link';

import { FAQTypes } from '@/types/types';
import Button from '../Button';
import { Container } from '../Container';

const FAQ = ({ FAQuestions, type }: { FAQuestions: FAQTypes[]; type: string }) => {
  return (
    <Container>
      <div className="relative w-full bg-backgroundColor px-6 md:mt-32 pt-10 pb-8 mt-8 shadow-xl sm:mx-auto sm:max-w-full sm:rounded-lg sm:px-10">
        <div className="mx-auto px-5">
          {type !== 'faqs' && (
            <div className="flex flex-col items-center">
              <h2 className="mt-5 text-center text-3xl font-bold tracking-tight md:text-5xl">FAQ</h2>
              <p className="mt-3 text-lg text-neutral-500 md:text-xl">Frequenty asked questions</p>
            </div>
          )}

          <div className="mx-auto mt-8 grid w-full divide-y divide-neutral-200">
            {FAQuestions &&
              FAQuestions.map((item, index) => (
                <div className="py-5" key={index}>
                  <details className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between font-medium">
                      <span>{item.question}</span>
                      <span className="transition group-open:rotate-180">
                        <svg
                          fill="none"
                          height="24"
                          shapeRendering="geometricPrecision"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          viewBox="0 0 24 24"
                          width="24"
                        >
                          <path d="M6 9l6 6 6-6"></path>
                        </svg>
                      </span>
                    </summary>
                    <p className="group-open:animate-fadeIn mt-3 text-neutral-600">{item.answer}</p>
                  </details>
                </div>
              ))}
            {type === 'landing' && (
              <div className="w-full flex justify-center items-center pt-7">
                <Link href={'/faqs'}>
                  <Button type={'button'} variant={'primary'} title={'See All'}>
                    Hepsini Gör
                    <ArrowRightIcon width={14} height={14} />
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export { FAQ };
