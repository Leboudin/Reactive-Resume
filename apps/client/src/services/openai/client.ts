import { t } from '@lingui/macro'
import { OpenAI } from 'openai'

import { useOpenAiStore } from '@/client/stores/openai'

// @customize: use openai proxy instead of direct request
//
// export const openai = () => {
//   const { apiKey, baseURL } = useOpenAiStore.getState()
//
//   if (!apiKey) {
//     throw new Error(
//       t`Your OpenAI API Key has not been set yet. Please go to your account settings to enable OpenAI Integration.`
//     )
//   }
//
//   if (baseURL) {
//     return new OpenAI({
//       baseURL,
//       apiKey,
//       dangerouslyAllowBrowser: true
//     })
//   }
//
//   return new OpenAI({
//     apiKey,
//     dangerouslyAllowBrowser: true
//   })
// }

export const openai = () => {
  let host = ''
  let protocol = ''
  if (typeof window !== 'undefined') {
    protocol = window.location.protocol
    host = window.location.host
  }
  return new OpenAI({
    apiKey: '***',
    baseURL: `${protocol}//${host}/api/v1`,
    dangerouslyAllowBrowser: true
  })
}
// @customize end
