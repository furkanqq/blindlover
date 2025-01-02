'use client';

import AppLayout from '@/components/AppLayout';
import ResultPageComponent from '@/components/ResultPageComponent';

export default function ErrorNotFound() {
  return (
    <AppLayout type="auth">
      <ResultPageComponent
        imgUrl={'/404.png'}
        title={"Oops! Looks like you're lost."}
        desc={
          "We couldn't find the page you were searching for. It might have been removed or is temporarily unavailable."
        }
        homeB
      />
    </AppLayout>
  );
}
