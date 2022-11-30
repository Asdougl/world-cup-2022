import { useQuery } from '@tanstack/react-query'
import { createRouteConfig } from '@tanstack/react-router'
import { Loader } from '../components/Loader'
import { MatchCard } from '../components/MatchCard'
import { fetchMatches } from '../services/fifa'
import { MATCHES_QUERY_KEY } from '../util/constants'
import { minutes, seconds } from '../util/time'

const MatchView = () => {
  const { data, isLoading } = useQuery(
    [MATCHES_QUERY_KEY],
    () => fetchMatches(),
    {
      staleTime: seconds(30),
      refetchInterval: minutes(1),
    }
  )

  return !isLoading && data ? (
    <div className="container mx-auto grid gap-4 px-4 py-4 lg:grid-cols-2 lg:px-0 xl:grid-cols-3">
      {data.map((match) => (
        <MatchCard key={match.IdMatch} match={match} />
      ))}
    </div>
  ) : (
    <Loader />
  )
}

export const matchesRoute = createRouteConfig().createRoute({
  path: 'matches',
  component: MatchView,
})
