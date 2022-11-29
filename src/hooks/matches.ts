import { useQuery } from '@tanstack/react-query'
import { fetchMatches } from '../services/fifa'
import {
  MATCHES_QUERY_KEY,
  STAGE_FINAL_ID,
  STAGE_QUARTER_FINAL_ID,
  STAGE_ROUND_OF_16_ID,
  STAGE_SEMI_FINAL_ID,
  STAGE_THIRD_ID,
} from '../util/constants'
import { minutes } from '../util/time'

export const useRound16MatchesQuery = () =>
  useQuery(
    [MATCHES_QUERY_KEY, STAGE_ROUND_OF_16_ID],
    () => fetchMatches(STAGE_ROUND_OF_16_ID),
    {
      staleTime: minutes(10),
    }
  )

export const useQuarterMatchesQuery = () =>
  useQuery(
    [MATCHES_QUERY_KEY, STAGE_QUARTER_FINAL_ID],
    () => fetchMatches(STAGE_QUARTER_FINAL_ID),
    {
      staleTime: minutes(10),
    }
  )

export const useSemiMatchesQuery = () =>
  useQuery(
    [MATCHES_QUERY_KEY, STAGE_SEMI_FINAL_ID],
    () => fetchMatches(STAGE_SEMI_FINAL_ID),
    {
      staleTime: minutes(10),
    }
  )

export const useThirdMatchesQuery = () =>
  useQuery(
    [MATCHES_QUERY_KEY, STAGE_THIRD_ID],
    () => fetchMatches(STAGE_THIRD_ID),
    {
      staleTime: minutes(10),
    }
  )

export const useFinalMatchesQuery = () =>
  useQuery(
    [MATCHES_QUERY_KEY, STAGE_FINAL_ID],
    () => fetchMatches(STAGE_FINAL_ID),
    {
      staleTime: minutes(10),
    }
  )
