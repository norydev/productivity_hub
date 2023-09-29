import React from "react"
import { ProductivityHub } from './ProductivityHub'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

export default () => {
  const client = new ApolloClient({
    uri: 'http://localhost:3000/graphql',
    cache: new InMemoryCache(),
  })

  return (
    <ApolloProvider client={client}>
      <ProductivityHub />
    </ApolloProvider>
  )
}
