import { createReactRouter, createRouteConfig } from '@tanstack/react-router'
import { indexRoute } from './views'
import { groupsIndexRoute } from './views/groups'
import { idGroupRoute } from './views/groups/$idGroup'
import { groupsRoute } from './views/groups/groups'
import { knockoutRoute } from './views/knockout'
import { matchIndexRoute } from './views/matches'
import { idMatchRoute } from './views/matches/$idMatch'
import { matchesRoute } from './views/matches/matches'

const routeConfig = createRouteConfig().addChildren([
  indexRoute,
  groupsIndexRoute.addChildren([groupsRoute, idGroupRoute]),
  matchIndexRoute.addChildren([matchesRoute, idMatchRoute]),
  knockoutRoute,
])

export const router = createReactRouter({ routeConfig })
