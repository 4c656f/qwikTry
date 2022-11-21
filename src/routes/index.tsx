import {component$, Resource, useClientEffect$, useContext, useResource$, useSignal} from '@builder.io/qwik';
import type {DocumentHead, RequestHandler} from '@builder.io/qwik-city';
import {Link, useEndpoint} from '@builder.io/qwik-city';
import {Product} from '@prisma/client'
import {globalContext} from "../root";
import {isServer} from "@builder.io/qwik/build";

import { trpc } from "~/client/trpc";
import Button from "../components/Button/Button";
import ArrowIcon from "../components/icons/Arrow";
import {prisma} from "../server/db/client";


export default component$(() => {


    const resource = useResource$<Product[]|undefined>(async ()=>{
        console.log('resource')
        if(isServer){
            return await prisma.product.findMany()
        }
        return await trpc.product.getProducts.query({})
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
            <Button
                onClick$={() => {
                    globalStore.isDark = !globalStore.isDark
                }}
                type={'link'}
            >
                toggleTheme
                <ArrowIcon
                    q:slot={'icon'}
                />
            </Button>
            <Resource
                value={resource}
                onRejected={(eror) => <h1>{eror}</h1>}
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
