import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

const MovieCard = ({ title, desc, image, link }: { title: string; desc: string; image: string; link: string }) => {
  const t = useTranslations('BlogPage');

  return (
    <article className="relative w-full bg-white border border-gray-200 flex rounded-lg shadow-lg overflow-hidden hover:scale-[1.03] transition-transform">
      <div className="relative h-full w-4/12 hidden md:flex">
        <Image className="" src={image ? image : ''} alt="Blog Image" fill objectFit="cover" />
      </div>
      <div className="p-5 flex sm:w-8/12 w-full flex-col justify-center gap-4 sm:h-[12rem]">
        <h5 className="mb-2 text-xl sm:text-2xl font-bold tracking-tight text-gray-900">{title}</h5>
        <div className="!mb-3 font-normal !text-gray-700 text-xs sm:text-[14px]">{desc}</div>

        <Link href={link} target="_blank" className="flex gap-2 items-center text-xs">
          <div>{t('more_detail')}:</div>
          <Image src="/imdb.png" alt="Blog Image" width={48} height={24} objectFit="cover" />
        </Link>
      </div>
    </article>
  );
};

export { MovieCard };
