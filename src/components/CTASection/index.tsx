import Image from 'next/image';
import Link from 'next/link';

import { IconAppleBadge } from '@/assets/IconAppleBadge';
import { Container } from '../Container';

const CTASection = () => {
  return (
    <Container>
      <div className="w-full">
        <div className="mx-auto w-full pt-24 sm:pt-32">
          <div className="w-full relative isolate overflow-hidden bg-primaryColor px-6 pt-16 shadow-2xl rounded-lg sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
            <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
              <h2 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Seni Ne Kadar Seviyor? HEMEN ÖĞREN!
              </h2>
              <p className="mt-6 text-pretty text-lg/8 text-gray-300">
                Sevgilin ya da hoşlandığın seni ne kadar seviyor öğrenmek için teste katıl. Uygulamayı indir ya da
                burada devam et!
              </p>
              <div className="mt-10 flex flex-col justify-center lg:justify-start">
                <Link
                  href={'/register'}
                  className="rounded-md w-fit bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  HEMEN BAŞLA!
                </Link>
                <div className="text-white mt-2 text-[12px]">Ya da mobil uygulamamızı indir!</div>
                <div className="flex gap-2 relative">
                  <Link href={'#'} className="relative">
                    <Image src="/gplaybadge.png" alt="Google Play" width={100} height={50} />
                  </Link>
                  <Link href={'#'}>
                    <Image src="/appstore.png" alt="App Store" width={100} height={50} />
                  </Link>
                </div>
              </div>
            </div>
            <div className="relative mt-16 h-80 lg:mt-8">
              {/* <Image
                className="absolute left-0 top-0 w-[57rem] max-w-none rounded-md bg-white/5 ring-1 ring-white/10"
                src="https://tailwindui.com/plus/img/component-images/dark-project-app-screenshot.png"
                alt="App screenshot"
                width="1824"
                height="1080"
              /> */}
              <div className="absolute w-[1824px] h-[1080px] left-0 top-0  max-w-none rounded-md bg-white ring-1 ring-white/10"></div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export { CTASection };
