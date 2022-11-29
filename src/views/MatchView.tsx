import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { fetchMatches } from '../services/fifa'
import { MATCHES_QUERY_KEY } from '../util/constants'
import { parsePlaceholder } from '../util/knockout'
import { pictureUrl } from '../util/picture'
import { minutes, seconds } from '../util/time'

export const MatchView = () => {
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
        <div key={match.IdMatch} className="w-full">
          <div className="flex justify-between text-sm opacity-70">
            <div className="">
              {match.GroupName[0]?.Description ||
                match.StageName[0]?.Description}
            </div>
            <div>{dayjs(match.Date).format('dddd, MMM D')}</div>
          </div>
          <div className="flex">
            <div className="flex flex-1 items-center justify-start gap-1">
              <div>
                {match.Home ? (
                  <img
                    className="h-3 rounded-sm"
                    src={pictureUrl(match.Home.PictureUrl, 1)}
                  />
                ) : (
                  <div className="h-3 w-[18px] rounded-sm bg-gray-600" />
                )}
              </div>
              <div className="ml-2">
                {match.Home
                  ? match.Home.ShortClubName
                  : parsePlaceholder(match.PlaceHolderA)}
              </div>
            </div>
            <div className="flex items-center gap-1 text-center">
              {match.MatchStatus !== 1 ? (
                <>
                  <span className="flex-1">{match.Home?.Score ?? '-'}</span>
                  <span className="text-xs">&bull;</span>
                  <span className="flex-1">{match.Away?.Score ?? '-'}</span>
                </>
              ) : (
                <div>{dayjs(match.Date).format('HH:mm')}</div>
              )}
            </div>
            <div className="flex flex-1 items-center justify-end gap-1">
              <div className="mr-2">
                {match.Away?.ShortClubName ||
                  parsePlaceholder(match.PlaceHolderB)}
              </div>
              <div>
                {match.Away ? (
                  <img
                    className="h-3 rounded-sm"
                    src={pictureUrl(match.Away.PictureUrl, 1)}
                  />
                ) : (
                  <div className="h-3 w-[18px] rounded-sm bg-gray-600" />
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  ) : null
}
