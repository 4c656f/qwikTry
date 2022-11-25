import * as trpc from '@trpc/server';
import type {PrismaClient} from "@prisma/client";

export const createContext = async (): Promise<{ prisma: PrismaClient }> => {

    const {PrismaClient} = await import('@prisma/client')

    return {
        prisma: new PrismaClient(),
    };
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
