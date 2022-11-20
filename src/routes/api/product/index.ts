import {RequestHandler} from "@builder.io/qwik-city";
import {Product} from "@prisma/client";

export const onGet: RequestHandler<Product[]> = async ({params}) => {
    const {client} = await import('../../../../utils/db/client')

    const products = await client.product.findMany()

    return products
};