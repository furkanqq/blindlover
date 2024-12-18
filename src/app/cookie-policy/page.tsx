'use client';

import Link from 'next/link';

import AppLayout from '@/components/AppLayout';
import { Container } from '@/components/Container';

export default function CookiePolicyPage() {
  return (
    <AppLayout type="detail" className="bg-[url(/heartPattern1.png)]">
      <Container className="min-h-[50vh] pt-24 sm:pt-32">
        <div className="cookie-policy max-w-5xl mx-auto p-12 bg-white rounded-lg shadow-xl border border-solid">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Çerez Politikası</h1>
          <p className="text-gray-700 mb-4">
            Bu Çerez Politikası, BlindLover web sitesini{' '}
            <Link
              href="https://blindlover.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              (https://blindlover.com)
            </Link>{' '}
            ziyaret ettiğinizde cihazınıza yerleştirilen çerezlerin nasıl kullanıldığını açıklar. Çerezleri kullanım
            amacımız, size en iyi kullanıcı deneyimini sunmak ve hizmetlerimizi sürekli olarak geliştirmektir.
          </p>

          <h2 className="text-xl font-semibold text-gray-800 mb-2">1. Çerez Nedir?</h2>
          <p className="text-gray-700 mb-4">
            Çerezler, bir web sitesi ziyaret edildiğinde cihazınıza yerleştirilen küçük veri dosyalarıdır. Bu dosyalar,
            tarayıcınız tarafından saklanır ve web sitesinin sizi tanımasını, tercihlerinizi hatırlamasını ve kullanıcı
            deneyiminizi iyileştirmesini sağlar.
          </p>

          <h2 className="text-xl font-semibold text-gray-800 mb-2">2. Hangi Çerezleri Kullanıyoruz?</h2>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li>
              <strong>Zorunlu Çerezler:</strong> Web sitemizin temel işlevlerini gerçekleştirmesi için gerekli olan
              çerezlerdir. Örneğin, giriş yapmanızın sağlanması veya dil tercihlerinizi hatırlaması gibi.
            </li>
            <li>
              <strong>Performans Çerezleri:</strong> Web sitemizin nasıl kullanıldığını anlamamıza yardımcı olan
              çerezlerdir. Bu bilgiler, sitemizi daha iyi hale getirmek için kullanılır.
            </li>
            <li>
              <strong>İşlevsel Çerezler:</strong> Kullanıcı tercihlerinizi (örneğin dil veya bölge ayarları)
              hatırlayarak, size daha kişiselleştirilmiş bir deneyim sunar.
            </li>
            <li>
              <strong>Reklam ve Hedefleme Çerezleri:</strong> İlgi alanlarınıza uygun reklamlar göstermek ve reklam
              kampanyalarımızın etkinliğini ölçmek için kullanılır.
            </li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-800 mb-2">3. Çerezleri Nasıl Yönetebilirsiniz?</h2>
          <p className="text-gray-700 mb-4">
            Tarayıcı ayarlarınızı değiştirerek çerezlerin kullanımını yönetebilir veya devre dışı bırakabilirsiniz.
            Ancak, çerezleri devre dışı bırakmanız, web sitemizin bazı bölümlerinin düzgün çalışmamasına neden olabilir.
          </p>

          <h2 className="text-xl font-semibold text-gray-800 mb-2">4. Üçüncü Taraf Çerezleri</h2>
          <p className="text-gray-700 mb-4">
            BlindLover, bazı hizmetler için üçüncü taraf çerezleri kullanabilir. Bu çerezler, analiz ve reklam
            hizmetleri için kullanılabilir. Üçüncü taraf çerezlerinin yönetimi, ilgili sağlayıcının politikalarına
            tabidir.
          </p>

          <h2 className="text-xl font-semibold text-gray-800 mb-2">5. Çerezlerin Saklanma Süresi</h2>
          <p className="text-gray-700 mb-4">
            Kullandığımız çerezlerin saklanma süreleri değişkenlik gösterebilir. Geçici çerezler, tarayıcı
            kapatıldığında silinirken, kalıcı çerezler cihazınızda belirtilen süre boyunca saklanır.
          </p>

          <h2 className="text-xl font-semibold text-gray-800 mb-2">6. Değişiklikler</h2>
          <p className="text-gray-700 mb-4">
            Bu politika, zaman zaman güncellenebilir. Güncellemeler yapıldığında, yeni politika web sitemizde
            yayınlanacaktır.
          </p>

          <h2 className="text-xl font-semibold text-gray-800 mb-2">7. Daha Fazla Bilgi</h2>
          <p className="text-gray-700 mb-4">
            Çerez politikamız hakkında daha fazla bilgi almak için bize ulaşabilirsiniz:
            <br />
            E-posta:{' '}
            <Link href="mailto:hello@blindlover.com" className="text-blue-600 hover:underline">
              hello@blindlover.com
            </Link>
          </p>
        </div>
      </Container>
    </AppLayout>
  );
}
