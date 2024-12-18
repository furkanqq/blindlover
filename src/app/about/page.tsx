'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import AppLayout from '@/components/AppLayout';
import Button from '@/components/Button';
import { Container } from '@/components/Container';
import { CTASection } from '@/components/CTASection';

export default function BlogPage() {
  return (
    <AppLayout type="detail" className="">
      <div className="">
        {/* Banner */}
        <div className="bg-[url(/heartPattern.png)] bg-cover flex flex-col justify-center items-center bg-transparent text-foreground text-center h-[50vh] w-full">
          <h1 className="text-6xl font-bold">Hakkımızda</h1>
          <p className="text-md text-gray-500 mt-4">Sevginizin gücünü, testimizle ölçün.</p>
        </div>

        <Container className="h-[70vh] flex justify-between mt-20">
          <div className="relative h-full w-[36%]">
            <Image src="/about.png" alt="Blind Lover" fill objectFit="cover" objectPosition="top" />
          </div>
          <div className="w-[60%] h-full flex flex-col justify-center gap-6">
            <h2 className="text-5xl h-20 font-semibold flex items-center bg-gradient-to-r from-black via-primaryDisabled to-primaryColor text-transparent bg-clip-text">
              <span>Aşkı Ölçmenin Formülü Var Mı?</span>
            </h2>
            <p>
              Bizce var! BlindLover, ilişkilerinize veya hoşlandığınız kişiye dair o merak ettiğiniz soruların cevabını
              bulmanıza yardımcı olmak için burada. İster sevgilinize olan aşkını test edin, ister hoşlandığınız kişinin
              size olan ilgisini keşfedin; BlindLover, size eğlenceli bir yolculuk sunar.
            </p>
            <p>
              Testlerimiz, yapay zekanın gücüyle analiz edilerek size özel sonuçlar sunar. Yüzdelik aşk skorunuz,
              eğlenceli yorumlarla birlikte size sunulur. İlişkileri eğlenceli ve interaktif bir şekilde değerlendirmek
              isteyenler için tasarlandık!
            </p>
            <Link href={'/panel'}>
              <Button size="md" type={'button'} title={'Lets Start'} variant={'primary'}>
                Hemen Başla
              </Button>
            </Link>
          </div>
        </Container>

        <Container className="mt-24 sm-mt-32">
          <div className="rounded-lg text-center">
            <h1 className="text-4xl font-extrabold mb-6 border-b-[1px] border-white pb-4">Ne Sunuyoruz?</h1>
            <div className="grid grid-cols-2 justify-center items-center gap-4">
              <div className="flex flex-col items-center justify-center rounded-lg h-36   bg-white px-4">
                <span className="text-3xl mr-4">🎯</span>
                <span className="text-md">
                  Eğlenceli ve Kişisel Testler: Sadece size özel sorularla, aşk yüzdesini keşfetmenin keyfini çıkarın.
                </span>
              </div>
              <div className="flex flex-col items-center justify-center rounded-lg h-36   bg-white px-4">
                <span className="text-3xl mr-4">💡</span>
                <span className="text-md">
                  Yapay Zeka Destekli Analizler: Yanıtlarınızı analiz ederek size en doğru sonuçları sunuyoruz.
                </span>
              </div>
              <div className="flex flex-col items-center justify-center rounded-lg h-36   bg-white px-4">
                <span className="text-3xl mr-4">📱</span>
                <span className="text-md">
                  Mobil ve Web Erişimi: Hem uygulama hem de web üzerinden kolayca testlere katılabilirsiniz.
                </span>
              </div>
              <div className="flex flex-col items-center justify-center rounded-lg h-36   bg-white px-4">
                <span className="text-3xl mr-4">🧠</span>
                <span className="text-md">
                  Her Yaşa ve Duruma Uygun: Genç bir ilişki mi, uzun yıllara dayanan bir bağ mı? Ya da belki sadece
                  hoşlandığınız bir kişi var? Hepsi için biz hazırız.
                </span>
              </div>
            </div>
          </div>
        </Container>

        <Container className="mt-24 sm:mt-32">
          <div className=" text-gray-800 rounded-lg p-8 text-center bg-gradient-to-r bg-primaryColor">
            <h1 className="text-4xl font-extrabold mb-6 text-white">Blindlover’ı Keşfet!</h1>
            <p className="text-lg leading-relaxed text-white">
              Aşkınızı test etmek, biraz eğlenmek ve belki de ilişkiniz hakkında daha fazla şey öğrenmek için
              <span className="font-bold text-black"> BlindLover</span> doğru yer. Cevaplarınızı verin, sonuçlarınızı
              alın ve hayatınızdaki aşkın seviyesini öğrenin.
            </p>
            <p className="text-lg leading-relaxed mt-4 text-white">
              Unutmayın, her aşk bir yolculuktur, ama biz bu yolculuğu çok daha eğlenceli hale getiriyoruz!
            </p>
          </div>
        </Container>

        <CTASection />

        <Container className="mt-24 sm:mt-32">
          <div className="relative border border-solid  gap-6 rounded-lg overflow-hidden flex flex-col justify-center items-end bg-transparent text-foreground text-center h-[50vh] w-full shadow">
            <div className="absolute w-full h-full">
              <Image src="/aboutBanner.png" alt="Blind Lover" fill objectFit="cover" objectPosition="top" />
            </div>
            <h1 className="mr-24 relative z-1 text-4xl font-bold">Seni Ne Kadar Seviyor?</h1>
            <p className="mr-24 relative z-1 text-md text-primaryColor mt-4">Cevabı Bizde!</p>
            <div className="relative z-1 flex justify-center items-center mr-24 gap-6">
              <Button type={'button'} title={'Lets Start'} variant={'secondary'} className="w-32">
                Hemen Başla
              </Button>
              <span className="text-xs">Ya da</span>
              <Button type={'button'} title={'Lets Start'} variant={'primary'} className="w-32">
                Kayıt Ol
              </Button>
            </div>
          </div>
        </Container>

        {/* Content */}
        <Container className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"></div>
        </Container>
      </div>
    </AppLayout>
  );
}
