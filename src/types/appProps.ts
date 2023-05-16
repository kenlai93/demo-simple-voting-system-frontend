import { NextPage } from 'next'
import { ReactElement, ReactNode } from 'react'

export type AppGetLayout = (page: ReactElement) => ReactNode

export type NextPageWithLayout<Props = {}, InitialProps = Props> = NextPage<Props, InitialProps> & {
  getLayout?: AppGetLayout
}
