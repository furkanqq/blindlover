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
    <article className="relative w-full bg-white border border-gray-200 flex rounded-lg shadow-lg overflow-hidden hover:scale-[1.03] transition-transform">
      <div className="relative h-full w-4/12 hidden md:flex">
        <Link
          href={{
            pathname: '/blog/contents/[slug]',
            params: { slug: link },
          }}
        >
          <Image className="" src={image ? image : ''} alt="Blog Image" fill objectFit="cover" />
        </Link>
      </div>
      <div className="p-5 flex sm:w-8/12 w-full flex-col justify-between sm:h-[20rem]">
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
