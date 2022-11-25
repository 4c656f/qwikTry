import * as trpc from '@trpc/server';
import type {PrismaClient} from "@prisma/client";

export const createContext = async () => ({});

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
