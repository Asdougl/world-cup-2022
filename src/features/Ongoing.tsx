import { useQuery } from '@tanstack/react-query'
import { fetchOngoingMatches } from '../services/fifa'
import { MATCHES_QUERY_KEY } from '../util/constants'
import { pictureUrl } from '../util/picture'

export const Ongoing = () => {
  const { data, isLoading } = useQuery(
    [MATCHES_QUERY_KEY, 'ongoing'],
    fetchOngoingMatches
  )

  return !isLoading && data ? (
    <div className="grid grid-cols-3 gap-4">
      {data.map((match) => (
        <div key={match.IdMatch} className="w-full">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <div>
                <img
                  className="h-3 rounded-sm"
                  src={pictureUrl(match.Home.PictureUrl, 1)}
                />
              </div>
              <div className="ml-2">{match.Home.ShortClubName}</div>
            </div>
            <div className="text-sm">{match.Home.Score}</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <div>
                <img
                  className="h-3 rounded-sm"
                  src={pictureUrl(match.Away.PictureUrl, 1)}
                />
              </div>
              <div className="ml-2">{match.Away.ShortClubName}</div>
            </div>
            <div className="text-sm">{match.Away.Score}</div>
          </div>
        </div>
      ))}
    </div>
  ) : null
}
