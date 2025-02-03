'use client';

import { useAtom } from 'jotai';
import { useLocale } from 'next-intl';
import { NextSeo } from 'next-seo';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

import AppLayout from '@/components/AppLayout';
import { Container } from '@/components/Container';
import LoadingScreen from '@/components/LoadingScreen';
import MarkdownContent from '@/components/MarkdownContent';
import { DirectusServices } from '@/services/manager';
import { blogAtom } from '@/stores';

export default function BlogDetail() {
  const { slug } = useParams();
  const [blog] = useAtom(blogAtom);
  const locale = useLocale();

  useEffect(() => {
    DirectusServices.Blog(slug as string);
  }, [slug]);

  if (!blog) {
    return <LoadingScreen />;
  }

  const titleKey = `title_${locale}` as keyof typeof blog;
  const descKey = `content_${locale}` as keyof typeof blog;
  return (
    <AppLayout type="detail" className="" slug>
      <NextSeo
        title="Blog | Blind Lover"
        description="Read insightful articles about love, relationships, and compatibility with AI-powered analysis."
        canonical={`https://blindlover.com/${locale}/blog/contents`}
        openGraph={{
          url: `https://blindlover.com/${locale}/blog/contents`,
          title: 'Blog | Blind Lover',
          description: 'Read insightful articles about love, relationships, and compatibility.',
        }}
      />
      <article className="">
        {/* Banner */}
        <div className="bg-[url(/heartPattern.png)] bg-cover flex flex-col justify-center items-center bg-transparent text-foreground text-center h-[300px] w-full">
          <h1 className="text-4xl mt-12 font-bold md:w-[720px]">{blog[titleKey]}</h1>
          {/* <div className="text-md text-gray-500 mt-4">
            {blog.date_created && formatDate(blog.date_created, { locale: `${locale}-${locale.toUpperCase()}` })}
          </div> */}
        </div>

        <Container className="mt-12 flex flex-col gap-12">
          <div className="relative w-full h-[300px] py-[10px] flex justify-center items-center">
            <div className="relative h-full w-[350px] sm:w-[600px] md:w-[760px] flex justify-center items-center overflow-hidden rounded-lg shadow-lg shadow-gray-400">
              <Image
                src={`${process.env.NEXT_PUBLIC_DIRECTUS_API_URL + '/assets/' + blog?.banner_image}`}
                alt={'blog'}
                fill
                objectFit="cover"
                objectPosition="top"
                loading="lazy"
              />
            </div>
          </div>
          <MarkdownContent content={blog[descKey] as string} />
        </Container>
      </article>
    </AppLayout>
  );
}
