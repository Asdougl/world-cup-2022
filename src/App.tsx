import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RouterProvider, Outlet } from '@tanstack/react-router'
import { PageLayout } from './layout/PageLayout'
import { router } from './router'

function App() {
  return (
    <>
      <RouterProvider router={router}>
        <PageLayout>
          <Outlet />
        </PageLayout>
      </RouterProvider>
      <ReactQueryDevtools />
    </>
  )
}

export default App
