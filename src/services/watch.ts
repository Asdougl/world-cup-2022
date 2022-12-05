import { Watch } from '../types/watch'
import { SEASON_ID } from '../util/constants'
import { BASE_URL } from './vars'

export const fetchWatch = async (matchId: string) => {
  try {
    const data = await fetch(
      `${BASE_URL}/watch/match/${SEASON_ID}/${matchId}/AU`
    )

    const watch = Watch.parse(await data.json())

    return watch
  } catch (error) {
    console.warn(error)
    return null
  }
}
