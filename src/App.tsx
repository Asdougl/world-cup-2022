import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {
  RouterProvider,
  Outlet,
  createRouteConfig,
  createReactRouter,
} from '@tanstack/react-router'
import { GroupsView } from './views/GroupsView'
import { HomeView } from './views/HomeView'
import { KnockoutView } from './views/KnockoutView'
import { MatchView } from './views/MatchView'

const rootRouter = createRouteConfig()

const indexRoute = rootRouter.createRoute({
  path: '/',
  component: HomeView,
})

const groupsRoute = rootRouter.createRoute({
  path: '/groups',
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
  groupsRoute,
  matchesRoute,
  knockoutRoute,
])

export const router = createReactRouter({ routeConfig })

function App() {
  return (
    <>
      <div className="sticky top-0 z-10 w-full bg-slate-800">
        <div className="container mx-auto px-4 lg:px-0">
          <div className="flex items-center justify-between py-4">
            <div className="text-2xl font-bold text-white">FIFA World Cup</div>
            <div className="hidden items-center gap-4 lg:flex">
              <router.Link
                to="/"
                className="text-sm font-bold text-white hover:text-slate-200 hover:underline"
              >
                Home
              </router.Link>
              <router.Link
                to="/groups"
                className="text-sm font-bold text-white hover:text-slate-200 hover:underline"
              >
                Groups
              </router.Link>
              <router.Link
                to="/matches"
                className="text-sm font-bold text-white hover:text-slate-200 hover:underline"
              >
                Matches
              </router.Link>
              <router.Link
                to="/knockout"
                className="text-sm font-bold text-white hover:text-slate-200 hover:underline"
              >
                Knockout
              </router.Link>
            </div>
          </div>
        </div>
      </div>
      <div className="pb-32 lg:pb-16">
        <RouterProvider router={router}>
          <Outlet />
        </RouterProvider>
      </div>
      <div className="fixed bottom-0 grid w-screen grid-cols-4 items-center bg-slate-800 lg:hidden">
        <router.Link
          to="/"
          className="py-4 text-center text-sm font-bold text-white hover:text-slate-200 hover:underline"
        >
          Home
        </router.Link>
        <router.Link
          to="/groups"
          className="py-4 text-center text-sm font-bold text-white hover:text-slate-200 hover:underline"
        >
          Groups
        </router.Link>
        <router.Link
          to="/matches"
          className="py-4 text-center text-sm font-bold text-white hover:text-slate-200 hover:underline"
        >
          Matches
        </router.Link>
        <router.Link
          to="/knockout"
          className="py-4 text-center text-sm font-bold text-white hover:text-slate-200 hover:underline"
        >
          Knockout
        </router.Link>
      </div>
      <ReactQueryDevtools />
    </>
  )
}

export default App
