import { useQuery } from '@tanstack/react-query'
import { useMatch } from '@tanstack/react-router'
import { z } from 'zod'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/pro-regular-svg-icons'
import { Loader } from '../../components/Loader'
import {
  fetchMatchesForGroup,
  fetchStandingsForOneGroup,
} from '../../services/fifa'
import { MATCHES_QUERY_KEY, STANDINGS_QUERY_KEY } from '../../util/constants'
import { minutes } from '../../util/time'
import { Group } from '../../components/Group'
import { MatchCard } from '../../components/MatchCard'
import { router } from '../../router'
import { groupsIndexRoute } from '.'

export const OneGroupView = () => {
  const { params } = useMatch(idGroupRoute.id)

  const { data: standings, isLoading: loadingStandings } = useQuery(
    [STANDINGS_QUERY_KEY, params.idGroup],
    () => fetchStandingsForOneGroup(params.idGroup),
    {
      staleTime: minutes(10),
      refetchInterval: minutes(15),
    }
  )

  const { data: matches, isLoading: loadingMatches } = useQuery(
    [MATCHES_QUERY_KEY, params.idGroup],
    () => fetchMatchesForGroup(params.idGroup),
    {
      staleTime: minutes(10),
      refetchInterval: minutes(15),
    }
  )

  const anyLoading = loadingStandings || loadingMatches

  return (
    <div className="container mx-auto px-4 pt-8 lg:px-0">
      {anyLoading ? (
        <Loader />
      ) : (
        <div className="flex flex-col gap-4">
          <router.Link
            to="/groups"
            className="text-sm opacity-70 hover:underline hover:opacity-80"
          >
            <FontAwesomeIcon icon={faArrowLeft} /> Back
          </router.Link>
          <h1 className="text-2xl font-bold">{standings?.Name}</h1>
          <div className="grid gap-4 lg:grid-cols-2">
            <div>{standings && <Group group={standings} />}</div>
            <div className="flex flex-col gap-4">
              {matches &&
                matches.map((match) => (
                  <MatchCard key={match.IdMatch} match={match} />
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export const idGroupRoute = groupsIndexRoute.createRoute({
  path: '$idGroup',
  component: OneGroupView,
  parseParams: ({ idGroup }) => ({
    idGroup: z.string().parse(idGroup),
  }),
  stringifyParams: ({ idGroup }) => ({
    idGroup,
  }),
})
