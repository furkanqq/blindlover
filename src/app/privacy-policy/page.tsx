'use client';

import Link from 'next/link';

import AppLayout from '@/components/AppLayout';
import { Container } from '@/components/Container';

export default function PrivacyPage() {
  return (
    <AppLayout type="detail" className=" bg-[url(/heartPattern1.png)]">
      <Container className="min-h-[50vh] pt-24 sm:pt-32">
        <div className="privacy-policy max-w-5xl mx-auto p-12 bg-white rounded-lg shadow-xl border border-solid">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Gizlilik Politikası</h1>
          <p className="text-gray-700 mb-4">
            BlindLover olarak gizliliğinize büyük önem veriyoruz. Bu Gizlilik Politikası,{' '}
            <Link
              href="https://blindlover.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              https://blindlover.com
            </Link>{' '}
            web sitesi ve mobil uygulaması aracılığıyla topladığımız bilgileri nasıl işlediğimizi ve koruduğumuzu
            açıklar. BlindLover’ı kullanarak bu politikayı kabul etmiş sayılırsınız.
          </p>

          <h2 className="text-xl font-semibold text-gray-800 mb-2">1. Hangi Bilgileri Topluyoruz?</h2>
          <p className="text-gray-700 mb-2">BlindLover’ı kullandığınızda aşağıdaki bilgileri toplayabiliriz:</p>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li>Kişisel Bilgiler: Ad, e-posta adresi (kayıt sırasında verilmişse).</li>
            <li>Kullanıcı Yanıtları: Test sırasında verdiğiniz cevaplar.</li>
            <li>Cihaz Bilgileri: IP adresi, cihaz türü, işletim sistemi ve tarayıcı bilgileri.</li>
            <li>
              Kullanım Verileri: Web sitemiz veya uygulamamızda hangi özellikleri kullandığınız ve nasıl etkileşimde
              bulunduğunuz.
            </li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-800 mb-2">2. Bilgileri Nasıl Kullanıyoruz?</h2>
          <p className="text-gray-700 mb-2">Topladığımız bilgileri şu amaçlarla kullanıyoruz:</p>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li>Test sonuçlarınızı analiz etmek ve size özel geri bildirimler sağlamak.</li>
            <li>Hizmetlerimizi geliştirmek ve kullanıcı deneyimini iyileştirmek.</li>
            <li>Web sitemizi ve uygulamamızı daha verimli hale getirmek.</li>
            <li>Geri bildirimlerinize göre yeni özellikler sunmak.</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-800 mb-2">3. Çerezler ve İzleme Teknolojileri</h2>
          <p className="text-gray-700 mb-2">
            BlindLover, kullanıcı deneyiminizi geliştirmek için çerezler ve benzeri teknolojiler kullanır. Çerezler,
            cihazınızda depolanan küçük veri dosyalarıdır.
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li>Zorunlu Çerezler: Web sitesinin temel işlevlerini sağlamak için kullanılır.</li>
            <li>Performans Çerezleri: Kullanım verilerini analiz etmek için kullanılır.</li>
            <li>Reklam Çerezleri: İlgi alanlarınıza uygun reklamlar sunar.</li>
          </ul>
          <p className="text-gray-700 mb-4">
            Çerezleri tarayıcı ayarlarınızdan yönetebilir veya devre dışı bırakabilirsiniz.
          </p>

          <h2 className="text-xl font-semibold text-gray-800 mb-2">4. Bilgilerinizi Kimlerle Paylaşıyoruz?</h2>
          <p className="text-gray-700 mb-2">Bilgilerinizi şu durumlarda üçüncü taraflarla paylaşabiliriz:</p>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li>
              Hizmet Sağlayıcılar: Verilerinizi analiz etmek, barındırmak ve teknik destek sağlamak için üçüncü
              taraflarla çalışabiliriz.
            </li>
            <li>Yasal Yükümlülükler: Yasal olarak gerektiğinde bilgilerinizi ilgili otoritelerle paylaşabiliriz.</li>
            <li>Reklam Ortakları: İlgi alanlarınıza uygun reklamlar sunmak için anonim verileri paylaşabiliriz.</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-800 mb-2">5. Bilgilerinizi Nasıl Koruyoruz?</h2>
          <p className="text-gray-700 mb-4">
            Kişisel bilgilerinizin güvenliğini sağlamak için endüstri standartlarında teknik ve organizasyonel önlemler
            alıyoruz. Ancak, internet üzerinden yapılan veri iletimlerinin tamamen güvenli olduğunu garanti edemeyiz.
          </p>

          <h2 className="text-xl font-semibold text-gray-800 mb-2">6. Bilgilerin Saklanma Süresi</h2>
          <p className="text-gray-700 mb-4">
            Kişisel bilgileriniz yalnızca belirtilen amaçlar için gerekli olduğu süre boyunca saklanır. Kullanıcı
            hesapları veya verileri talep üzerine silinebilir.
          </p>

          <h2 className="text-xl font-semibold text-gray-800 mb-2">7. Haklarınız</h2>
          <p className="text-gray-700 mb-2">BlindLover kullanıcıları olarak aşağıdaki haklara sahipsiniz:</p>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li>Erişim Hakkı: Hangi bilgilerinizi sakladığımızı öğrenebilirsiniz.</li>
            <li>Düzeltme Hakkı: Yanlış veya eksik bilgilerinizi düzeltebilirsiniz.</li>
            <li>Silme Hakkı: Talep üzerine kişisel bilgilerinizi silebiliriz.</li>
            <li>İtiraz Hakkı: Verilerinizin işlenmesine itiraz edebilirsiniz.</li>
          </ul>
          <p className="text-gray-700 mb-4">
            Haklarınızı kullanmak için bizimle iletişime geçebilirsiniz:{' '}
            <Link href="mailto:hello@blindlover.com" className="text-blue-600 hover:underline">
              hello@blindlover.com
            </Link>
          </p>

          <h2 className="text-xl font-semibold text-gray-800 mb-2">8. Değişiklikler</h2>
          <p className="text-gray-700 mb-4">
            BlindLover, bu Gizlilik Politikası’nı zaman zaman güncelleyebilir. Değişiklikler yapıldığında, yeni politika
            web sitemizde yayınlanacaktır.
          </p>

          <h2 className="text-xl font-semibold text-gray-800 mb-2">9. İletişim</h2>
          <p className="text-gray-700 mb-4">
            Gizlilik politikamız hakkında sorularınız için bize ulaşabilirsiniz:{' '}
            <Link href="mailto:hello@blindlover.com" className="text-blue-600 hover:underline">
              hello@blindlover.com
            </Link>
          </p>

          <p className="text-gray-700 mt-6">
            BlindLover’ı kullandığınız için teşekkür ederiz. Verilerinizin güvenliğini sağlamak ve gizliliğinize saygı
            duymak önceliğimizdir.
          </p>
        </div>
      </Container>
    </AppLayout>
  );
}
