import {component$, Resource, useContext, useSignal} from '@builder.io/qwik';
import type {DocumentHead, RequestHandler} from '@builder.io/qwik-city';
import {Link, useEndpoint} from '@builder.io/qwik-city';
import {PrismaClient, Product} from '@prisma/client'
import {globalContext} from "../root";


export const onGet: RequestHandler<Product[]> = async ({...rest}) => {

    const {client} = await import('../../server/db/client')
    //for this reason I am importing a global client
    const products = await client.product.findMany({take: 10})

    return products
};

export default component$(() => {
    //get prisma data on server
    const products = useEndpoint<typeof onGet>()
    const signal = useSignal()

    const globalStore = useContext(globalContext)

    return (
        <div>
            <Link
                href={'/product'}
            >
                gotToProductPage
            </Link>
            <h1>state: {globalStore.count}</h1>
            <button
                onClick$={(e)=>globalStore.count++}
            >incrimentState</button>
            <Resource
                value={products}
                onRejected={(eror)=><div>Error</div>}
                onPending={()=><div>loading</div>}
                onResolved={(prop) => (
                    <>{
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
