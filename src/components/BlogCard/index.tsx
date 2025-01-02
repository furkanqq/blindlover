import { ArrowRightIcon } from '@heroicons/react/16/solid';
import { useLocale } from 'next-intl';
import Image from 'next/image';

import { Link } from '@/i18n/routing';
import { formatDate } from '@/utils/formatDate';
import Button from '../Button';
import MarkdownContent from '../MarkdownContent';

const BlogCard = ({
  title,
  desc,
  date,
  image,
  link,
  buttonText,
}: {
  title: string;
  desc: string;
  date?: string;
  image: string;
  link: string;
  buttonText: string;
}) => {
  const locale = useLocale();
  return (
    <article className="relative max-w-sm bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 shadow-lg">
      <div className="absolute bottom-1 right-2 text-xs text-gray-400">
        {formatDate(date as string, { locale: `${locale}-${locale.toUpperCase()}` })}
      </div>
      <div className="relative h-40">
        <Link
          href={{
            pathname: '/blog/[slug]',
            params: { slug: link },
          }}
        >
          <Image className="rounded-t-lg" src={image ? image : ''} alt="Blog Image" fill objectFit="cover" />
        </Link>
      </div>
      <div className="p-5 flex flex-col justify-between h-[22rem]">
        <Link
          href={{
            pathname: '/blog/[slug]',
            params: { slug: link },
          }}
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{title}</h5>
        </Link>
        <MarkdownContent content={desc} className="!mb-3 font-normal !text-gray-700 text-[14px]" />
        <Link
          href={{
            pathname: '/blog/[slug]',
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
