import { useQuery } from '@tanstack/react-query'
import {
  fetchGroupStandingsMap,
  fetchStandingsForGroups,
} from '../services/fifa'
import { STANDINGS_QUERY_KEY } from '../util/constants'
import { minutes } from '../util/time'

export const useGroupStandingsQuery = () =>
  useQuery([STANDINGS_QUERY_KEY, 'group'], fetchStandingsForGroups, {
    staleTime: minutes(10),
  })

export const useGroupStandingsMapQuery = () =>
  useQuery([STANDINGS_QUERY_KEY, 'groupMap'], fetchGroupStandingsMap, {
    staleTime: minutes(10),
  })
