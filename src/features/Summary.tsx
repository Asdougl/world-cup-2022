import type { IconDefinition } from '@fortawesome/pro-regular-svg-icons'
import { faNote } from '@fortawesome/pro-regular-svg-icons'
import {
  faFutbolBall,
  faCardsBlank,
  faCardDiamond,
} from '@fortawesome/pro-duotone-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { CSSProperties, FC } from 'react'
import classNames from 'classnames'
import type { FullMatchTeam } from '../types/fullMatch'
import type { TimelineEvent } from '../types/timeline'
import { EventType } from '../types/timeline'

const SummaryEntry: FC<{
  icon?: IconDefinition
  title: string
  type?: EventType
  team?: 'home' | 'away'
}> = ({ title, icon, type, team }) => (
  <div
    className={`flex items-center ${
      team === 'away' ? 'flex-row-reverse' : 'flex-row'
    }`}
  >
    {icon && (
      <FontAwesomeIcon
        icon={icon}
        className={classNames('px-2', {
          'text-yellow-500': type === EventType.YELLOW,
          'text-red-500':
            type === EventType.STRAIGHT_RED || type === EventType.SECOND_YELLOW,
        })}
        style={
          {
            '--fa-secondary-color':
              type === EventType.YELLOW || type === EventType.SECOND_YELLOW
                ? '#eab308'
                : type === EventType.STRAIGHT_RED
                ? '#ef4444'
                : 'transparent',
            '--fa-secondary-opacity': 1.0,
          } as CSSProperties
        }
        fixedWidth
      />
    )}
    <span
      className={classNames(
        team === 'home' ? 'text-left' : 'text-right',
        'text-sm lg:text-lg'
      )}
    >
      {title}
    </span>
  </div>
)

interface SummaryProps {
  events: TimelineEvent[]
  home: FullMatchTeam
  away: FullMatchTeam
}

export const Summary = ({ events, home, away }: SummaryProps) => {
  const allPlayers = [...home.Players, ...away.Players]

  const homeEvents: JSX.Element[] = []
  const awayEvents: JSX.Element[] = []
  events.forEach((event) => {
    if (
      event.Type === EventType.GOAL ||
      event.Type === EventType.CONVERTED_PENALTY ||
      event.Type === EventType.OWN_GOAL
    ) {
      const player = allPlayers.find(
        (player) => player.IdPlayer === event.IdPlayer
      )

      const homeTeam = event.IdTeam === home.IdTeam

      const entry = (
        <SummaryEntry
          team={homeTeam ? 'home' : 'away'}
          key={event.EventId}
          icon={faFutbolBall}
          title={`${
            player?.PlayerName[0]?.Description ||
            (homeTeam ? home.ShortClubName : away.ShortClubName)
          } ${event.MatchMinute} ${
            event.Type === EventType.OWN_GOAL ? '(OG)' : ''
          }`}
        />
      )

      if (homeTeam && event.Type !== EventType.OWN_GOAL) {
        homeEvents.push(entry)
      } else {
        awayEvents.push(entry)
      }
    } else if (
      event.Type === EventType.YELLOW ||
      event.Type === EventType.STRAIGHT_RED ||
      event.Type === EventType.SECOND_YELLOW
    ) {
      const player = allPlayers.find(
        (player) => player.IdPlayer === event.IdPlayer
      )

      const homeTeam = event.IdTeam === home.IdTeam

      const entry = (
        <SummaryEntry
          team={homeTeam ? 'home' : 'away'}
          key={event.EventId}
          icon={
            event.Type === EventType.SECOND_YELLOW
              ? faCardsBlank
              : faCardDiamond
          }
          type={event.Type}
          title={`${
            player?.PlayerName[0]?.Description ||
            (homeTeam ? home.ShortClubName : away.ShortClubName)
          } ${event.MatchMinute}`}
        />
      )

      if (homeTeam) {
        homeEvents.push(entry)
      } else {
        awayEvents.push(entry)
      }
    }
  })

  if (homeEvents.length === 0 && awayEvents.length === 0) {
    return (
      <div className="relative w-full gap-4 py-12 text-center text-lg opacity-70">
        <FontAwesomeIcon icon={faNote} size="4x" className="text-slate-500" />
        <p>Summary will be</p>
        <p>updated throughout the match</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2">
      <div className="flex flex-col items-start gap-2">
        {homeEvents.reverse()}
      </div>
      <div className="flex flex-col items-end gap-2">
        {awayEvents.reverse()}
      </div>
    </div>
  )
}
