import { ArrowRightIcon } from '@heroicons/react/16/solid';
import Image from 'next/image';

import { Link } from '@/i18n/routing';
import Button from '../Button';
import MarkdownContent from '../MarkdownContent';

const Card = ({
  title,
  desc,
  image,
  link,
  buttonText,
}: {
  title: string;
  desc: string;
  image: string;
  link: '/contents' | '/movies' | '/series';
  buttonText: string;
}) => {
  return (
    <article className="relative max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg">
      <div className="relative h-40">
        <Link href={`/blog${link}`}>
          <Image className="rounded-t-lg" src={image ? image : ''} alt="Blog Image" fill objectFit="cover" />
        </Link>
      </div>
      <div className="p-5 flex flex-col justify-between h-[19rem]">
        <Link href={`/blog${link}`}>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{title}</h5>
        </Link>
        <MarkdownContent content={desc} className="!mb-3 font-normal !text-gray-700 text-[14px]" />
        <Link href={`/blog${link}`}>
          <Button type={'button'} title={'Read More'} variant={'primary'}>
            {buttonText}
            <ArrowRightIcon width={16} height={16} />
          </Button>
        </Link>
      </div>
    </article>
  );
};

export { Card };
