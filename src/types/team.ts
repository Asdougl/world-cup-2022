import { z } from 'zod'

export const Team = z.object({
  IdTeam: z.string(),
  IdConfederation: z.string(),
  IdCountry: z.string(),
  ShortClubName: z.string(),
  Abbreviation: z.string(),
  PictureUrl: z.string(),
})
export type Team = z.infer<typeof Team>

export const Standing = z.object({
  IdTeam: z.string(),
  IdGroup: z.string(),
  Group: z.array(z.object({ Locale: z.string(), Description: z.string() })),
  Won: z.number(),
  Lost: z.number(),
  Drawn: z.number(),
  Played: z.number(),
  Points: z.number(),
  For: z.number(),
  Against: z.number(),
  GoalsDiference: z.number(),
  Team: Team,
})
export type Standing = z.infer<typeof Standing>

export const StandingReply = z.object({
  Results: Standing.array(),
})
