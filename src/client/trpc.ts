import {createTRPCProxyClient, httpLink} from '@trpc/client';
import superjson from 'superjson';
import type {AppRouter} from '../server/trpc/router';

export const trpc = createTRPCProxyClient<AppRouter>({
    transformer: superjson,
    links: [httpLink({url: '/api/trpc'})],
});
