import { KnockoutMatch } from '../components/KnockoutMatch'
import {
  useFinalMatchesQuery,
  useRound16MatchesQuery,
  useSemiMatchesQuery,
  useThirdMatchesQuery,
} from '../hooks/matches'
import { useGroupStandingsMapQuery } from '../hooks/standings'

export const KnockoutView = () => {
  const { data: r16Matches, isLoading: r16loading } = useRound16MatchesQuery()
  const { data: semiMatches, isLoading: semiloading } = useSemiMatchesQuery()
  const { data: quarterMatches, isLoading: quarterLoading } =
    useSemiMatchesQuery()
  const { data: finalMatches, isLoading: finalloading } = useFinalMatchesQuery()
  const { data: thirdMatches, isLoading: thirdloading } = useThirdMatchesQuery()
  const { data: groupData, isLoading: groupLoading } =
    useGroupStandingsMapQuery()

  const loading =
    r16loading ||
    semiloading ||
    quarterLoading ||
    finalloading ||
    groupLoading ||
    thirdloading

  let matchNum = 0

  return (
    <div className="container mx-auto px-4 pt-8 pb-12 lg:px-0">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex flex-col gap-8">
          <h2 className="px-2 pt-2 text-2xl font-bold">Round of 16</h2>
          {r16Matches?.map((entry) => (
            <KnockoutMatch
              key={entry.IdMatch}
              match={entry}
              index={matchNum++}
              groups={groupData}
            />
          ))}
          <h2 className="px-2 pt-2 text-2xl font-bold">Quarter Finals</h2>
          {quarterMatches?.map((entry) => (
            <KnockoutMatch
              key={entry.IdMatch}
              match={entry}
              index={matchNum++}
              groups={groupData}
            />
          ))}
          <h2 className="px-2 pt-2 text-2xl font-bold">Semi Finals</h2>
          {semiMatches?.map((entry) => (
            <KnockoutMatch
              key={entry.IdMatch}
              match={entry}
              index={matchNum++}
              groups={groupData}
            />
          ))}
          <h2 className="px-2 pt-2 text-2xl font-bold">Third Place</h2>
          {thirdMatches?.map((entry) => (
            <KnockoutMatch
              key={entry.IdMatch}
              match={entry}
              index={matchNum++}
              groups={groupData}
            />
          ))}
          <h2 className="px-2 pt-2 text-2xl font-bold">Final</h2>
          {finalMatches?.map((entry) => (
            <KnockoutMatch
              key={entry.IdMatch}
              match={entry}
              index={matchNum++}
              groups={groupData}
            />
          ))}
        </div>
      )}
    </div>
  )
}
