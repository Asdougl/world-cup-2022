import { z } from 'zod'
import { Localized } from './misc'

export const Stadium = z.object({
  IdStadium: z.string(),
  Name: Localized.array(),
  IdCity: z.string(),
  CityName: Localized.array(),
  IdCountry: z.string(),
})
export type Stadium = z.infer<typeof Stadium>

export const FullMatchCoach = z.object({
  IdCoach: z.string(),
  IdCountry: z.string(),
  PictureUrl: z.string().nullable(),
  Name: Localized.array(),
  Alias: Localized.array(),
  Role: z.number(),
})
export type FullMatchCoach = z.infer<typeof FullMatchCoach>

export const FullMatchTeamPlayer = z.object({
  IdPlayer: z.string(),
  IdTeam: z.string(),
  ShirtNumber: z.number(),
  Status: z.number(),
  SpecialStatus: z.number().nullable(),
  PlayerName: Localized.array(),
  ShortName: Localized.array(),
  Position: z.number(),
  PlayerPicture: z.object({
    Id: z.string(),
    PictureUrl: z.string(),
  }),
  FieldStatus: z.number(),
  LineupX: z.number().nullable(),
  LineupY: z.number().nullable(),
})
export type FullMatchTeamPlayer = z.infer<typeof FullMatchTeamPlayer>

export const FullMatchTeam = z.object({
  IdTeam: z.string(),
  Score: z.number().nullable(),
  PictureUrl: z.string(),
  IdCountry: z.string(),
  Abbreviation: z.string(),
  ShortClubName: z.string(),
  Tactics: z.string().nullable(),
  Coaches: FullMatchCoach.array(),
  Players: FullMatchTeamPlayer.array(),
})
export type FullMatchTeam = z.infer<typeof FullMatchTeam>

export const FullMatch = z.object({
  IdMatch: z.string(),
  IdStage: z.string(),
  IdGroup: z.string().nullable(),
  IdSeason: z.string(),
  IdCompetition: z.string(),
  CompetitionName: Localized.array(),
  SeasonName: Localized.array(),
  Stadium: Stadium,
  ResultType: z.number(),
  MatchDay: z.string(),
  Attendance: z.string().nullable(),
  Date: z.string(),
  LocalDate: z.string(),
  MatchTime: z.string(),
  Winner: z.string().nullable(),
  Period: z.number(),
  HomeTeam: FullMatchTeam,
  AwayTeam: FullMatchTeam,
  BallPossession: z.object({
    OverallHome: z.number(),
    OverallAway: z.number(),
  }),
})
export type FullMatch = z.infer<typeof FullMatch>
