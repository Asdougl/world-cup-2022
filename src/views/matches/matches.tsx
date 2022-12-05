import { useQuery } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faSearch, faTimes } from '@fortawesome/pro-regular-svg-icons'
import debounce from 'lodash/debounce'
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
  const [search, setSearch] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const matches = useMemo(() => {
    if (!data) return []
    return showUpcoming && showLive && showFinished && !searchTerm
      ? data
      : data.filter((match) => {
          let show = false

          if (showUpcoming && match.MatchStatus === MatchStatus.UPCOMING) {
            show = true
          } else if (
            showLive &&
            match.MatchStatus !== MatchStatus.UPCOMING &&
            match.MatchStatus !== MatchStatus.FINISHED
          ) {
            show = true
          } else if (
            showFinished &&
            match.MatchStatus === MatchStatus.FINISHED
          ) {
            show = true
          }

          const searchLower = searchTerm.toLowerCase()
          if (searchLower && show) {
            show =
              match.Home?.ShortClubName.toLowerCase().includes(searchLower) ||
              match.Away?.ShortClubName.toLowerCase().includes(searchLower) ||
              match.Home?.Abbreviation.toLowerCase().includes(searchLower) ||
              match.Away?.Abbreviation.toLowerCase().includes(searchLower) ||
              false
          }
          return show
        })
  }, [data, showUpcoming, showLive, showFinished, searchTerm])

  const debouncedSetSearchTerm = debounce(setSearchTerm, 300)

  const updateSearch = (value: string) => {
    setSearch(value)
    debouncedSetSearchTerm(value)
  }

  if (!data) return <Loader />

  return (
    <PageContainer className="">
      <div className="flex flex-col justify-between gap-2 py-4 lg:flex-row">
        <div className="flex gap-1 lg:gap-4">
          <button
            className={classNames(
              'flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-white/60 px-2 py-1 text-sm uppercase lg:flex-none lg:px-4',
              { 'bg-white/10': showUpcoming }
            )}
            onClick={() => setShowUpcoming((show) => !show)}
          >
            <FontAwesomeIcon icon={showUpcoming ? faCheck : faTimes} /> Upcoming
          </button>
          <button
            className={classNames(
              'flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-white/60 px-2 py-1 text-sm uppercase lg:flex-none lg:px-4',
              { 'bg-white/10': showLive }
            )}
            onClick={() => setShowLive((show) => !show)}
          >
            <FontAwesomeIcon icon={showLive ? faCheck : faTimes} />
            Live
          </button>
          <button
            className={classNames(
              'flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-white/60 px-2 py-1 text-sm uppercase lg:flex-none lg:px-4',
              { 'bg-white/10': showFinished }
            )}
            onClick={() => setShowFinished((show) => !show)}
          >
            <FontAwesomeIcon icon={showFinished ? faCheck : faTimes} />
            Finished
          </button>
        </div>
        <div className="relative">
          <input
            type="text"
            className="rounded-full border-2 border-white/60 bg-white/10 py-1 pl-8 pr-4 text-sm"
            placeholder="Search matches"
            value={search}
            onChange={(e) => updateSearch(e.target.value)}
          />
          <FontAwesomeIcon
            icon={faSearch}
            className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 px-3 text-white/60"
          />
          {search && (
            <button
              className="absolute right-0 top-1/2 -translate-y-1/2 px-3 text-white/60"
              onClick={() => {
                setSearch('')
                setSearchTerm('')
              }}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          )}
        </div>
      </div>
      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {matches.length ? (
          matches.map((match) => (
            <MatchCard key={match.IdMatch} match={match} />
          ))
        ) : (
          <div className="py-12 text-center text-white/60 lg:col-span-3">
            No matches found
          </div>
        )}
      </div>
    </PageContainer>
  )
}

export const matchesRoute = matchIndexRoute.createRoute({
  path: '/',
  component: MatchView,
})
