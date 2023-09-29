import React from "react"
import { ApolloClient, InMemoryCache } from '@apollo/client'

export default () => {
  const client = new ApolloClient({
    uri: 'http://localhost:3000/graphql',
    cache: new InMemoryCache(),
  })

  return (
    <div>Content will come here</div>
  )
}
