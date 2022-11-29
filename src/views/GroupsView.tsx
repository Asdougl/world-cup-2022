import { Group } from '../components/Group'
import { useGroupStandingsQuery } from '../hooks/standings'

export const GroupsView = () => {
  const { data, isLoading } = useGroupStandingsQuery()

  const half = data ? Math.ceil(data.length / 2) : 0

  const left = data ? data.slice(0, half) : []
  const right = data ? data.slice(half) : []

  return (
    <div className="container mx-auto px-4 pt-8 lg:px-0">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex w-full flex-col gap-8 lg:flex-row">
          <div className="flex flex-1 flex-col gap-4">
            {left.map((entry) => (
              <Group key={entry.IdGroup} group={entry} />
            ))}
          </div>
          <div className="flex flex-1 flex-col gap-4">
            {right.map((entry) => (
              <Group key={entry.IdGroup} group={entry} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
