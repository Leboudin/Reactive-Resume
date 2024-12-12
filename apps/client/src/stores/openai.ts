import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { DEFAULT_MAX_TOKENS, DEFAULT_MODEL } from '../constants/llm'

type OpenAIStore = {
  // @customize: enable openai by default
  enabled: boolean
  setEnabled: (enabled: boolean) => void
  // @customize end
  baseURL: string | null
  setBaseURL: (baseURL: string | null) => void
  apiKey: string | null
  setApiKey: (apiKey: string | null) => void
  model: string | null
  setModel: (model: string | null) => void
  maxTokens: number | null
  setMaxTokens: (maxTokens: number | null) => void
}

export const useOpenAiStore = create<OpenAIStore>()(
  persist(
    (set) => ({
      // @customize: enable openai by default
      enabled: true,
      setEnabled: (enabled: boolean) => {
        set({ enabled })
      },
      // @customize end
      baseURL: null,
      setBaseURL: (baseURL: string | null) => {
        set({ baseURL })
      },
      apiKey: null,
      setApiKey: (apiKey: string | null) => {
        set({ apiKey })
      },
      model: DEFAULT_MODEL,
      setModel: (model: string | null) => {
        set({ model })
      },
      maxTokens: DEFAULT_MAX_TOKENS,
      setMaxTokens: (maxTokens: number | null) => {
        set({ maxTokens })
      }
    }),
    { name: 'openai' }
  )
)
