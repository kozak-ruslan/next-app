'use client';

import { ApolloNextAppProvider } from '@apollo/client-integration-nextjs';

import makeClient  from '../lib/apollo/client';

export default function ApolloProvider({ children }: React.PropsWithChildren) {
    return (
        <ApolloNextAppProvider makeClient={makeClient}>
            {children}
        </ApolloNextAppProvider>
    );
}
