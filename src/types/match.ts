import { z } from 'zod'
import { Localized } from './misc'

export enum MatchStatus {
  FINISHED = 0,
  UPCOMING = 1,
  LIVE = 2,
  POSTPONED = 3,
  CANCELED = 4,
  SUSPENDED = 5,
  INTERRUPTED = 6,
  ABANDONED = 7,
  AWARDED = 8,
  UNKNOWN = 9,
}

export const MatchTeam = z.object({
  IdTeam: z.string(),
  Score: z.number().nullable(),
  PictureUrl: z.string(),
  IdCountry: z.string(),
  Abbreviation: z.string(),
  ShortClubName: z.string(),
})
export type MatchTeam = z.infer<typeof MatchTeam>

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
  Winner: z.string().nullable(),
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
  Winner: z.string(),
})
export type Match = z.infer<typeof Match>

export const MatchResponse = z.object({
  Results: PotentialMatch.array(),
})
