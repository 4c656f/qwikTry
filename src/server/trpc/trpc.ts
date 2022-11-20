import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { Context } from "./context";

export const t = initTRPC.context<Context>().create({});
