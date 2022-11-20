import { RequestEvent } from "@builder.io/qwik-city";
import * as trpc from "@trpc/server";





export const createContext = async (ev: RequestEvent) => {
    return {context: 'string'}
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
