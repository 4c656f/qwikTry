import { t } from "../trpc";
import { z } from "zod";

export const postsRouter = t.router({
    getPosts: t.procedure.input(z.object({ query: z.string().optional() })).query(async ({ ctx, input }) => {
        const posts = 'string'

        return posts;
    })
});
