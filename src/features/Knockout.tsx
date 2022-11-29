import { useQuery } from '@tanstack/react-query'
import { fetchStandings } from '../services/fifa'
import {
  STAGE_FINAL_ID,
  STAGE_QUARTER_FINAL_ID,
  STAGE_ROUND_OF_16_ID,
  STAGE_SEMI_FINAL_ID,
  STAGE_THIRD_ID,
  STANDINGS_QUERY_KEY,
} from '../util/constants'

const useRound16 = () =>
  useQuery([STANDINGS_QUERY_KEY, 'round16'], () =>
    fetchStandings(STAGE_ROUND_OF_16_ID)
  )
const useQuarter = () =>
  useQuery([STANDINGS_QUERY_KEY, 'quarters'], () =>
    fetchStandings(STAGE_QUARTER_FINAL_ID)
  )
const useSemis = () =>
  useQuery([STANDINGS_QUERY_KEY, 'semis'], () =>
    fetchStandings(STAGE_SEMI_FINAL_ID)
  )
const useFinal = () =>
  useQuery([STANDINGS_QUERY_KEY, 'final'], () => fetchStandings(STAGE_FINAL_ID))
const useThird = () =>
  useQuery([STANDINGS_QUERY_KEY, 'third'], () => fetchStandings(STAGE_THIRD_ID))

export const Knockout = () => {
  const { data: round16Data, isLoading: round16Loading } = useRound16()
  const { data: quarterData, isLoading: quarterLoading } = useQuarter()
  const { data: semiData, isLoading: semiLoading } = useSemis()
  const { data: finalData, isLoading: finalLoading } = useFinal()
  const { data: thirdData, isLoading: thirdLoading } = useThird()

  const loading =
    round16Loading ||
    quarterLoading ||
    semiLoading ||
    finalLoading ||
    thirdLoading

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div>
      <div>{JSON.stringify(round16Data)}</div>
      <div>{JSON.stringify(quarterData)}</div>
      <div>{JSON.stringify(semiData)}</div>
      <div>{JSON.stringify(finalData)}</div>
      <div>{JSON.stringify(thirdData)}</div>
    </div>
  )
}
