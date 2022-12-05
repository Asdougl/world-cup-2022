import { useQuery } from '@tanstack/react-query'
import { useMatch } from '@tanstack/react-router'
import { z } from 'zod'
import { Tab } from '@headlessui/react'
import dayjs from 'dayjs'
import { fetchMatchByStageMatch } from '../../services/match'
import {
  FULL_MATCH_QUERY_KEY,
  MATCHES_QUERY_KEY,
  TIMELINE_QUERY_KEY,
} from '../../util/constants'
import { Loader } from '../../components/Loader'
import { fetchTimeline } from '../../services/timeline'
import { pictureUrl } from '../../util/picture'
import { PageContainer } from '../../layout/PageLayout'
import { seconds, timeSince } from '../../util/time'
import { outcome } from '../../util/match'
import { LineUp } from '../../features/Lineup'
import { Timeline } from '../../features/Timeline'
import { Summary } from '../../features/Summary'
import { MatchStatus } from '../../types/match'
import { fetchOneMatch } from '../../services/fifa'
import { matchIndexRoute } from '.'

export const IdMatchPage = () => {
  const { params } = useMatch(idMatchRoute.id)

  const { data: match } = useQuery(
    [MATCHES_QUERY_KEY, params.idMatch],
    () => fetchOneMatch(params.idMatch),
    {
      staleTime: seconds(15),
      refetchInterval: seconds(30),
    }
  )

  const { data: fullMatch } = useQuery(
    [FULL_MATCH_QUERY_KEY, params.idStage, params.idMatch],
    () => fetchMatchByStageMatch(params.idStage, params.idMatch),
    {
      staleTime: seconds(15),
      refetchInterval: seconds(30),
    }
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
    },
    {
      staleTime: seconds(15),
      refetchInterval: seconds(30),
    }
  )

  if (!match || !timeline) return <Loader />

  return (
    <PageContainer>
      <div className="flex items-center justify-center pb-6">
        {match.MatchStatus === MatchStatus.UPCOMING ? (
          dayjs(match.Date).format('MMM D, YYYY - h:mma')
        ) : match.MatchStatus === MatchStatus.FINISHED ? (
          'Full-time'
        ) : fullMatch ? (
          <>
            <div className="relative mx-2 h-2 w-2 rounded-full bg-red-500">
              <div className="absolute h-2 w-2 animate-ping rounded-full bg-red-500"></div>
            </div>
            <div className="pr-4 text-xs text-red-500">Live</div>
            <div>{fullMatch.MatchTime}</div>
          </>
        ) : null}
      </div>
      <div className="grid grid-cols-5 pb-8 lg:px-16">
        <div className="flex flex-col items-center gap-1">
          {match.Home ? (
            <>
              <img
                className="h-8 rounded-sm"
                src={pictureUrl(match.Home?.PictureUrl, 4)}
                alt={match.Home.Abbreviation}
              />
              <h2 className="hidden text-xl lg:block">
                {match.Home.ShortClubName}
              </h2>
              <div className="opacity-60">{match.Home.Abbreviation}</div>
            </>
          ) : (
            <>
              <div className="h-8 w-12 rounded-sm bg-slate-600" />
              <h2 className="text-xl">{match.PlaceHolderA}</h2>
            </>
          )}
        </div>
        <div className="flex items-center justify-center text-4xl">
          {match.Home ? match.Home.Score : ''}
        </div>
        <div className="flex items-center justify-center text-4xl font-bold opacity-60">
          -
        </div>
        <div className="flex items-center justify-center text-4xl">
          {match.Away ? match.Away.Score : ''}
        </div>
        <div className="flex flex-col items-center gap-1">
          {match.Away ? (
            <>
              <img
                className="h-8 rounded-sm"
                src={pictureUrl(match.Away?.PictureUrl, 4)}
                alt={match.Away.Abbreviation}
              />
              <h2 className="hidden text-xl lg:block">
                {match.Away.ShortClubName}
              </h2>
              <div className="opacity-60">{match.Away.Abbreviation}</div>
            </>
          ) : (
            <>
              <div className="h-8 w-12 rounded-sm bg-slate-600" />
              <h2 className="text-xl">{match.PlaceHolderB}</h2>
            </>
          )}
        </div>
      </div>
      <div className="flex flex-col items-center gap-2 pb-6">
        <span className="text-lg">
          {match.MatchStatus === MatchStatus.FINISHED && fullMatch
            ? outcome(match.Winner, fullMatch.HomeTeam, fullMatch.AwayTeam)
            : timeSince(new Date(match.Date))}
        </span>
        {match.ResultType === 2 && (
          <span className="">
            {match.AwayTeamPenaltyScore} - {match.HomeTeamPenaltyScore} on
            penalties
          </span>
        )}
        <span className="opacity-60">{match.StageName[0]?.Description}</span>
        <span className="opacity-60">
          {match.Stadium.Name[0]?.Description},{' '}
          {match.Stadium.CityName[0]?.Description} {match.Stadium.IdCountry}
        </span>
      </div>
      {fullMatch && (
        <Tab.Group>
          <div className="flex justify-center">
            <Tab.List className="mt-10 grid grid-cols-3 gap-4">
              <Tab
                className={({ selected }) =>
                  `text-lg font-bold ${
                    selected ? 'text-slate-300 underline' : 'text-slate-500'
                  } px-6 py-2 focus:bg-slate-800 focus:outline-none`
                }
              >
                Summary
              </Tab>
              <Tab
                className={({ selected }) =>
                  `text-lg font-bold ${
                    selected ? 'text-slate-300 underline' : 'text-slate-500'
                  } px-6 py-2 focus:bg-slate-800 focus:outline-none`
                }
              >
                Timeline
              </Tab>
              <Tab
                className={({ selected }) =>
                  `text-lg font-bold ${
                    selected ? 'text-slate-300 underline' : 'text-slate-500'
                  } px-6 py-2 focus:bg-slate-800 focus:outline-none`
                }
              >
                Lineup
              </Tab>
            </Tab.List>
          </div>
          <Tab.Panels className="py-6">
            <Tab.Panel>
              <Summary
                events={timeline}
                home={fullMatch.HomeTeam}
                away={fullMatch.AwayTeam}
              />
            </Tab.Panel>
            <Tab.Panel>
              <Timeline events={timeline} />
            </Tab.Panel>
            <Tab.Panel>
              <LineUp match={fullMatch} />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      )}
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
