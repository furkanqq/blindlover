'use client';

import Link from 'next/link';
import { useState } from 'react';

import AppLayout from '@/components/AppLayout';
import Button from '@/components/Button';
import { Container } from '@/components/Container';
import { cn } from '@/utils/cn';

export default function PanelPage() {
  const [move, setMove] = useState(false);
  return (
    <AppLayout>
      <Container className="pt-32 h-fit">
        <div className="flex justify-center items-center flex-col  h-fit w-full gap-12">
          <div
            className={cn(
              "relative flex justify-between h-14 w-[50%] text-center text-gray-500 bg-gray-100 rounded-xl p-1 after:absolute after:content-[''] after:w-[50%] after:h-11 after:top-[50%] after:translate-y-[-50%] after:bg-white after:rounded-xl after:transition-transform after:duration-500 after:ease-in-out",
              {
                'after:translate-x-[96%]': move,
                'after:translate-x-[1%]': !move,
              }
            )}
          >
            <div
              onClick={() => setMove(false)}
              className="w-1/2 h-full relative z-10 text-center flex justify-center items-center cursor-pointer"
            >
              <span>Career Test on Information</span>
            </div>
            <div
              onClick={() => setMove(true)}
              className="w-1/2 h-full relative z-10 text-center flex justify-center items-center cursor-pointer"
            >
              <span>Test History</span>
            </div>
          </div>
          <div className="w-full">
            <div
              id="page1"
              className={cn('h-[50vh] flex w-full', {
                hidden: move,
              })}
            >
              <div className="flex flex-col items-center gap-12">
                <div className="flex flex-col items-center">
                  <h3 className="text-2xl">Discover Compatibility</h3>
                  <span className="text-xs text-slate-600">Are You Ready to Learn How Strong Your Bond Is?</span>
                </div>
                <div className="text-center md:px-40">
                  {` This test is designed to help you explore the compatibility between you and the person you're thinking
                  about! With 5 categories—General Relationship Status, Emotional Connection, Loyalty and Trust,
                  Romantic Gestures, and Fun & Daily Habits—this fun quiz consists of 50 questions that will help you
                  understand the depth of your bond. While answering the questions, consider your relationship with the
                  person in mind. The results will show your compatibility level and highlight the strengths of your
                  relationship. If you're ready, take the test to uncover the dynamics between you and map out your
                  relationship. Who knows, this journey might bring you even closer together!`}
                </div>
                <div className="flex gap-12">
                  <Link href={'/panel/questions'}>
                    <Button variant={'primary'} size="md" type={'button'} title={''} className="w-40">
                      Start Test
                    </Button>
                  </Link>

                  <Button variant={'blue'} size="md" type={'button'} title={''} className="w-40">
                    Watch Video
                  </Button>
                </div>
              </div>
            </div>
            <div
              id="page2"
              className={cn('h-[100vh] hidden bg-blue-500 w-full border border-solid', {
                flex: move,
              })}
            ></div>
          </div>
        </div>
      </Container>
    </AppLayout>
  );
}
