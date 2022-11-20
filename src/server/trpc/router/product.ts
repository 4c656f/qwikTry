import {t} from "../trpc";
import {z} from "zod";
import {prisma} from "../../db/client";

export const productRouter = t.router({
    getProducts: t.procedure
        .input(
            z.object({
                query: z.string().optional()
            }))
        .query(async ({ctx, input}) => {

            const products = prisma.product.findMany({take: 10})

            return products;
        })
});
