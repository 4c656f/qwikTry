import {component$, Resource} from '@builder.io/qwik';
import type {DocumentHead, RequestHandler} from '@builder.io/qwik-city';
import {Link, useEndpoint} from '@builder.io/qwik-city';
import {PrismaClient, Product} from '@prisma/client'
import {client} from "../../server/db/client";

export const onGet: RequestHandler<Product[]> = async ({...rest}) => {
    //when i use local Client it works fine, but it will cause prisma client duplication
    const localClient = new PrismaClient

    //for this reason I am importing a global client
    const products = await client.product.findMany({take: 10})

    return products
};

export default component$(() => {
    //get prisma data on server
    const products = useEndpoint<typeof onGet>()

    return (
        <div>
            <Link
                href={'/product'}
            >
                gotToProductPage
            </Link>
            <Resource
                value={products}
                onPending={()=><div>loading</div>}
                onResolved={(prop) => (
                    //prop: undefined|products
                    <>{
                        //for some reason I don't understand,
                        //the link calls an additional request onGet
                        //and at the same time prop is equal to undefiend
                        prop?.map(value => {
                            return (
                                <h1>{value.name}</h1>
                            )
                        })
                    }
                    </>
                )
                }
            />
        </div>
    );
});

export const head: DocumentHead = {
    title: 'Welcome to Qwik',
    meta: [
        {
            name: 'description',
            content: 'Qwik site description',
        },
    ],
};
