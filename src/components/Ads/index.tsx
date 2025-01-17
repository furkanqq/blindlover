'use client';

import { useEffect } from 'react';

type AdSectionType = {
  dataAdSlot: string;
  dataAdFormat: string;
  dataFullWidthResponsive: boolean;
};

export const AdSection = ({ dataAdSlot, dataAdFormat, dataFullWidthResponsive }: AdSectionType) => {
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
          data-ad-client="ca-pub-9281616897705500"
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
        data-ad-client="ca-pub-9281616897705500"
        data-ad-slot={dataAdSlot}
      />
    </div>
  );
};
