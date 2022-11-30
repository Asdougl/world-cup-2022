import dayjs from 'dayjs'
import type { FC } from 'react'
import type { PotentialMatch } from '../types/match'
import { parsePlaceholder } from '../util/knockout'
import { pictureUrl } from '../util/picture'

export const MatchCard: FC<{ match: PotentialMatch }> = ({ match }) => {
  return (
    <div className="w-full rounded-lg border-2 border-slate-600 px-4 py-2">
      <div className="grid grid-cols-3 text-sm opacity-70">
        <div className="">
          {match.GroupName[0]?.Description || match.StageName[0]?.Description}
        </div>
        <div className="text-center">
          {match.MatchStatus === 0
            ? 'FT'
            : match.MatchStatus === 1
            ? 'KO'
            : match.MatchTime ?? ''}
        </div>
        <div className="text-right">
          {dayjs(match.Date).format('dddd, MMM D')}
        </div>
      </div>
      <div className="flex">
        <div className="flex flex-1 items-center justify-start gap-1">
          <div>
            {match.Home ? (
              <img
                className="h-4 rounded-sm"
                src={pictureUrl(match.Home.PictureUrl, 1)}
              />
            ) : (
              <div className="h-4 w-6 rounded-sm bg-gray-600" />
            )}
          </div>
          <div className="ml-2">
            {match.Home
              ? match.Home.ShortClubName
              : parsePlaceholder(match.PlaceHolderA)}
          </div>
        </div>
        <div className="flex items-center gap-1 text-center">
          {match.MatchStatus !== 1 ? (
            <>
              <span className="flex-1">{match.Home?.Score ?? '-'}</span>
              <span className="text-xs">&bull;</span>
              <span className="flex-1">{match.Away?.Score ?? '-'}</span>
            </>
          ) : (
            <div>{dayjs(match.Date).format('HH:mm')}</div>
          )}
        </div>
        <div className="flex flex-1 items-center justify-end gap-1">
          <div className="mr-2">
            {match.Away?.ShortClubName || parsePlaceholder(match.PlaceHolderB)}
          </div>
          <div>
            {match.Away ? (
              <img
                className="h-4 rounded-sm"
                src={pictureUrl(match.Away.PictureUrl, 1)}
              />
            ) : (
              <div className="h-4 w-6 rounded-sm bg-gray-600" />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
