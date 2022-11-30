import { z } from 'zod'
import { Localized } from './misc'

export const MatchTeam = z.object({
  IdTeam: z.string(),
  Score: z.number().nullable(),
  PictureUrl: z.string(),
  IdCountry: z.string(),
  Abbreviation: z.string(),
  ShortClubName: z.string(),
})

export const PotentialMatch = z.object({
  IdMatch: z.string(),
  IdStage: z.string(),
  GroupName: Localized.array(),
  StageName: Localized.array(),
  Date: z.string(),
  LocalDate: z.string(),
  Home: MatchTeam.nullable(),
  Away: MatchTeam.nullable(),
  PlaceHolderA: z.string(),
  PlaceHolderB: z.string(),
  MatchTime: z.string().nullable(),
  MatchStatus: z.number(),
  MatchNumber: z.number(),
})
export type PotentialMatch = z.infer<typeof PotentialMatch>

export const Match = z.object({
  IdMatch: z.string(),
  IdStage: z.string(),
  GroupName: Localized.array(),
  StageName: Localized.array(),
  Date: z.string(),
  LocalDate: z.string(),
  Home: MatchTeam,
  Away: MatchTeam,
  PlaceHolderA: z.string(),
  PlaceHolderB: z.string(),
  MatchTime: z.string().nullable(),
  MatchStatus: z.number(),
  MatchNumber: z.number(),
})
export type Match = z.infer<typeof Match>

export const MatchResponse = z.object({
  Results: PotentialMatch.array(),
})
