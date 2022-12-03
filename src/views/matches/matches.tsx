import { useQuery } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes } from '@fortawesome/pro-regular-svg-icons'
import { Loader } from '../../components/Loader'
import { MatchCard } from '../../components/MatchCard'
import { fetchMatches } from '../../services/fifa'
import { MATCHES_QUERY_KEY } from '../../util/constants'
import { minutes, seconds } from '../../util/time'
import { PageContainer } from '../../layout/PageLayout'
import { MatchStatus } from '../../types/match'
import { matchIndexRoute } from '.'

const MatchView = () => {
  const { data } = useQuery([MATCHES_QUERY_KEY], () => fetchMatches(), {
    staleTime: seconds(30),
    refetchInterval: minutes(1),
  })

  const [showUpcoming, setShowUpcoming] = useState(true)
  const [showLive, setShowLive] = useState(true)
  const [showFinished, setShowFinished] = useState(true)

  const matches = useMemo(() => {
    if (!data) return []
    return showUpcoming && showLive && showFinished
      ? data
      : data.filter((match) => {
          if (showUpcoming && match.MatchStatus === MatchStatus.UPCOMING)
            return true
          if (showLive && match.MatchStatus === MatchStatus.LIVE) return true
          if (showFinished && match.MatchStatus === MatchStatus.FINISHED)
            return true
          return false
        })
  }, [data, showUpcoming, showLive, showFinished])

  if (!data) return <Loader />

  return (
    <PageContainer className="">
      <div className="flex gap-4 py-4">
        <button
          className={classNames(
            'flex items-center gap-2 rounded-full border-2 border-white/60 px-4 py-1 text-sm uppercase',
            { 'bg-white/10': showUpcoming }
          )}
          onClick={() => setShowUpcoming((show) => !show)}
        >
          <FontAwesomeIcon icon={showUpcoming ? faCheck : faTimes} /> Upcoming
        </button>
        <button
          className={classNames(
            'flex items-center gap-2 rounded-full border-2 border-white/60 px-4 py-1 text-sm uppercase',
            { 'bg-white/10': showLive }
          )}
          onClick={() => setShowLive((show) => !show)}
        >
          <FontAwesomeIcon icon={showLive ? faCheck : faTimes} />
          Live
        </button>
        <button
          className={classNames(
            'flex items-center gap-2 rounded-full border-2 border-white/60 px-4 py-1 text-sm uppercase',
            { 'bg-white/10': showFinished }
          )}
          onClick={() => setShowFinished((show) => !show)}
        >
          <FontAwesomeIcon icon={showFinished ? faCheck : faTimes} />
          Finished
        </button>
      </div>
      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {matches.map((match) => (
          <MatchCard key={match.IdMatch} match={match} />
        ))}
      </div>
    </PageContainer>
  )
}

export const matchesRoute = matchIndexRoute.createRoute({
  path: '/',
  component: MatchView,
})
