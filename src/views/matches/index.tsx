import { createRouteConfig, Outlet } from '@tanstack/react-router'

const MatchPage = () => {
  return <Outlet />
}

export const matchIndexRoute = createRouteConfig().createRoute({
  path: 'matches',
  component: MatchPage,
})
