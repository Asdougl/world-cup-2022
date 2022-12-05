import { faStopwatch } from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { FC } from 'react'
import type { TimelineEvent } from '../types/timeline'

type TimelineProps = {
  events: TimelineEvent[]
}

export const Timeline: FC<TimelineProps> = ({ events }) => {
  if (!events.length) {
    return (
      <div className="relative w-full gap-4 py-12 text-center text-lg opacity-70">
        <FontAwesomeIcon
          icon={faStopwatch}
          size="4x"
          className="text-slate-500"
        />
        <p>Events will be</p>
        <p>posted as they happen</p>
      </div>
    )
  }

  return (
    <ul className="flex flex-col divide-y divide-slate-600">
      {events.map((event) => (
        <li key={event.EventId} className="flex gap-4 rounded px-4 py-3">
          <div className="text-right opacity-70">{event.MatchMinute}</div>
          <div>
            {event.EventDescription[0]?.Description ||
              event.TypeLocalized[0]?.Description}
          </div>
        </li>
      ))}
    </ul>
  )
}
