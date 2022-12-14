import type { Group } from '../types/group'

export const parsePlaceholder = (
  placeholder: string,
  groupMap?: Record<string, Group>
) => {
  const match = placeholder.match(/(1|2)([A-Z])/)
  if (match) {
    const [, place = '', group = ''] = match

    const message = `${place === '1' ? '1st' : '2nd'} Group ${group}`

    if (groupMap) {
      const key = `Group ${group.toUpperCase()}`

      const groupData = groupMap[key]

      if (groupData) {
        const team = groupData.teams[parseInt(place) - 1]

        return team ? (
          <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
            <span>{message}</span>
            <span className="text-sm opacity-70">
              currently {team.Team.ShortClubName}
            </span>
          </div>
        ) : (
          message
        )
      }
    }

    return message
  }
  return placeholder
}
