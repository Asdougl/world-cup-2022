import { createRouteConfig, Outlet } from '@tanstack/react-router'

const GroupsView = () => {
  return <Outlet />
}

export const groupsIndexRoute = createRouteConfig().createRoute({
  path: 'groups',
  component: GroupsView,
})
