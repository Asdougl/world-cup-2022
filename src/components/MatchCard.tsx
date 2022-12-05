import classNames from 'classnames'
import dayjs from 'dayjs'
import type { FC } from 'react'
import type { PotentialMatch } from '../types/match'
import { MatchStatus } from '../types/match'
import { parsePlaceholder } from '../util/knockout'
import { pictureUrl } from '../util/picture'
import { timeSince } from '../util/time'
import { router } from '../router'
import { idMatchRoute } from '../views/matches/$idMatch'

type MatchStatusText = 'upcoming' | 'live' | 'finished'

const matchStatus = (match: PotentialMatch): MatchStatusText => {
  if (match.MatchStatus === 0) {
    return 'finished'
  }
  if (match.MatchStatus === 1) {
    return 'upcoming'
  }
  return 'live'
}

const matchStatusText = (match: PotentialMatch) => {
  if (match.MatchStatus === MatchStatus.FINISHED) {
    if (match.Winner) {
      const winnerText =
        match.Home?.IdTeam === match.Winner
          ? `${match.Home?.Abbreviation} won`
          : `${match.Away?.Abbreviation} won`

      if (match.ResultType === 2) {
        return `${winnerText} ${match.HomeTeamPenaltyScore} - ${match.AwayTeamPenaltyScore} pens`
      }
      return winnerText
    } else {
      return 'Draw'
    }
  }
  if (match.MatchStatus === MatchStatus.UPCOMING) {
    return timeSince(new Date(match.Date))
  }
  if (match.MatchTime) {
    return match.MatchTime
  }
  return ''
}

export const MatchCard: FC<{ match: PotentialMatch }> = ({ match }) => {
  const status = matchStatus(match)
  return (
    <router.Link
      to={idMatchRoute.id}
      params={{
        idMatch: match.IdMatch,
        idStage: match.IdStage,
      }}
      className={classNames(
        'flex w-full flex-col gap-2 rounded-lg border-2 px-5 py-3 hover:border-slate-300 hover:bg-white/5',
        {
          'border-slate-600': status === 'upcoming',
          'border-slate-800': status === 'finished',
          'border-slate-400': status === 'live',
        }
      )}
    >
      <div className="grid grid-cols-3 text-sm opacity-70">
        <div className="">
          {match.GroupName[0]?.Description || match.StageName[0]?.Description}
        </div>
        <div className="text-center">{matchStatusText(match)}</div>
        <div className="text-right">
          <div className="hidden lg:block">
            {dayjs(match.Date).format('dddd, MMM D')}
          </div>
          <div className="lg:hidden">
            {dayjs(match.Date).format('ddd, MMM D')}
          </div>
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
          <div className="ml-2 hidden text-right lg:block">
            {match.Home?.ShortClubName || parsePlaceholder(match.PlaceHolderA)}
          </div>
          <div className="ml-2 text-right lg:hidden">
            {match.Home?.Abbreviation || parsePlaceholder(match.PlaceHolderA)}
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
          <div className="mr-2 hidden text-right lg:block">
            {match.Away?.ShortClubName || parsePlaceholder(match.PlaceHolderB)}
          </div>
          <div className="mr-2 text-right lg:hidden">
            {match.Away?.Abbreviation || parsePlaceholder(match.PlaceHolderB)}
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
    </router.Link>
  )
}
