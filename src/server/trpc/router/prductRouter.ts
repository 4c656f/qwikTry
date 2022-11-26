import {z} from 'zod';
import {t} from '../trpc';

export const prductRouter = t.router({
    list: t.procedure.input(z.string()).query(
        async ({ctx, input}) => {
            const {prisma} = await import('../../prisma')
            const list = await prisma.product.findMany({
                include: {
                    productType: {
                        include: {
                            category: true
                        }
                    },
                    image: true
                },
            })
            return list
        }
    ),
    getCategories: t.procedure.input(z.string().nullable()).query(
        async ({ctx, input}) => {
            const {prisma} = await import('../../prisma')
            const categories = await prisma.category.findMany({
                include: {
                    productTypes: true
                }
            })
            return categories
        }
    )
});
