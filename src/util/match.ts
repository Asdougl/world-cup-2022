import type { MatchTeam } from '../types/match'

type OutcomeTeam = Pick<MatchTeam, 'Score' | 'ShortClubName' | 'Abbreviation'>

export const outcome = (
  home: OutcomeTeam,
  away: OutcomeTeam,
  abbreviation?: boolean
) => {
  if (home.Score === null || away.Score === null) {
    return 'Not played'
  }

  if (home.Score > away.Score) {
    return `${abbreviation ? home.Abbreviation : home.ShortClubName} won`
  } else if (home.Score < away.Score) {
    return `${abbreviation ? away.Abbreviation : away.ShortClubName} won`
  } else {
    return 'Draw'
  }
}

// export const matchStats
