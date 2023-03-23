import type { AppProps, AppInitialProps } from 'next/app';
import {
	ApolloProvider,
	ApolloClient,
	NormalizedCacheObject,
} from '@apollo/client';
import withData from '../lib/withData';
import Page from '../components/Page';
export interface IApolloProps extends AppProps {
	apollo?: ApolloClient<NormalizedCacheObject> | any;
}
function App({ Component, pageProps, apollo }: IApolloProps) {
	return (
		<ApolloProvider client={apollo}>
			<Page>
				<Component {...pageProps} />
			</Page>
		</ApolloProvider>
	);
}

// @ts-ignore
App.getInitialProps = async function ({ Component, ctx }) {
	let pageProps: AppInitialProps | any = {};
	if (Component.getInitialProps) {
		pageProps = await Component.getInitialProps(ctx);
	}
	pageProps.query = ctx.query;
	return { pageProps };
};
// @ts-ignore
export default withData(App);
