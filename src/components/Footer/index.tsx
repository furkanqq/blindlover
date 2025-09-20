import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

import { FooterConfig } from '@/config/footer';

const Footer = () => {
  const locale = useLocale();
  const t = useTranslations('LandingPage');
  return (
    <div className="relative mt-20 md:mt-32 bg-backgroundColor border-t">
      <div className="px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div className="grid gap-4 row-gap-10 mb-8 lg:grid-cols-6">
          <div className="md:max-w-md lg:col-span-2">
            <Link href={`/${locale}`} aria-label="Go home" title="Company" className="inline-flex items-center">
              <Image src={'/blindlover.png'} alt="logo" width={200} height={40} />
            </Link>
            <div className="mt-4 lg:max-w-sm">
              <p className="text-sm text-deep-purple-50">{t('footer.desc')}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6 row-gap-8 lg:col-span-4 md:grid-cols-3">
            {FooterConfig.map((footerItem, index) => (
              <div key={index}>
                <ul className="mt-2 space-y-2">
                  {footerItem.section.map((item, index) => (
                    <li key={index}>
                      {item.link.startsWith('mailto') ? (
                        <Link
                          href={`${item.link}`}
                          className="transition-colors duration-300 text-deep-purple-50 hover:text-teal-accent-400"
                        >
                          {t(`footer.${item.title}`)}
                        </Link>
                      ) : (
                        <Link
                          href={`/${locale}${item.link}`}
                          className="transition-colors duration-300 text-deep-purple-50 hover:text-teal-accent-400"
                        >
                          {t(`footer.${item.title}`)}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            {/* <div className="col-span-2 flex flex-col gap-4">
              <div>
                <h3 className="font-semibold">Balance Yazılım ve Teknoloji Anonim Şirketi</h3>
                <div>Halaskargazi Cd. Lotus Nişantaşı No: 38-66E / 215,,</div>
                <div>34371 Şişli – İstanbul</div>
              </div>
              <div>
                <div>İletişim</div>
                <div>0212 806 48 13</div>
                <div>
                  <Link href={'mailto:info@balance.software'}>info@balance.software</Link>
                </div>
              </div>
            </div> */}
          </div>
        </div>
        <div className="flex flex-col justify-between pt-5 pb-10 border-t border-deep-purple-accent-200 sm:flex-row">
          <p className="text-sm text-foreground">2025 © https://blindlover.com {t('footer.rights')}</p>
          <div className="flex items-center mt-4 space-x-4 sm:mt-0">
            <Link
              href="https://www.instagram.com/blind.lover_1/"
              target="_blank"
              className="transition-colors duration-300 text-deep-purple-100 hover:text-teal-accent-400"
            >
              <Image src={'/instagram.png'} alt="Facebook" width={24} height={24} />
            </Link>
            <Link
              href="https://www.tiktok.com/@blind.lover_1"
              target="_blank"
              className="transition-colors duration-300 text-deep-purple-100 hover:text-teal-accent-400"
            >
              <Image src={'/tiktok.png'} alt="Facebook" width={24} height={24} />
            </Link>
            <Link
              href="https://x.com/Blindlover_1"
              target="_blank"
              className="transition-colors duration-300 text-deep-purple-100 hover:text-teal-accent-400"
            >
              <Image src={'/twitter.png'} alt="Facebook" width={24} height={24} />
            </Link>
            <Link
              href="https://snapchat.com/t/lze8oTGo"
              target="_blank"
              className="transition-colors duration-300 text-deep-purple-100 hover:text-teal-accent-400"
            >
              <Image src={'/snapchat.png'} alt="Facebook" width={24} height={24} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Footer };
