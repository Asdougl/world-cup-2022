import { createRouteConfig } from '@tanstack/react-router'
import { KnockoutMatch } from '../components/KnockoutMatch'
import { Loader } from '../components/Loader'
import {
  useFinalMatchesQuery,
  useQuarterMatchesQuery,
  useRound16MatchesQuery,
  useSemiMatchesQuery,
  useThirdMatchesQuery,
} from '../hooks/matches'
import { useGroupStandingsMapQuery } from '../hooks/standings'

const KnockoutView = () => {
  const { data: r16Matches, isLoading: r16loading } = useRound16MatchesQuery()
  const { data: semiMatches, isLoading: semiloading } = useSemiMatchesQuery()
  const { data: quarterMatches, isLoading: quarterLoading } =
    useQuarterMatchesQuery()
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

  if (loading) return <Loader />

  return (
    <div className="overflow-x-auto px-4 pt-8 pb-12 lg:px-0">
      <div className="flex gap-16 lg:px-10">
        <div className="flex flex-grow flex-col justify-center pt-10">
          <div className="relative flex flex-col gap-4">
            <h2 className="absolute bottom-full left-0 px-2 py-2 text-2xl font-bold">
              Round of 16
            </h2>
            {r16Matches && (
              <>
                {r16Matches['49'] && (
                  <KnockoutMatch
                    match={r16Matches['49']}
                    groups={groupData}
                    arrowOffset={1}
                    winnerTo="57-home"
                  />
                )}
                {r16Matches['50'] && (
                  <KnockoutMatch
                    match={r16Matches['50']}
                    groups={groupData}
                    arrowOffset={0}
                    winnerTo="57-away"
                  />
                )}
                {r16Matches['53'] && (
                  <KnockoutMatch
                    match={r16Matches['53']}
                    groups={groupData}
                    arrowOffset={-1}
                    winnerTo="58-home"
                  />
                )}
                {r16Matches['54'] && (
                  <KnockoutMatch
                    match={r16Matches['54']}
                    groups={groupData}
                    arrowOffset={-2}
                    winnerTo="58-away"
                  />
                )}
                {r16Matches['51'] && (
                  <KnockoutMatch
                    match={r16Matches['51']}
                    groups={groupData}
                    arrowOffset={-2}
                    winnerTo="59-home"
                  />
                )}
                {r16Matches['52'] && (
                  <KnockoutMatch
                    match={r16Matches['52']}
                    groups={groupData}
                    arrowOffset={-1}
                    winnerTo="59-away"
                  />
                )}
                {r16Matches['55'] && (
                  <KnockoutMatch
                    match={r16Matches['55']}
                    groups={groupData}
                    arrowOffset={0}
                    winnerTo="60-home"
                  />
                )}
                {r16Matches['56'] && (
                  <KnockoutMatch
                    match={r16Matches['56']}
                    groups={groupData}
                    arrowOffset={1}
                    winnerTo="60-away"
                  />
                )}
              </>
            )}
          </div>
        </div>
        <div className="flex flex-grow flex-col justify-center gap-4 pt-10">
          <div className="relative flex flex-col gap-4">
            <h2 className="absolute bottom-full left-0 px-2 py-2 text-2xl font-bold">
              Quarter Finals
            </h2>
            {quarterMatches && (
              <>
                {quarterMatches['57'] && (
                  <KnockoutMatch
                    match={quarterMatches['57']}
                    groups={groupData}
                    arrowOffset={1}
                    winnerTo="61-home"
                  />
                )}
                {quarterMatches['58'] && (
                  <KnockoutMatch
                    match={quarterMatches['58']}
                    groups={groupData}
                    arrowOffset={1}
                    winnerTo="61-away"
                  />
                )}
                {quarterMatches['59'] && (
                  <KnockoutMatch
                    match={quarterMatches['59']}
                    groups={groupData}
                    arrowOffset={1}
                    winnerTo="62-home"
                  />
                )}
                {quarterMatches['60'] && (
                  <KnockoutMatch
                    match={quarterMatches['60']}
                    groups={groupData}
                    arrowOffset={1}
                    winnerTo="62-away"
                  />
                )}
              </>
            )}
          </div>
        </div>
        <div className="flex flex-grow flex-col justify-center gap-4 pt-10">
          <div className="relative flex flex-col gap-4">
            <h2 className="absolute bottom-full left-0 px-2 py-2 text-2xl font-bold">
              Semi Finals
            </h2>
            {semiMatches && (
              <>
                {semiMatches['61'] && (
                  <KnockoutMatch
                    match={semiMatches['61']}
                    groups={groupData}
                    arrowOffset={-1}
                    winnerTo="64-home"
                  />
                )}
                {semiMatches['62'] && (
                  <KnockoutMatch
                    match={semiMatches['62']}
                    groups={groupData}
                    arrowOffset={1}
                    winnerTo="64-away"
                  />
                )}
              </>
            )}
          </div>
        </div>
        <div className="flex flex-grow flex-col justify-center gap-4 pt-10">
          <div className="relative flex flex-col gap-4">
            <h2 className="absolute bottom-full left-0 px-2 py-2 text-2xl font-bold">
              Final
            </h2>
            {finalMatches && (
              <>
                {finalMatches['64'] && (
                  <KnockoutMatch
                    match={finalMatches['64']}
                    groups={groupData}
                    arrowOffset={1}
                  />
                )}
              </>
            )}
            <h2 className="bottom-full left-0 px-2 pt-6 pb-2 text-2xl font-bold">
              Third Place
            </h2>
            {thirdMatches && (
              <>
                {thirdMatches['63'] && (
                  <KnockoutMatch
                    match={thirdMatches['63']}
                    groups={groupData}
                    arrowOffset={1}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export const knockoutRoute = createRouteConfig().createRoute({
  path: 'knockout',
  component: KnockoutView,
})
