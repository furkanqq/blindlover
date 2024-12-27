'use client';

import React from 'react';

import AppLayout from '@/components/AppLayout';
import { FAQ } from '@/components/FAQ';
import { FAQConfig } from '@/config/FAQConfig';

export default function FAQsPage() {
  return (
    <AppLayout type="landing" className="">
      <div className="">
        <div className="bg-[url(/heartPattern.png)] bg-cover flex flex-col justify-center items-center bg-transparent text-foreground text-center h-[400px] w-full">
          <h1 className="text-4xl font-bold">SSS</h1>
          <p className="text-md text-gray-500 mt-4">Sıkça Sorulan Sorular.</p>
        </div>

        <FAQ FAQuestions={FAQConfig} type={'faqs'} />
      </div>
    </AppLayout>
  );
}
