import axios, { AxiosInstance } from 'axios';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import config from '../config';
import TokenUtil from './TokenUtil';

const httpLink = createHttpLink({
    uri: `${config.API_URL}/graphql`,
    credentials: 'include'
});

const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            authorization: TokenUtil.isEmpty() ? '' : `Bearer ${TokenUtil.get()}`
        }
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

const getAxiosInstance = (): AxiosInstance => {
    const instance = axios.create({
        baseURL: config.API_URL,
        headers: {
            Authorization: `Bearer ${TokenUtil.get()}`
        },
        withCredentials: true
    });

    return instance;
};

const Api = getAxiosInstance();
export const Client = client;

export default Api;
