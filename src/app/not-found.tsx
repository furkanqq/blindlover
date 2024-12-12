import Image from 'next/image';
import Link from 'next/link';

import AppLayout from '@/components/AppLayout';
import Button from '@/components/Button';
import { Container } from '@/components/Container';
import HeartAnimation from '@/components/HeartAnimation';
import ResultPageComponent from '@/components/ResultPageComponent';

export default function ErrorNotFound() {
  return (
    <AppLayout type="auth">
      {/* <div>
        {Array.from({ length: 5 }, (_, index) => (
          <HeartAnimation topPX={`${100 + index * 100}px`} leftPX={index % 2 === 0 ? '40px' : '80px'} key={index} />
        ))}
      </div> */}
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
