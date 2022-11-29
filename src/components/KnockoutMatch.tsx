import dayjs from 'dayjs'
import type { Group } from '../types/group'
import type { PotentialMatch } from '../types/match'
import { parsePlaceholder } from '../util/knockout'
import { pictureUrl } from '../util/picture'

interface KnockoutMatchProps {
  match: PotentialMatch
  index: number
  groups: Record<string, Group> | undefined
}

export const KnockoutMatch = ({ match, index, groups }: KnockoutMatchProps) => {
  return (
    <div key={match.IdMatch} className="flex flex-col gap-2">
      <div className="flex items-center gap-3 px-2">
        <span>Game {index + 1}</span>
        <span className="text-sm opacity-70">
          {dayjs(match.Date).format('dddd, MMM D [at] HH:mm')}
        </span>
      </div>
      <div className="flex flex-col gap-4 rounded-lg border border-slate-600 px-4 py-2">
        <div className="flex items-center">
          {match.Home ? (
            <>
              <img
                src={pictureUrl(match.Home.PictureUrl, 1)}
                alt={match.Home.Abbreviation}
                className="h-4 rounded-sm"
              />
              <div className="ml-2 flex-1">{match.Home.ShortClubName}</div>
            </>
          ) : (
            <>
              <div className="h-4 w-6 rounded-sm bg-slate-600" />
              <div className="ml-2 flex-1">
                {parsePlaceholder(match.PlaceHolderA, groups)}
              </div>
            </>
          )}
          <div className="flex-1 text-right">
            {match.Away ? match.Away.Score : '-'}
          </div>
        </div>
        <div className="flex items-center">
          {match.Away ? (
            <>
              <img
                src={pictureUrl(match.Away.PictureUrl, 1)}
                alt={match.Away.Abbreviation}
                className="h-4 rounded-sm"
              />
              <div className="ml-2 flex-1">{match.Away.ShortClubName}</div>
            </>
          ) : (
            <>
              <div className="h-4 w-6 rounded-sm bg-slate-600" />
              <div className="ml-2 flex-1">
                {parsePlaceholder(match.PlaceHolderB, groups)}
              </div>
            </>
          )}
          <div className="flex-1 text-right">
            {match.Away ? match.Away.Score : '-'}
          </div>
        </div>
      </div>
    </div>
  )
}
