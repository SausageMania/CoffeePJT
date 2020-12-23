import React, {useEffect, useState} from 'react';
import App from './App';
import {ApolloClient, ApolloLink} from 'apollo-boost';
import {onError} from 'apollo-link-error';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {createHttpLink} from 'apollo-link-http';
import {ApolloProvider} from '@apollo/react-hooks';
import {ThemeProvider} from 'react-jss';
import Theme from 'resources/theme';
import {CookiesProvider, useCookies} from 'react-cookie';
import {setContext} from '@apollo/client/link/context';

import './index.css';
import {useAuthToken} from "./auth/authToken";
import {LOCAL_STORAGE_TEMPLATE} from "enumerations";

const httpLink = createHttpLink({
    uri: 'http://localhost:4000/graphql'
});

const authMiddleware = (authToken) =>
    new ApolloLink((operation, forward) => {
        // add the authorization to the headers
        if (authToken) {
            operation.setContext({
                headers: {
                    authorization: `Bearer ${authToken}`,
                },
            });
        }

        return forward(operation);
    });


const authLink = setContext((_, {headers}) => {
    const token = localStorage.getItem('myData');

    return {
        headers: {
            ...headers,
            Authorization: token ? `${token}` : "",
        }
    }
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

export default (
    <ThemeProvider theme={Theme}>
        <ApolloProvider client={client}>
            <CookiesProvider>
                <App/>
            </CookiesProvider>
        </ApolloProvider>
    </ThemeProvider>
);