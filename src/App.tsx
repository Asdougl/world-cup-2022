import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {
  RouterProvider,
  Outlet,
  createRouteConfig,
  createReactRouter,
} from '@tanstack/react-router'
import { GroupsView } from './views/GroupsView'
import { KnockoutView } from './views/KnockoutView'
import { MatchView } from './views/MatchView'

const rootRouter = createRouteConfig()

const indexRoute = rootRouter.createRoute({
  path: '/',
  component: GroupsView,
})

const matchesRoute = rootRouter.createRoute({
  path: '/matches',
  component: MatchView,
})

const knockoutRoute = rootRouter.createRoute({
  path: '/knockout',
  component: KnockoutView,
})

const routeConfig = rootRouter.addChildren([
  indexRoute,
  matchesRoute,
  knockoutRoute,
])

export const router = createReactRouter({ routeConfig })

function App() {
  return (
    <>
      <div className="w-full bg-slate-800">
        <div className="container mx-auto px-4 lg:px-0">
          <div className="flex items-center justify-between py-4">
            <div className="text-2xl font-bold text-white">FIFA World Cup</div>
            <div className="flex items-center gap-4">
              <router.Link to="/" className="text-sm font-bold text-white">
                Groups
              </router.Link>
              <router.Link
                to="/matches"
                className="text-sm font-bold text-white"
              >
                Matches
              </router.Link>
              <router.Link
                to="/knockout"
                className="text-sm font-bold text-white"
              >
                Knockout
              </router.Link>
            </div>
          </div>
        </div>
      </div>
      <RouterProvider router={router}>
        <Outlet />
      </RouterProvider>
      <ReactQueryDevtools />
    </>
  )
}

export default App
