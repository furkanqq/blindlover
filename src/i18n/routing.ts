import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'tr', 'fr', 'es', 'ru', 'pt'],

  // Used when no locale matches
  defaultLocale: 'en',
  pathnames: {
    '/about': {
      en: '/about',
      tr: '/hakkimizda',
      fr: '/a-propos',
      es: '/acerca-de',
      ru: '/о',
      pt: '/sobre',
    },
    '/activate': {
      en: '/activate',
      tr: '/etkinlestir',
      fr: '/activer',
      es: '/activar',
      ru: '/активировать',
      pt: '/ativar',
    },
    '/cookie-policy': {
      en: '/cookie-policy',
      tr: '/cerez-politikasi',
      fr: '/politique-de-cookies',
      es: '/politica-de-cookies',
      ru: '/политика-cookie',
      pt: '/politica-de-cookies',
    },
    '/faq': {
      en: '/faq',
      tr: '/ssk',
      fr: '/faq',
      es: '/faq',
      ru: '/faq',
      pt: '/faq',
    },
    '/login': {
      en: '/login',
      tr: '/giris',
      fr: '/connexion',
      es: '/iniciar-sesion',
      ru: '/вход',
      pt: '/login',
    },
    '/register': {
      en: '/register',
      tr: '/kayit',
      fr: '/sinscrire',
      es: '/registro',
      ru: '/регистрация',
      pt: '/registro',
    },
    '/panel': {
      en: '/panel',
      tr: '/panel',
      fr: '/panneau',
      es: '/panel',
      ru: '/панель',
      pt: '/painel',
    },
    '/panel/question': {
      en: '/panel/question',
      tr: '/panel/soru',
      fr: '/panneau/question',
      es: '/panel/pregunta',
      ru: '/панель/вопрос',
      pt: '/painel/pergunta',
    },
    '/profile': {
      en: '/profile',
      tr: '/profil',
      fr: '/profil',
      es: '/perfil',
      ru: '/профиль',
      pt: '/perfil',
    },
    '/terms-of-use': {
      en: '/terms-of-use',
      tr: '/sozlesme',
      fr: '/conditions',
      es: '/terminos',
      ru: '/условия',
      pt: '/termos',
    },
    '/result': {
      en: '/result',
      tr: '/sonuc',
      fr: '/resultat',
      es: '/resultado',
      ru: '/результат',
      pt: '/resultado',
    },
    '/not-approved': {
      en: '/not-approved',
      tr: '/onaylanmadi',
      fr: '/non-approuve',
      es: '/no-aprobado',
      ru: '/не-утверждено',
      pt: '/nao-aprovado',
    },
    '/verification': {
      en: '/verification',
      tr: '/dogrulama',
      fr: '/verification',
      es: '/verificacion',
      ru: '/проверка',
      pt: '/verificacao',
    },
    '/privacy-policy': {
      en: '/privacy-policy',
      tr: '/gizlilik-politikasi',
      fr: '/politique-de-confidentialite',
      es: '/politica-de-privacidad',
      ru: '/политика-конфиденциальности',
      pt: '/politica-de-privacidade',
    },
  },
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export type Locale = (typeof routing.locales)[number];
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
