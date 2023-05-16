import { ApolloProvider } from '@apollo/client'
import { client } from '@app/services/apolloClient'
import '@app/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { NextPageWithLayout } from '@app/types/appProps'
import type { AppProps } from 'next/app'

import 'dayjs/locale/zh-hk'
import localeData from 'dayjs/plugin/localeData'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import dayjs, { extend } from 'dayjs'
extend(localeData)
extend(localizedFormat)

type AppPropsWithLayout<P = any> = AppProps<P> & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)
  return <ApolloProvider client={client}>{getLayout(<Component {...pageProps} />)}</ApolloProvider>
}
