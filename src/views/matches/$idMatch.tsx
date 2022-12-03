import { useQuery } from '@tanstack/react-query'
import { useMatch } from '@tanstack/react-router'
import { z } from 'zod'
import { Tab } from '@headlessui/react'
import { fetchMatchByStageMatch } from '../../services/match'
import { MATCHES_QUERY_KEY, TIMELINE_QUERY_KEY } from '../../util/constants'
import { Loader } from '../../components/Loader'
import { fetchTimeline } from '../../services/timeline'
import { pictureUrl } from '../../util/picture'
import { PageContainer } from '../../layout/PageLayout'
import { timeSince } from '../../util/time'
import { outcome } from '../../util/match'
import { LineUp } from '../../features/Lineup'
import { matchIndexRoute } from '.'

export const IdMatchPage = () => {
  const { params } = useMatch(idMatchRoute.id)

  const { data: match } = useQuery(
    [MATCHES_QUERY_KEY, params.idStage, params.idMatch],
    () => fetchMatchByStageMatch(params.idStage, params.idMatch)
  )

  const { data: timeline } = useQuery(
    [TIMELINE_QUERY_KEY, params.idStage, params.idMatch],
    async () => {
      const timeline = await fetchTimeline(params.idStage, params.idMatch)
      return (
        timeline?.Event.filter(
          (event) => event.EventDescription.length
        ).reverse() || []
      )
    }
  )

  if (match === null)
    return (
      <PageContainer>match not started yet, check back later</PageContainer>
    )

  if (!match || !timeline) return <Loader />

  return (
    <PageContainer>
      <div className="grid grid-cols-5 pb-8 lg:px-16">
        <div className="flex flex-col items-center gap-1">
          <img
            className="h-8 rounded-sm"
            src={pictureUrl(match.HomeTeam.PictureUrl, 4)}
            alt=""
          />
          <h2 className="text-xl">{match.HomeTeam.ShortClubName}</h2>
          <div className="opacity-60">{match.HomeTeam.Abbreviation}</div>
        </div>
        <div className="flex items-center justify-center text-4xl">
          {match.HomeTeam.Score}
        </div>
        <div className="flex items-center justify-center text-4xl font-bold opacity-60">
          -
        </div>
        <div className="flex items-center justify-center text-4xl">
          {match.AwayTeam.Score}
        </div>
        <div className="flex flex-col items-center gap-1">
          <img
            className="h-8 rounded-sm"
            src={pictureUrl(match.AwayTeam.PictureUrl, 4)}
            alt=""
          />
          <h2 className="text-xl">{match.AwayTeam.ShortClubName}</h2>
          <div className="opacity-60">{match.AwayTeam.Abbreviation}</div>
        </div>
      </div>
      <div className="flex justify-center gap-4 pb-6">
        <div>{timeSince(new Date(match.Date))}</div>
        <div>&bull;</div>
        <div>{outcome(match.HomeTeam, match.AwayTeam)}</div>
      </div>
      <Tab.Group>
        <Tab.List className="flex justify-center gap-4">
          <Tab
            className={({ selected }) =>
              `text-lg font-bold ${
                selected ? 'text-slate-300' : 'text-slate-500'
              }`
            }
          >
            Timeline
          </Tab>
          <Tab
            className={({ selected }) =>
              `text-lg font-bold ${
                selected ? 'text-slate-300' : 'text-slate-500'
              }`
            }
          >
            Lineup
          </Tab>
        </Tab.List>
        <Tab.Panels className="py-6">
          <Tab.Panel>
            <ul className="flex flex-col gap-2">
              {timeline.map((event) => (
                <li
                  key={event.EventId}
                  className="flex gap-4 rounded border border-slate-600 px-4 py-2"
                >
                  <div className="text-right opacity-70">
                    {event.MatchMinute}
                  </div>
                  <div>
                    {event.EventDescription[0]?.Description ||
                      event.TypeLocalized[0]?.Description}
                  </div>
                </li>
              ))}
            </ul>
          </Tab.Panel>
          <Tab.Panel>
            <LineUp match={match} />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </PageContainer>
  )
}

export const idMatchRoute = matchIndexRoute.createRoute({
  path: '$idStage/$idMatch',
  component: IdMatchPage,
  parseParams: ({ idMatch, idStage }) => ({
    idMatch: z.string().parse(idMatch),
    idStage: z.string().parse(idStage),
  }),
  stringifyParams: (params) => ({
    ...params,
  }),
})
