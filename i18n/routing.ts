import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'uk'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
  localeCookie: true
});