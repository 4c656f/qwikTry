import {RequestHandler} from "@builder.io/qwik-city";
import type {Product} from "@prisma/client";


export const onGet: RequestHandler<Product[]> = async ({}) => {

    const {prisma} = await import('../../../server/db/client')

    const products = prisma.product.findMany()

    return products
}