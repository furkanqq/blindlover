import { ArrowRightIcon } from '@heroicons/react/16/solid';
import Image from 'next/image';
import Link from 'next/link';

import Button from '../Button';

const BlogCard = ({
  title,
  desc,
  date,
  image,
  link,
}: {
  title: string;
  desc: string;
  date?: string;
  image: string;
  link: string;
}) => {
  return (
    <article className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div>{date}</div>
      <div className="relative h-40">
        <Link href={`/blog/${link}`}>
          <Image className="rounded-t-lg" src={image ? image : ''} alt="Blog Image" fill objectFit="cover" />
        </Link>
      </div>
      <div className="p-5">
        <Link href={`/blog/${link}`}>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{title}</h5>
        </Link>
        <div
          className="mb-3 font-normal text-gray-700 dark:text-gray-400"
          dangerouslySetInnerHTML={{ __html: desc }}
        ></div>
        <Link href={`/blog/${link}`}>
          <Button type={'button'} title={'Read More'} variant={'primary'}>
            Read more
            <ArrowRightIcon width={16} height={16} />
          </Button>
        </Link>
      </div>
    </article>
  );
};

export { BlogCard };
