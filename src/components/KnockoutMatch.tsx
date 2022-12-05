import dayjs from 'dayjs'
import Xarrow from 'react-xarrows'
import classNames from 'classnames'
import type { Group } from '../types/group'
import type { PotentialMatch } from '../types/match'
import { parsePlaceholder } from '../util/knockout'
import { pictureUrl } from '../util/picture'
import { router } from '../router'

interface KnockoutMatchProps {
  match: PotentialMatch
  groups: Record<string, Group> | undefined
  winnerTo?: string
  loserTo?: string
  arrowOffset?: number
}

export const KnockoutMatch = ({
  match,
  groups,
  winnerTo,
  loserTo,
  arrowOffset = 0,
}: KnockoutMatchProps) => {
  return (
    <div key={match.IdMatch} className="flex min-w-[200px] flex-col gap-2">
      <div className="flex flex-col items-start px-2 lg:flex-row lg:items-center lg:gap-3">
        <span>Game {match.MatchNumber}</span>
        <span className="text-sm opacity-70">
          {dayjs(match.Date).format('dddd, MMM D [at] h:mma')}
        </span>
      </div>
      <router.Link
        to="/matches/$idStage/$idMatch"
        params={{ idStage: match.IdStage, idMatch: match.IdMatch }}
        className="flex flex-col gap-4 rounded-lg border border-slate-600 py-2 hover:bg-white/5"
        id={`match-${match.MatchNumber}`}
      >
        <div
          className="flex items-center px-4"
          id={`${match.MatchNumber}-home`}
        >
          {match.Home ? (
            <>
              <img
                src={pictureUrl(match.Home.PictureUrl, 1)}
                alt={match.Home.Abbreviation}
                className="h-4 rounded-sm"
              />
              <div className="ml-2 flex-1">
                <span
                  className={classNames('hidden lg:inline', {
                    'font-bold': match.Winner === match.Home.IdTeam,
                  })}
                >
                  {match.Home.TeamName[0]?.Description}
                </span>
                <span
                  className={classNames('lg:hidden', {
                    'font-bold': match.Winner === match.Home.IdTeam,
                  })}
                >
                  {match.Home.ShortClubName}
                </span>{' '}
                <span className="text-xs opacity-60">
                  {match.Home.Abbreviation}
                </span>
              </div>
            </>
          ) : (
            <>
              <div className="h-4 w-6 rounded-sm bg-slate-600" />
              <div className="ml-2 flex-1">
                {parsePlaceholder(match.PlaceHolderA, groups)}
              </div>
            </>
          )}
          <div className="text-right">
            {match.Home ? match.Home.Score ?? '-' : '-'}
            {match.ResultType === 2 && (
              <span className="pl-1 text-sm opacity-70">
                ({match.HomeTeamPenaltyScore ?? '-'})
              </span>
            )}
          </div>
        </div>
        <div
          className="flex items-center px-4"
          id={`${match.MatchNumber}-away`}
        >
          {match.Away ? (
            <>
              <img
                src={pictureUrl(match.Away.PictureUrl, 1)}
                alt={match.Away.Abbreviation}
                className="h-4 rounded-sm"
              />
              <div className="ml-2 flex-1">
                <span className="hidden lg:inline">
                  {match.Away.TeamName[0]?.Description}
                </span>
                <span className="lg:hidden">{match.Away.ShortClubName}</span>{' '}
                <span className="text-xs opacity-60">
                  {match.Away.Abbreviation}
                </span>
              </div>
            </>
          ) : (
            <>
              <div className="h-4 w-6 rounded-sm bg-slate-600" />
              <div className="ml-2 flex-1">
                {parsePlaceholder(match.PlaceHolderB, groups)}
              </div>
            </>
          )}
          <div className="text-right">
            {match.Away ? match.Away.Score ?? '-' : '-'}
            {match.ResultType === 2 && (
              <span className="pl-1 text-sm opacity-70">
                ({match.AwayTeamPenaltyScore ?? '-'})
              </span>
            )}
          </div>
        </div>
        {winnerTo && (
          <Xarrow
            start={`match-${match.MatchNumber}`}
            end={winnerTo}
            endAnchor="left"
            startAnchor="right"
            color="#475569"
            curveness={0.5}
            path="grid"
            _cpx1Offset={arrowOffset * 6}
            _cpx2Offset={arrowOffset * 6}
          />
        )}
        {loserTo && (
          <Xarrow
            start={`match-${match.MatchNumber}`}
            end={loserTo}
            endAnchor="left"
            startAnchor="right"
            color="#475569"
            curveness={0.5}
            path="grid"
            _cpx1Offset={arrowOffset * 6}
            _cpx2Offset={arrowOffset * 6}
          />
        )}
      </router.Link>
    </div>
  )
}
