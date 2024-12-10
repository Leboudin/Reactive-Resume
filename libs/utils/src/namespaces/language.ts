// Languages
export type Language = {
  id: string
  name: string
  locale: string
  editorCode: string
  progress?: number
}

export const languages: Language[] = [
  {
    id: 'af',
    name: 'Afrikaans',
    editorCode: 'af',
    locale: 'af-ZA'
  },
  {
    id: 'sq',
    name: 'Albanian',
    editorCode: 'sq',
    locale: 'sq-AL'
  },
  {
    id: 'am',
    name: 'Amharic',
    editorCode: 'am',
    locale: 'am-ET'
  },
  {
    id: 'ar',
    name: 'Arabic',
    editorCode: 'ar',
    locale: 'ar-SA'
  },
  {
    id: 'bn',
    name: 'Bengali',
    editorCode: 'bn',
    locale: 'bn-BD'
  },
  {
    id: 'bg',
    name: 'Bulgarian',
    editorCode: 'bg',
    locale: 'bg-BG'
  },
  {
    id: 'ca',
    name: 'Catalan',
    editorCode: 'ca',
    locale: 'ca-ES'
  },
  {
    id: 'zh-CN',
    name: 'Chinese Simplified',
    editorCode: 'zhcn',
    locale: 'zh-CN'
  },
  {
    id: 'zh-TW',
    name: 'Chinese Traditional',
    editorCode: 'zhtw',
    locale: 'zh-TW'
  },
  {
    id: 'cs',
    name: 'Czech',
    editorCode: 'cs',
    locale: 'cs-CZ'
  },
  {
    id: 'da',
    name: 'Danish',
    editorCode: 'da',
    locale: 'da-DK'
  },
  {
    id: 'nl',
    name: 'Dutch',
    editorCode: 'nl',
    locale: 'nl-NL'
  },
  {
    id: 'en-US',
    name: 'English',
    editorCode: 'en',
    locale: 'en-US'
  },
  {
    id: 'fi',
    name: 'Finnish',
    editorCode: 'fi',
    locale: 'fi-FI'
  },
  {
    id: 'fr',
    name: 'French',
    editorCode: 'fr',
    locale: 'fr-FR'
  },
  {
    id: 'de',
    name: 'German',
    editorCode: 'de',
    locale: 'de-DE'
  },
  {
    id: 'el',
    name: 'Greek',
    editorCode: 'el',
    locale: 'el-GR'
  },
  {
    id: 'he',
    name: 'Hebrew',
    editorCode: 'he',
    locale: 'he-IL'
  },
  {
    id: 'hi',
    name: 'Hindi',
    editorCode: 'hi',
    locale: 'hi-IN'
  },
  {
    id: 'hu',
    name: 'Hungarian',
    editorCode: 'hu',
    locale: 'hu-HU'
  },
  {
    id: 'id',
    name: 'Indonesian',
    editorCode: 'id',
    locale: 'id-ID'
  },
  {
    id: 'it',
    name: 'Italian',
    editorCode: 'it',
    locale: 'it-IT'
  },
  {
    id: 'ja',
    name: 'Japanese',
    editorCode: 'ja',
    locale: 'ja-JP'
  },
  {
    id: 'kn',
    name: 'Kannada',
    editorCode: 'kn',
    locale: 'kn-IN'
  },
  {
    id: 'km',
    name: 'Khmer',
    editorCode: 'km',
    locale: 'km-KH'
  },
  {
    id: 'ko',
    name: 'Korean',
    editorCode: 'ko',
    locale: 'ko-KR'
  },
  {
    id: 'lv',
    name: 'Latvian',
    editorCode: 'lv',
    locale: 'lv-LV'
  },
  {
    id: 'lt',
    name: 'Lithuanian',
    editorCode: 'lt',
    locale: 'lt-LT'
  },
  {
    id: 'ms',
    name: 'Malay',
    editorCode: 'ms',
    locale: 'ms-MY'
  },
  {
    id: 'ml-IN',
    name: 'Malayalam',
    editorCode: 'mlin',
    locale: 'ml-IN'
  },
  {
    id: 'mr',
    name: 'Marathi',
    editorCode: 'mr',
    locale: 'mr-IN'
  },
  {
    id: 'ne-NP',
    name: 'Nepali',
    editorCode: 'nenp',
    locale: 'ne-NP'
  },
  {
    id: 'no',
    name: 'Norwegian',
    editorCode: 'no',
    locale: 'no-NO'
  },
  {
    id: 'or',
    name: 'Odia',
    editorCode: 'or',
    locale: 'or-IN'
  },
  {
    id: 'fa',
    name: 'Persian',
    editorCode: 'fa',
    locale: 'fa-IR'
  },
  {
    id: 'pl',
    name: 'Polish',
    editorCode: 'pl',
    locale: 'pl-PL'
  },
  {
    id: 'pt-PT',
    name: 'Portuguese',
    editorCode: 'pt',
    locale: 'pt-PT'
  },
  {
    id: 'pt-BR',
    name: 'Portuguese, Brazilian',
    editorCode: 'ptbr',
    locale: 'pt-BR'
  },
  {
    id: 'ro',
    name: 'Romanian',
    editorCode: 'ro',
    locale: 'ro-RO'
  },
  {
    id: 'ru',
    name: 'Russian',
    editorCode: 'ru',
    locale: 'ru-RU'
  },
  {
    id: 'sr',
    name: 'Serbian (Cyrillic)',
    editorCode: 'sr',
    locale: 'sr-SP'
  },
  {
    id: 'es-ES',
    name: 'Spanish',
    editorCode: 'es',
    locale: 'es-ES'
  },
  {
    id: 'sv-SE',
    name: 'Swedish',
    editorCode: 'sv',
    locale: 'sv-SE'
  },
  {
    id: 'ta',
    name: 'Tamil',
    editorCode: 'ta',
    locale: 'ta-IN'
  },
  {
    id: 'te',
    name: 'Telugu',
    editorCode: 'te',
    locale: 'te-IN'
  },
  {
    id: 'th',
    name: 'Thai',
    editorCode: 'th',
    locale: 'th-TH'
  },
  {
    id: 'tr',
    name: 'Turkish',
    editorCode: 'tr',
    locale: 'tr-TR'
  },
  {
    id: 'uk',
    name: 'Ukrainian',
    editorCode: 'uk',
    locale: 'uk-UA'
  },
  {
    id: 'uz',
    name: 'Uzbek',
    editorCode: 'uz',
    locale: 'uz-UZ'
  },
  {
    id: 'vi',
    name: 'Vietnamese',
    editorCode: 'vi',
    locale: 'vi-VN'
  }
]
