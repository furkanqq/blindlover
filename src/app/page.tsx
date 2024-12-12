'use client';

import AppLayout from '@/components/AppLayout';
import Banner from '@/components/Banner';
import { BlogPreview } from '@/components/BlogPreview';
import { CardSection } from '@/components/CardSection';
import { CTASection } from '@/components/CTASection';
import { FAQ } from '@/components/FAQ';
import { HeaderSection } from '@/components/HeaderSection';
import { Slider } from '@/components/Slider';

export default function Home() {
  return (
    <AppLayout type="landing">
      <Banner />
      <CardSection />
      <HeaderSection />
      <CTASection />
      {/* <BlogPreview /> */}
      <Slider title={'AŞK’ına AŞK Katacak Öneriler ve Eğlenceli Fikirler'} />
      <FAQ />
    </AppLayout>
  );
}
