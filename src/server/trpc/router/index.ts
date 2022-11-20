import { RequestEvent } from "@builder.io/qwik-city";
import { createContext } from "../context";
import { t } from "../trpc";
import {productRouter} from "./product";

export const router = t.router
export const appRouter = router({
    product: productRouter
});



export const publicProcedure = t.procedure;
export type AppRouter = typeof appRouter;
