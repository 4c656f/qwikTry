// src/client/trpc.ts
import { loggerLink, createTRPCProxyClient, httpLink } from "@trpc/client";
import type { AppRouter } from "../server/trpc/router";
import superjson from "superjson";

export const trpc = createTRPCProxyClient<AppRouter>({
    transformer: superjson,
    links: [
        httpLink({
            url: "/api/trpc",
        }),
    ],
});
