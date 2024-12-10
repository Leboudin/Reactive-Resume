import type { LinguiConfig } from '@lingui/conf'

const config: LinguiConfig = {
  format: 'po',
  sourceLocale: 'en-US',
  fallbackLocales: { default: 'en-US' },
  locales: [
    'af-ZA',
    'am-ET',
    'ar-SA',
    'bg-BG',
    'bn-BD',
    'ca-ES',
    'cs-CZ',
    'da-DK',
    'de-DE',
    'el-GR',
    'en-US',
    'es-ES',
    'fa-IR',
    'fi-FI',
    'fr-FR',
    'he-IL',
    'hi-IN',
    'hu-HU',
    'id-ID',
    'it-IT',
    'ja-JP',
    'km-KH',
    'kn-IN',
    'ko-KR',
    'lt-LT',
    'ml-IN',
    'mr-IN',
    'ne-NP',
    'nl-NL',
    'no-NO',
    'or-IN',
    'pl-PL',
    'pt-BR',
    'pt-PT',
    'ro-RO',
    'ru-RU',
    'sr-SP',
    'sv-SE',
    'ta-IN',
    'te-IN',
    'th-TH',
    'tr-TR',
    'uk-UA',
    'vi-VN',
    'zh-CN',
    'zh-TW'
  ],
  catalogs: [
    {
      include: ['<rootDir>/apps/client/src'],
      path: '<rootDir>/apps/client/src/locales/{locale}/messages'
    }
  ]
}

export default config
