// src/client/trpc.ts
import {createTRPCProxyClient, httpLink, loggerLink} from "@trpc/client";
import type {AppRouter} from "../server/trpc/router";
import superjson from "superjson";

export const trpc = createTRPCProxyClient<AppRouter>({
    transformer: superjson,
    links: [
        httpLink({
            url: "/api/trpc",
        }),
        loggerLink({
            enabled: (opts) => process.env.NODE_ENV === "development" || (opts.direction === "down" && opts.result instanceof Error),
        }),
    ],
});
