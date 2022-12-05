import { z } from 'zod'
import { Localized } from './misc'

export const WatchSource = z.object({
  IdChannel: z.string(),
  Language: z.string(),
  Logo: z.string(),
  Name: z.string(),
  TvChannelUrl: z.string(),
  Url: z.string(),
})
export type WatchSource = z.infer<typeof WatchSource>

export const Watch = z.object({
  CountryName: Localized.array(),
  Date: z.string(),
  IdCompetition: z.string(),
  IdCountry: z.string(),
  IdCountryIso3166Alpha2: z.string(),
  IdMatch: z.string(),
  IdSeason: z.string(),
  Sources: WatchSource.array(),
})
export type Watch = z.infer<typeof Watch>
