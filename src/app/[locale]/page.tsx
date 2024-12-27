'use client';

import AppLayout from '@/components/AppLayout';
import Banner from '@/components/Banner';
import { CardSection } from '@/components/CardSection';
import { CTASection } from '@/components/CTASection';
import { FAQ } from '@/components/FAQ';
import { HeaderSection } from '@/components/HeaderSection';
import { Slider } from '@/components/Slider';
import { FAQConfig } from '@/config/FAQConfig';

export default function Home() {
  return (
    <AppLayout type="landing">
      <Banner />
      <CardSection />
      <HeaderSection />
      <CTASection />
      {/* <BlogPreview /> */}
      <Slider startIndex={0} endIndex={5} mirror={false} title={'AŞK’ına AŞK Katacak Öneriler ve Eğlenceli Fikirler'} />
      <Slider startIndex={6} endIndex={11} mirror title={'AŞK’ınla İzlenecek Film ve Diziler'} />
      <FAQ FAQuestions={FAQConfig.slice(0, 4)} type={'landing'} />
    </AppLayout>
  );
}
