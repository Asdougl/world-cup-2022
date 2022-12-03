import { FullMatch } from '../types/fullMatch'
import { COMPETITION_ID, SEASON_ID } from '../util/constants'
import { BASE_URL } from './vars'

export const fetchMatchByStageMatch = async (
  stageId: string,
  matchId: string
) => {
  try {
    const data = await fetch(
      `${BASE_URL}/live/football/${COMPETITION_ID}/${SEASON_ID}/${stageId}/${matchId}`
    )

    const match = FullMatch.nullable().parse(await data.json())

    return match
  } catch (error) {
    console.warn(error)
    return null
  }
}
