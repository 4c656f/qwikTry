import {component$, Resource, useContext, useResource$, useSignal} from '@builder.io/qwik';
import type {DocumentHead, RequestHandler} from '@builder.io/qwik-city';
import {Link, useEndpoint} from '@builder.io/qwik-city';
import {Product} from '@prisma/client'
import {globalContext} from "../root";
import {isServer} from "@builder.io/qwik/build";
import axios from "axios";


export const onGet: RequestHandler<Product[]> = async ({params}) => {
    const {client} = await import('../../utils/db/client')

    const products = await client.product.findMany()

    return products
};

export default component$(() => {


    const products = useEndpoint<typeof onGet>()
    const resource = useResource$<Product[]|undefined>(async ()=>{
        if(isServer){
            return products.promise
        }
        const data = await axios.get<Product[]>('/api/product')
        return data.data
    })

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
                onClick$={(e) => globalStore.count++}
            >incrimentState
            </button>
            <Resource
                value={resource}
                onRejected={(eror) => <div>Error</div>}
                onPending={() => <div>loading</div>}
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
