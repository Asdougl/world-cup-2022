import dayjs from 'dayjs'
import { useMemo } from 'react'
import { Loader } from '../components/Loader'
import { MatchCard } from '../components/MatchCard'
import { useAllMatchesQuery } from '../hooks/matches'
import type { PotentialMatch } from '../types/match'

export const HomeView = () => {
  const { data, isLoading } = useAllMatchesQuery()

  const { recent, upcoming, ongoing } = useMemo(() => {
    if (!data) {
      return { recent: [], upcoming: [], ongoing: [] }
    }

    const recent: PotentialMatch[] = []
    const upcoming: PotentialMatch[] = []
    const ongoing: PotentialMatch[] = []

    const now = dayjs()

    for (const match of data) {
      const diff = dayjs(match.Date).diff(now, 'hours')
      if (match.MatchStatus === 2 || match.MatchStatus === 3) {
        ongoing.push(match)
      } else if (diff > 0 && diff < 24) {
        upcoming.push(match)
      } else if (diff < 0 && diff > -24) {
        recent.push(match)
      }
    }

    return { recent, upcoming, ongoing }
  }, [data])

  return (
    <div className="container mx-auto px-4 pt-8 lg:px-0">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            {ongoing.length > 0 && (
              <>
                <h2 className="text-2xl font-bold">Ongoing</h2>
                <div className="flex flex-col gap-4">
                  {ongoing.map((match) => (
                    <MatchCard key={match.IdMatch} match={match} />
                  ))}
                </div>
              </>
            )}
            <h2 className="text-2xl font-bold">Recent matches</h2>
            <div className="grid gap-4 lg:grid-cols-2">
              {recent.map((match) => (
                <MatchCard key={match.IdMatch} match={match} />
              ))}
            </div>

            <h2 className="text-2xl font-bold">Upcoming matches</h2>
            <div className="grid gap-4 lg:grid-cols-2">
              {upcoming.map((match) => (
                <MatchCard key={match.IdMatch} match={match} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
