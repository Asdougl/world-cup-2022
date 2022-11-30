import { faBars, faTimes } from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Menu } from '@headlessui/react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RouterProvider, Outlet } from '@tanstack/react-router'
import classNames from 'classnames'
import { router } from './router'

function App() {
  return (
    <>
      <div className="sticky top-0 z-10 w-full bg-slate-800">
        <div className="container relative mx-auto px-4 lg:px-0">
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
            <Menu as="nav" className="h-full lg:hidden">
              <Menu.Button className="flex h-full items-center gap-4">
                {(props) => (
                  <div className="relative h-8 w-8">
                    <FontAwesomeIcon
                      icon={faBars}
                      size="lg"
                      fixedWidth
                      className={classNames(
                        props.open ? 'rotate-90 opacity-0' : 'opacity-100',
                        'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all'
                      )}
                    />
                    <FontAwesomeIcon
                      icon={faTimes}
                      size="lg"
                      fixedWidth
                      className={classNames(
                        props.open ? 'opacity-100' : 'rotate-90 opacity-0',
                        'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all'
                      )}
                    />
                  </div>
                )}
              </Menu.Button>
              <Menu.Items className="absolute right-0 top-full w-screen border-y border-slate-400 bg-slate-800 shadow-lg">
                <Menu.Item>
                  <router.Link
                    to="/"
                    className="w-full text-lg font-bold text-white hover:text-slate-200 hover:underline"
                  >
                    <div className="px-6 py-3">Home</div>
                  </router.Link>
                </Menu.Item>
                <Menu.Item>
                  <router.Link
                    to="/groups"
                    className="w-full text-lg font-bold text-white hover:text-slate-200 hover:underline"
                  >
                    <div className="px-6 py-3">Groups</div>
                  </router.Link>
                </Menu.Item>
                <Menu.Item>
                  <router.Link
                    to="/matches"
                    className="w-full text-lg font-bold text-white hover:text-slate-200 hover:underline"
                  >
                    <div className="px-6 py-3">Matches</div>
                  </router.Link>
                </Menu.Item>
                <Menu.Item>
                  <router.Link
                    to="/knockout"
                    className="w-full text-lg font-bold text-white hover:text-slate-200 hover:underline"
                  >
                    <div className="px-6 py-3">Knockout</div>
                  </router.Link>
                </Menu.Item>
              </Menu.Items>
            </Menu>
          </div>
        </div>
      </div>
      <div className="pb-16">
        <RouterProvider router={router}>
          <Outlet />
        </RouterProvider>
      </div>
      <ReactQueryDevtools />
    </>
  )
}

export default App
