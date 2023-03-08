import {
	ApolloClient,
	ApolloLink,
	InMemoryCache,
	NormalizedCacheObject,
} from '@apollo/client';
import { onError } from '@apollo/link-error';
import { getDataFromTree } from '@apollo/client/react/ssr';
import { createUploadLink } from 'apollo-upload-client';
import withApollo from 'next-with-apollo';
import { endpoint, prodEndpoint } from '../config';
import { IncomingHttpHeaders } from 'http';

type InitialState = NormalizedCacheObject | undefined;

interface IInitializeApollo {
	headers?: IncomingHttpHeaders | null;
	initialState?: InitialState | null;
}

function createClient({ headers, initialState }: IInitializeApollo) {
	const enhancedFetch = (url: RequestInfo, init: RequestInit) => {
		return fetch(url, {
			...init,
			headers: {
				...init.headers,
				'Access-Control-Allow-Origin': '*',
				// here we pass the cookie along for each request
				Cookie: headers?.cookie ?? '',
			},
		}).then((response) => response);
	};

	return new ApolloClient({
		link: ApolloLink.from([
			onError(({ graphQLErrors, networkError }) => {
				if (graphQLErrors)
					graphQLErrors.forEach(({ message, locations, path }) =>
						console.log(
							`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
						),
					);
				if (networkError)
					console.log(
						`[Network error]: ${networkError}. Backend is unreachable. Is it running?`,
					);
			}),
			// this uses apollo-link-http under the hood, so all the options here come from that package
			createUploadLink({
				uri: 'http://localhost:3002/api/graphql',
				// Make sure that CORS and cookies work
				fetchOptions: {
					// mode: 'cors',
					credentials: 'include',
				},
				credentials: 'include',
				fetch: enhancedFetch,
			}),
		]),
		cache: new InMemoryCache({
			typePolicies: {
				Query: {
					fields: {
						// TODO: We will add this together!
						// allProducts: paginationField(),
					},
				},
			},
		}).restore(initialState || {}),
	});
}

export default withApollo(createClient, { getDataFromTree });
