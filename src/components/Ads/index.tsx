'use client';

import { useEffect } from 'react';

type AdSectionType = {
  dataAdSlot: string;
  dataAdFormat: string;
  dataFullWidthResponsive: boolean;
};

export const AdSectionLanding = ({ dataAdSlot, dataAdFormat, dataFullWidthResponsive }: AdSectionType) => {
  useEffect(() => {
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch (error: any) {
      console.log(error.message);
    }
  }, []);

  return (
    <div className="flex w-full h-[240px] justify-center items-center pt-24 sm:pt-32">
      <div className="w-[80%] h-full">
        <ins
          className="adsbygoogle block"
          data-ad-client={`ca-pub-${process.env.NEXT_ADSENSE_KEY}`}
          data-ad-slot={dataAdSlot}
          data-ad-format={dataAdFormat}
          data-full-width-responsive={dataFullWidthResponsive.toString()}
        />
      </div>
    </div>
  );
};

export const AdSectionFaq = ({ dataAdSlot, dataAdFormat, dataFullWidthResponsive }: AdSectionType) => {
  useEffect(() => {
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch (error: any) {
      console.log(error.message);
    }
  }, []);

  return (
    <div className="flex w-full h-[240px] justify-center items-center pt-8">
      <div className="w-[80%] h-full">
        <ins
          className="adsbygoogle block"
          data-ad-client={`ca-pub-${process.env.NEXT_ADSENSE_KEY}`}
          data-ad-slot={dataAdSlot}
          data-ad-format={dataAdFormat}
          data-full-width-responsive={dataFullWidthResponsive.toString()}
        />
      </div>
    </div>
  );
};

type AdVerticalLandingType = {
  dataAdSlot: string;
};

export const AdVerticalLanding = ({ dataAdSlot }: AdVerticalLandingType) => {
  useEffect(() => {
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch (error: any) {
      console.log(error.message);
    }
  }, []);

  return (
    <div className="flex items-center">
      <ins
        className="adsbygoogle block w-[200px] h-[660px]"
        data-ad-client={`ca-pub-${process.env.NEXT_ADSENSE_KEY}`}
        data-ad-slot={dataAdSlot}
      />
    </div>
  );
};

export const AdVerticalFaq = ({ dataAdSlot, dataAdFormat, dataFullWidthResponsive }: AdSectionType) => {
  useEffect(() => {
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch (error: any) {
      console.log(error.message);
    }
  }, []);

  return (
    <div className="flex w-full h-[800px] justify-center items-center">
      <div className="w-[20%] h-full">
        <ins
          className="adsbygoogle block"
          data-ad-client={`ca-pub-${process.env.NEXT_ADSENSE_KEY}`}
          data-ad-slot={dataAdSlot}
          data-ad-format={dataAdFormat}
          data-full-width-responsive={dataFullWidthResponsive.toString()}
        />
      </div>
    </div>
  );
};
