'use client';

import Link from 'next/link';

import AppLayout from '@/components/AppLayout';
import { Container } from '@/components/Container';

export default function TermsOfUsePage() {
  return (
    <AppLayout type="detail" className="bg-[url(/heartPattern1.png)]">
      <Container className="min-h-[50vh] pt-24 sm:pt-32">
        <div className="terms-of-use max-w-5xl mx-auto p-12 bg-white rounded-lg shadow-xl border border-solid">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Kullanım Şartları</h1>
          <p className="text-gray-700 mb-4">
            Bu kullanım şartları,{' '}
            <Link
              href="https://blindlover.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              https://blindlover.com
            </Link>{' '}
            web sitesinin ve BlindLover hizmetlerinin kullanımını düzenler. Lütfen web sitemizi ve uygulamamızı
            kullanmadan önce bu şartları dikkatlice okuyun. BlindLover’ı kullanarak bu şartları kabul ettiğinizi beyan
            etmiş olursunuz.
          </p>

          <h2 className="text-xl font-semibold text-gray-800 mb-2">1. Hizmetlerimizin Kapsamı</h2>
          <p className="text-gray-700 mb-4">
            BlindLover, ilişkilerle ilgili eğlenceli testler ve analizler sunan bir platformdur. Hizmetlerimiz,
            kullanıcıların verdiği yanıtlara dayalı sonuçlar sağlar ve eğlence amaçlıdır. Sunulan içerikler kesin
            bilgiler sunmaz, karar verme süreçlerinizde yalnızca rehberlik amaçlıdır.
          </p>

          <h2 className="text-xl font-semibold text-gray-800 mb-2">2. Uygulamanın Kullanımı</h2>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li>
              14 yaşından büyük olduğunuzu veya 14 yaşından küçük ancak ebeveyn iznine sahip olduğunuzu onaylamış
              olursunuz.
            </li>
            <li>Hizmetlerimizi yasalara uygun bir şekilde kullanacağınızı kabul edersiniz.</li>
            <li>
              Diğer kullanıcıların deneyimlerini olumsuz yönde etkileyecek kötüye kullanımlardan kaçınmayı taahhüt
              edersiniz.
            </li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-800 mb-2">3. Kullanıcı Verileri</h2>
          <p className="text-gray-700 mb-4">
            BlindLover, kullanıcıların gizliliğine önem verir. Kullanıcı verileriniz, Gizlilik Politikamız doğrultusunda
            işlenir. Verilerinizin nasıl kullanıldığı hakkında daha fazla bilgi için{' '}
            <Link href="/privacy-policy" className="text-blue-600 hover:underline">
              Gizlilik Politikamıza
            </Link>{' '}
            göz atabilirsiniz.
          </p>

          <h2 className="text-xl font-semibold text-gray-800 mb-2">4. Fikri Mülkiyet Hakları</h2>
          <p className="text-gray-700 mb-4">
            Web sitemizdeki ve uygulamamızdaki tüm içerikler, tasarımlar, logo ve materyaller BlindLover’a aittir. Bu
            içerikler izinsiz kopyalanamaz, çoğaltılamaz veya başka bir şekilde kullanılamaz.
          </p>

          <h2 className="text-xl font-semibold text-gray-800 mb-2">5. Sorumluluk Reddi</h2>
          <p className="text-gray-700 mb-4">
            BlindLover, verilen test sonuçlarının doğruluğu veya uygunluğu hakkında herhangi bir garanti vermez. Bu
            sonuçlar tamamen eğlence amaçlıdır ve karar verme süreçlerinizde tek başına kullanılmamalıdır. BlindLover,
            sonuçların kullanımından kaynaklanan herhangi bir doğrudan veya dolaylı zarardan sorumlu tutulamaz.
          </p>

          <h2 className="text-xl font-semibold text-gray-800 mb-2">6. Üçüncü Taraf Bağlantıları</h2>
          <p className="text-gray-700 mb-4">
            BlindLover, kullanıcı deneyimini geliştirmek için üçüncü taraf bağlantılar içerebilir. Ancak, bu
            bağlantıların içeriğinden ve gizlilik uygulamalarından sorumlu değiliz. Lütfen bu bağlantıları kullanmadan
            önce ilgili politikaları okuyun.
          </p>

          <h2 className="text-xl font-semibold text-gray-800 mb-2">7. Değişiklik Hakkı</h2>
          <p className="text-gray-700 mb-4">
            BlindLover, bu kullanım şartlarını istediği zaman güncelleme hakkını saklı tutar. Güncellemeler
            yapıldığında, yeni şartlar web sitemizde yayınlanacaktır. Hizmetlerimizi kullanmaya devam ederek güncellenen
            şartları kabul etmiş sayılırsınız.
          </p>

          <h2 className="text-xl font-semibold text-gray-800 mb-2">8. İletişim</h2>
          <p className="text-gray-700 mb-4">Kullanım şartları hakkında sorularınız için bize ulaşabilirsiniz:</p>
          <p className="text-gray-700">
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
