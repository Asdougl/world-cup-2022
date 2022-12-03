import { Timeline } from '../types/timeline'
import { COMPETITION_ID, SEASON_ID } from '../util/constants'
import { BASE_URL } from './vars'

export const fetchTimeline = async (idStage: string, idMatch: string) => {
  try {
    const response = await fetch(
      `${BASE_URL}/timelines/${COMPETITION_ID}/${SEASON_ID}/${idStage}/${idMatch}`
    )

    return Timeline.parse(await response.json())
  } catch (error) {
    console.warn(error)
    return null
  }
}
