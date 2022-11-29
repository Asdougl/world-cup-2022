import { z } from 'zod'

export const Localized = z.object({
  Locale: z.string(),
  Description: z.string(),
})
export type Localized = z.infer<typeof Localized>
