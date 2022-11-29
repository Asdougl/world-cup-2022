import type { Group as iGroup } from '../types/group'
import { pictureUrl } from '../util/picture'

interface GroupProps {
  group: iGroup
}

export const Group = ({ group }: GroupProps) => {
  return (
    <div className="w-full">
      <h2 className="text-lg font-bold">{group.Name}</h2>
      <table className="w-full">
        <thead className="text-left text-sm">
          <tr className="">
            <th className="">Team</th>
            <th className="w-[5.5%]">MP</th>
            <th className="w-[5.5%]">W</th>
            <th className="w-[5.5%]">D</th>
            <th className="w-[5.5%]">L</th>
            <th className="w-[5.5%]">GF</th>
            <th className="w-[5.5%]">GA</th>
            <th className="w-[5.5%]">GD</th>
            <th className="w-[5.5%]">Pts</th>
          </tr>
        </thead>
        <tbody>
          {group.teams.map((standing, index) => (
            <tr key={standing.IdTeam}>
              <td className="flex items-center gap-1">
                <div>{index + 1}.</div>
                <div>
                  <img
                    className="h-3 rounded-sm"
                    src={pictureUrl(standing.Team.PictureUrl, 1)}
                  />
                </div>
                <div className="ml-2">{standing.Team.ShortClubName}</div>
              </td>
              <td className="text-center">{standing.Played}</td>
              <td className="text-center">{standing.Won}</td>
              <td className="text-center">{standing.Drawn}</td>
              <td className="text-center">{standing.Lost}</td>
              <td className="text-center">{standing.For}</td>
              <td className="text-center">{standing.Against}</td>
              <td className="text-center">{standing.GoalsDiference}</td>
              <td className="text-center">{standing.Points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
