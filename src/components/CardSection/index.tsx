import Image from 'next/image';

import { Container } from '../Container';

const CardSection = () => {
  return (
    <Container>
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-center text-base/7 font-semibold text-primaryColor">Blind Lover</h2>
          <p className="mx-auto mt-2 max-w-lg text-balance text-center text-4xl font-semibold tracking-tight sm:text-5xl">
            Neden Bizi Tercih Etmelisin?
          </p>
          <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
            <div className="relative lg:row-span-2">
              <div className="absolute inset-px rounded-lg bg-backgroundColor lg:rounded-l-[2rem]"></div>
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
                <div className="px-8 pb-3 pt-8 sm:px-10 sm:pb-0 sm:pt-10">
                  <p className="mt-2 text-lg font-medium tracking-tight max-lg:text-center">Eğlenceli ve Kolay</p>
                  <p className="mt-2 max-w-lg text-sm/6 max-lg:text-center">
                    Karmaşık analizlere gerek yok. Sadece sorulara cevap ver ve sonucu öğren.
                  </p>
                </div>
                <div className="relative min-h-[30rem] w-full grow [container-type:inline-size] max-lg:mx-auto max-lg:max-w-sm">
                  <div className="absolute inset-x-10 bottom-0 top-10 overflow-hidden rounded-t-[12cqw] border-x-[3cqw] border-t-[3cqw] border-gray-700 bg-gray-900 shadow-2xl">
                    <Image className="size-full object-cover object-top" src="/ss.webp" alt="" fill />
                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 lg:rounded-l-[2rem]"></div>
            </div>
            <div className="relative max-lg:row-start-1">
              <div className="absolute inset-px rounded-lg bg-primaryColor max-lg:rounded-t-[2rem]"></div>
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
                <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                  <p className="mt-2 text-lg font-medium tracking-tight text-white max-lg:text-center">
                    Aşkın Yüzde Kaç?
                  </p>
                  <p className="mt-2 max-w-lg text-sm/6 text-white max-lg:text-center">
                    Yapay zeka destekli analizlerle, partnerinin ya da hoşlandığın kişinin sana olan ilgisini yüzde
                    olarak öğren.
                  </p>
                </div>
                <div className="relative flex items-center justify-center px-8 max-lg:pb-12 max-lg:pt-10 sm:px-10 lg:pb-2 h-full">
                  <Image className="object-contain" src="/performance.png" alt="" height={10} width={300} />
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-t-[2rem]"></div>
            </div>
            <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
              <div className="absolute inset-px rounded-lg bg-backgroundColor"></div>
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)]">
                <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                  <p className="mt-2 text-lg font-medium tracking-tight max-lg:text-center">Her Yaşa Uygun Testler</p>
                  <p className="mt-2 max-w-lg text-sm/6 max-lg:text-center">
                    İster 19 yaşında ister 30 ya da 64 yaşında ol. Tüm yaş gruplarına ve ilişki durumlarına göre
                    özelleştirilmiş sorular.
                  </p>
                </div>
                <div className="flex flex-1 items-center [container-type:inline-size] max-lg:py-12 lg:pb-2">
                  <Image
                    className="h-[min(100px,40cqw)] object-contain"
                    src="/secur.png"
                    alt=""
                    height={140}
                    width={400}
                  />
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5"></div>
            </div>
            <div className="relative lg:row-span-2">
              <div className="absolute inset-px rounded-lg bg-backgroundColor max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div>
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
                <div className="px-8 pb-3 pt-8 sm:px-10 sm:pb-0 sm:pt-10">
                  <p className="mt-2 text-lg font-medium tracking-tight max-lg:text-center">Hem Mobil Hem Web</p>
                  <p className="mt-2 max-w-lg text-sm/6 max-lg:text-center">
                    İstediğin cihazda hemen testini yap. Çıkan sonucu arkadaşlarınla paylaş!
                  </p>
                </div>
                <div className="relative h-full flex justify-center items-center w-full grow">
                  <Image className="object-contain" src="/devices.png" alt="" height={140} width={320} />
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export { CardSection };
