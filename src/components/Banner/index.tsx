'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useContext } from 'react';

import { IconArrowRight } from '@/assets/IconArrowRight';
import { AuthContext } from '@/provider/Auth';
import Button from '../Button';

export default function Banner() {
  const { token } = useContext(AuthContext);

  return (
    <div className="flex flex-col md:flex-row h-[100vh]">
      <div className="flex justify-center items-end pb-12 md:pb-0 md:items-center h-1/2 md:h-full w-full md:w-1/2">
        <div className="w-[65%] flex flex-col gap-4 md:gap-10">
          <h1 className="text-[32px] leading-10 md:text-[52px]  md:leading-[60px] font-semibold">
            Aşkı Keşfetmenin En Eğlenceli Yolunu Senin İçin Tasarladık!
          </h1>
          <p className="text-[14px] text-foreground/50">
            İlişkinizin ne kadar güçlü olduğunu öğrenmek ya da hoşlandığın kişinin sana ilgisini ölçmek ister misin?
            Eğlenceli sorularla dolu testimizi hemen keşfet ve aşk yüzdesini öğren!
          </p>
          <Link href={token ? '/panel' : '/register'}>
            <Button
              className="flex justify-center items-center gap-4 w-full"
              variant="primary"
              title="Start Matching!"
              size="md"
              type={'button'}
            >
              <span>Teste Başla</span>
              <IconArrowRight />
            </Button>
          </Link>
        </div>
      </div>
      <div className="relative flex justify-center items-center h-1/2 md:h-full bg-primaryColor w-full md:w-1/2">
        <div className="relative h-[80%] w-full z-[1]">
          <Image className="object-contain" src="/banner.webp" alt="Banner" fill />
        </div>
        <div className="absolute w-full h-full z-[0] opacity-30">
          <Image className="object-cover" src="/pattern.webp" alt="Banner" fill />
        </div>
      </div>
    </div>
  );
}
