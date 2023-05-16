import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'
import { createClient } from 'graphql-ws'

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT!,
})
const wsLink = new GraphQLWsLink(
  createClient({
    url: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT!.replace(/^https?/, 'ws'),
  })
)

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
  },
  wsLink,
  httpLink
)
export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
})
