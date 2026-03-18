import { HttpLink } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client-integration-nextjs';

export default function makeClient() {
    const httpLink = new HttpLink({
        // Use an absolute URL for SSR
        uri: 'https://countries.trevorblades.com/graphql',
        fetchOptions: {
            // Optional: Next.js-specific fetch options
            // Note: This doesn't work with `export const dynamic = "force-static"`
        },
    });

    return new ApolloClient({
        cache: new InMemoryCache(),
        link: httpLink,
    });
}
