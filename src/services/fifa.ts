import type { Group } from '../types/group'
import { Match, MatchResponse } from '../types/match'
import { StandingReply } from '../types/team'
import {
  COMPETITION_ID,
  SEASON_ID,
  STAGE_ID,
  STAGE_ROUND_OF_16_ID,
} from '../util/constants'

const BASE_URL = 'https://api.fifa.com/api/v3'

export const fetchStandings = async (stageId: number) => {
  try {
    const response = await fetch(
      `${BASE_URL}/calendar/${COMPETITION_ID}/${SEASON_ID}/${stageId}/Standing`
    )

    const { Results } = StandingReply.parse(await response.json())

    return Results
  } catch (error) {
    console.error(error)
    return []
  }
}

export const fetchGroupStandingsMap = async () => {
  try {
    const Results = await fetchStandings(STAGE_ID)

    const groupsMap: Record<string, Group> = {}

    Results.forEach((standing) => {
      const key = standing.Group[0].Description

      if (!groupsMap[key]) {
        groupsMap[key] = {
          IdGroup: standing.IdGroup,
          Name: key,
          teams: [standing],
        }
      } else {
        groupsMap[key].teams.push(standing)
      }
    })

    return groupsMap
  } catch (error) {
    console.error(error)
    return {}
  }
}

export const fetchStandingsForGroups = async () => {
  try {
    const Results = await fetchStandings(STAGE_ID)

    const groupsMap: Record<string, Group> = {}

    Results.forEach((standing) => {
      const { IdGroup, Group } = standing

      if (!groupsMap[IdGroup]) {
        groupsMap[IdGroup] = {
          IdGroup,
          Name: Group[0].Description,
          teams: [standing],
        }
      } else {
        groupsMap[IdGroup].teams.push(standing)
      }
    })

    const groups = Object.values(groupsMap)

    return groups
  } catch (error) {
    console.error(error)
    return []
  }
}

export const fetchMatches = async (stageId?: number) => {
  try {
    const queryParams = new URLSearchParams()
    queryParams.append('idSeason', SEASON_ID.toString())
    if (stageId) queryParams.append('idStage', stageId.toString())

    const response = await fetch(
      `${BASE_URL}/calendar/Matches?${queryParams.toString()}`
    )

    const { Results } = MatchResponse.parse(await response.json())

    return Results
  } catch (error) {
    console.error(error)
    return []
  }
}

export const fetchKnownMatches = async (stageId?: number): Promise<Match[]> => {
  try {
    const matches = await fetchMatches(stageId)

    let ongoingMatches: Match[] = []

    for (const match of matches) {
      const matchParse = Match.safeParse(match)
      if (matchParse.success) {
        ongoingMatches = [...ongoingMatches, matchParse.data]
      }
    }

    return ongoingMatches
  } catch (error) {
    console.error(error)
    return []
  }
}

export const fetchOngoingMatches = async (): Promise<Match[]> => {
  try {
    const matches = await fetchMatches()

    let ongoingMatches: Match[] = []

    for (const match of matches) {
      const matchParse = Match.safeParse(match)
      if (matchParse.success && matchParse.data.MatchStatus === 0) {
        ongoingMatches = [...ongoingMatches, matchParse.data]
      }
    }

    return ongoingMatches
  } catch (error) {
    console.error(error)
    return []
  }
}

export const fetchRound16Matches = async () => {
  try {
    return await fetchMatches(STAGE_ROUND_OF_16_ID)
  } catch (error) {
    console.error(error)
    return []
  }
}
