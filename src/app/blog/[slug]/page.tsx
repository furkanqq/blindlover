'use client';

import { useAtom } from 'jotai';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

import AppLayout from '@/components/AppLayout';
import { Container } from '@/components/Container';
import LoadingScreen from '@/components/LoadingScreen';
import { DirectusServices } from '@/services/manager';
import { blogAtom } from '@/stores';
import { formatDate } from '@/utils/formatDate';

export default function BlogDetail() {
  const pathname = usePathname();
  const [blog] = useAtom(blogAtom);

  useEffect(() => {
    DirectusServices.Blog(pathname.slice(6));
  }, []);

  console.log(blog, 'blog');

  if (!blog) {
    return <LoadingScreen />;
  }

  return (
    <AppLayout type="landing" className="">
      <article className="">
        {/* Banner */}
        <div className="bg-[url(/heartPattern.png)] bg-cover flex flex-col justify-center items-center bg-transparent text-foreground text-center h-[300px] w-full">
          <h1 className="text-4xl mt-12 font-bold md:w-[720px]">{blog?.tr_title}</h1>
          <div className="text-md text-gray-500 mt-4">
            {blog.date_updated
              ? formatDate(blog.date_updated, { locale: 'tr-TR' })
              : formatDate(blog.date_created, { locale: 'tr-TR' })}
          </div>
        </div>

        <Container className="mt-12 flex flex-col gap-12">
          <div className="relative w-full h-[300px] py-[10px] flex justify-center items-center">
            <div className="relative h-full w-[350px] sm:w-[600px] md:w-[1000px] flex justify-center items-center overflow-hidden rounded-lg shadow-lg shadow-gray-400">
              <Image src={'/blog.png'} alt={'blog'} fill objectFit="cover" />
            </div>
          </div>
          <div className="px-2 md:px-32 text-[20px]" dangerouslySetInnerHTML={{ __html: blog?.tr_content }}></div>
        </Container>
      </article>
    </AppLayout>
  );
}
