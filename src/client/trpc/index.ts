import {createTRPCProxyClient, httpLink, loggerLink} from "@trpc/client";
import type {inferProcedureInput, inferProcedureOutput} from "@trpc/server";

import {AppRouter} from "../../server/trpc/router";

const url = typeof window === "undefined" ? "/api/trpc" : "http://localhost:5173/api/trpc";

export const TrpcClient = createTRPCProxyClient<AppRouter>({
    links: [
        httpLink({
            url: url,
        }),
    ],

});
type Query = keyof AppRouter["_def"]["queries"];
type Mutation = keyof AppRouter["_def"]["mutations"];

export type InferQueryOutput<RouteKey extends Query> = inferProcedureOutput<AppRouter["_def"]["queries"][RouteKey]>;
export type InferQueryInput<RouteKey extends Query> = inferProcedureInput<AppRouter["_def"]["queries"][RouteKey]>;
export type InferMutationOutput<RouteKey extends Mutation> =
    inferProcedureOutput<AppRouter["_def"]["mutations"][RouteKey]>;
export type InferMutationInput<RouteKey extends Mutation> = inferProcedureInput<AppRouter["_def"]["mutations"][RouteKey]>