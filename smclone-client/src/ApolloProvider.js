import React from 'react'
import App from './App'
import { ApolloClient, InMemoryCache, HttpLink, ApolloProvider } from '@apollo/client'
import { setContext } from "@apollo/client/link/context";

const httpLink = new HttpLink({
    uri: 'http://localhost:4000'
})

const authLink = setContext(() => {
    const token = localStorage.getItem('token');
    return{
        headers: {
            Authorization: token ? `Bearer ${token}` : ''
        }
    }
})

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
})

export default (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
)