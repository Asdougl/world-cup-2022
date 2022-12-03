import { Group } from '../../components/Group'
import { Loader } from '../../components/Loader'
import { useGroupStandingsQuery } from '../../hooks/standings'
import { PageContainer } from '../../layout/PageLayout'
import { groupsIndexRoute } from '.'

const GroupsView = () => {
  const { data } = useGroupStandingsQuery()

  const half = data ? Math.ceil(data.length / 2) : 0

  const left = data ? data.slice(0, half) : []
  const right = data ? data.slice(half) : []

  if (!data) return <Loader />

  return (
    <PageContainer>
      <div className="flex w-full flex-col gap-8 lg:flex-row">
        <div className="flex flex-1 flex-col gap-4">
          {left.map((entry) => (
            <Group key={entry.IdGroup} group={entry} title link />
          ))}
        </div>
        <div className="flex flex-1 flex-col gap-4">
          {right.map((entry) => (
            <Group key={entry.IdGroup} group={entry} title link />
          ))}
        </div>
      </div>
    </PageContainer>
  )
}

export const groupsRoute = groupsIndexRoute.createRoute({
  path: '/',
  component: GroupsView,
})
