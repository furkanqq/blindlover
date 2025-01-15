import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { Container } from '../Container';

const HeaderSection = () => {
  const t = useTranslations('LandingPage');

  return (
    <div className={'relative isolate overflow-hidden bg-primaryColor py-14 sm:pt-32'}>
      <Image src={'/pattern.webp'} alt="pattern" fill className="absolute object-cover opacity-20" />
      <Container>
        <div className="flex flex-col gap-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl lg:mx-0">
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">{t('headerSection.title')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 w-fit gap-4 md:gap-12 mt-6">
            <div className="flex justify-center items-center bg-backgroundColor gap-4 border border-solid h-[80px] md:h-[120px] w-fit p-4 rounded">
              <div className="!w-10 h-10 bg-primaryColor text-white rounded-full text-[20px] flex justify-center items-center">
                <span>1</span>
              </div>
              <span className="w-[200px] text-xs md:text-base">{t('headerSection.one')}</span>
            </div>
            <div className="flex justify-center items-center bg-backgroundColor gap-4 border border-solid h-[80px] md:h-[120px] w-fit p-4 rounded">
              <div className="!w-10 h-10 bg-primaryColor text-white rounded-full text-[20px] flex justify-center items-center">
                <span>2</span>
              </div>
              <span className="w-[200px] text-xs md:text-base">{t('headerSection.two')}</span>
            </div>
            <div className="flex justify-center items-center bg-backgroundColor gap-4 border border-solid  h-[80px] md:h-[120px]  w-fit p-4 rounded">
              <div className="!w-10 h-10 bg-primaryColor text-white rounded-full text-[20px] flex justify-center items-center">
                <span>3</span>
              </div>
              <span className="w-[200px] text-xs md:text-base">{t('headerSection.three')}</span>
            </div>
            <div className="flex justify-center items-center bg-backgroundColor gap-4 border border-solid h-[80px] md:h-[120px]  w-fit p-4 rounded">
              <div className="!w-10 h-10 bg-primaryColor text-white rounded-full text-[20px] flex justify-center items-center">
                <span>4</span>
              </div>
              <span className="w-[200px] text-xs md:text-base">{t('headerSection.four')}</span>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export { HeaderSection };
