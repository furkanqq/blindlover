import Image from 'next/image';
import Link from 'next/link';

import Button from '../Button';
import { Container } from '../Container';

const CTASection = () => {
  return (
    <Container>
      <div className="w-full">
        <div className="mx-auto w-full pt-24 sm:pt-32">
          <div className="w-full relative isolate overflow-hidden  border border-solid bg-backgroundColor px-6 pt-16 pb-16 lg:pb-0 rounded-lg sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
            <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
              <h2 className="text-balance text-3xl font-semibold tracking-tight text-primaryColor sm:text-4xl">
                Seni Ne Kadar Seviyor? HEMEN ÖĞREN!
              </h2>
              <p className="mt-6 text-pretty text-lg/8 text-gray-500">
                Sevgilin ya da hoşlandığın kişi seni ne kadar seviyor öğrenmek için teste katıl. Uygulamayı indir ya da
                burada devam et!
              </p>
              <div className="mt-10 flex flex-col gap-3 justify-center items-center lg:items-start lg:justify-start">
                <Link href={'/register'}>
                  <Button variant={'primary'} type={'button'} title={'Lets Start'}>
                    HEMEN BAŞLA!
                  </Button>
                </Link>
                <div className="text-primaryColor mt-2 text-[12px]">Ya da mobil uygulamamızı indir!</div>
                <div className="flex gap-2 relative">
                  <Link href={'/'} className="relative h-[50px] w-[120px]">
                    <Image src="/gplaybadge.png" alt="Google Play" fill objectFit="cover" />
                  </Link>
                  <Link href={'/'} className="relative h-[50px] w-[120px]">
                    <Image src="/appstore.png" alt="App Store" fill objectFit="cover" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="relative h-80 hidden lg:flex">
              <div className="absolute w-[800px] h-[800px] left-0 top-0  max-w-none overflow-hidden bg-white ring-1 ring-white/10">
                <Image src="/CTA.png" alt="App screenshot" fill />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export { CTASection };
