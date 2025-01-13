import { ArrowRightIcon } from '@heroicons/react/16/solid';
import Image from 'next/image';

import { Link } from '@/i18n/routing';
import Button from '../Button';
import MarkdownContent from '../MarkdownContent';

const BlogCard = ({
  title,
  desc,
  image,
  link,
  buttonText,
}: {
  title: string;
  desc: string;
  image: string;
  link: string;
  buttonText: string;
}) => {
  return (
    <article className="relative max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
      <div className="relative h-40">
        <Link
          href={{
            pathname: '/blog/contents/[slug]',
            params: { slug: link },
          }}
        >
          <Image className="" src={image} alt="Blog Image" fill objectFit="cover" objectPosition="top" />
        </Link>
      </div>
      <div className="p-5 flex flex-col justify-between h-[20rem]">
        <Link
          href={{
            pathname: '/blog/contents/[slug]',
            params: { slug: link },
          }}
        >
          <h5 className="mb-2 text-xl sm:text-2xl font-bold tracking-tight text-gray-900">{title}</h5>
        </Link>
        <MarkdownContent content={desc} className="!mb-3 font-normal !text-gray-700 text-xs sm:text-[14px]" />
        <Link
          href={{
            pathname: '/blog/contents/[slug]',
            params: { slug: link },
          }}
        >
          <Button type={'button'} title={'Read More'} variant={'primary'}>
            {buttonText}
            <ArrowRightIcon width={16} height={16} />
          </Button>
        </Link>
      </div>
    </article>
  );
};

export { BlogCard };
