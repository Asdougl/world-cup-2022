import { useQuery } from '@tanstack/react-query'
import { fetchMatches } from '../services/fifa'
import type { PotentialMatch } from '../types/match'
import {
  MATCHES_QUERY_KEY,
  STAGE_FINAL_ID,
  STAGE_QUARTER_FINAL_ID,
  STAGE_ROUND_OF_16_ID,
  STAGE_SEMI_FINAL_ID,
  STAGE_THIRD_ID,
} from '../util/constants'
import { minutes, seconds } from '../util/time'

export const useAllMatchesQuery = () =>
  useQuery([MATCHES_QUERY_KEY], () => fetchMatches(), {
    staleTime: seconds(30),
    refetchInterval: minutes(1),
  })

export const useRound16MatchesQuery = () =>
  useQuery(
    [MATCHES_QUERY_KEY, STAGE_ROUND_OF_16_ID],
    async () => {
      const matches = await fetchMatches(STAGE_ROUND_OF_16_ID)
      const map: Record<string, PotentialMatch> = {}
      matches.forEach((match) => {
        if (match.MatchNumber) {
          map[match.MatchNumber.toString()] = match
        }
      })
      return map
    },
    {
      staleTime: minutes(10),
    }
  )

export const useQuarterMatchesQuery = () =>
  useQuery(
    [MATCHES_QUERY_KEY, STAGE_QUARTER_FINAL_ID],
    async () => {
      const matches = await fetchMatches(STAGE_QUARTER_FINAL_ID)
      const map: Record<string, PotentialMatch> = {}
      matches.forEach((match) => {
        if (match.MatchNumber) {
          map[match.MatchNumber.toString()] = match
        }
      })
      return map
    },
    {
      staleTime: minutes(10),
    }
  )

export const useSemiMatchesQuery = () =>
  useQuery(
    [MATCHES_QUERY_KEY, STAGE_SEMI_FINAL_ID],
    async () => {
      const matches = await fetchMatches(STAGE_SEMI_FINAL_ID)
      const map: Record<string, PotentialMatch> = {}
      matches.forEach((match) => {
        if (match.MatchNumber) {
          map[match.MatchNumber.toString()] = match
        }
      })
      return map
    },
    {
      staleTime: minutes(10),
    }
  )

export const useThirdMatchesQuery = () =>
  useQuery(
    [MATCHES_QUERY_KEY, STAGE_THIRD_ID],
    async () => {
      const matches = await fetchMatches(STAGE_THIRD_ID)
      const map: Record<string, PotentialMatch> = {}
      matches.forEach((match) => {
        if (match.MatchNumber) {
          map[match.MatchNumber.toString()] = match
        }
      })
      return map
    },
    {
      staleTime: minutes(10),
    }
  )

export const useFinalMatchesQuery = () =>
  useQuery(
    [MATCHES_QUERY_KEY, STAGE_FINAL_ID],
    async () => {
      const matches = await fetchMatches(STAGE_FINAL_ID)
      const map: Record<string, PotentialMatch> = {}
      matches.forEach((match) => {
        if (match.MatchNumber) {
          map[match.MatchNumber.toString()] = match
        }
      })
      return map
    },
    {
      staleTime: minutes(10),
    }
  )
