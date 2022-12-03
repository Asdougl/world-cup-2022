import classNames from 'classnames'
import type { FC, PropsWithChildren } from 'react'
import { Header } from './Header'

export const PageLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  )
}

export const PageContainer: FC<PropsWithChildren<{ className?: string }>> = ({
  children,
  className,
}) => {
  return (
    <div
      className={classNames(
        'container mx-auto px-4 pt-8 pb-16 lg:px-0',
        className
      )}
    >
      {children}
    </div>
  )
}
