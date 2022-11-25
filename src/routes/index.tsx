import {component$, Resource, useResource$, useStylesScoped$} from '@builder.io/qwik';
import type {DocumentHead} from '@builder.io/qwik-city';
import {isServer} from "@builder.io/qwik/build";
import ProductCard from "../components/productCard/ProductCard";
import styles from '../styles/pages/index.scss?inline'


export default component$(() => {


    const resource = useResource$(async () => {
        if (isServer) {
            const {prisma} = await import('~/server/prisma')
            console.log('productResource')
            return prisma.product.findMany({
                include: {
                    productType: {
                        include: {
                            category: true
                        }
                    },
                    image: true
                },
            })
        }
        const {trpc} = await import('../client/trpc')
        return trpc.product.list.query('')
    })

    useStylesScoped$(styles)



    return (
        <div
            class={'product_container'}
        >
            <Resource
                value={resource}
                onRejected={(eror) => <h1>{eror}</h1>}
                onPending={() => <h1>loading</h1>}
                onResolved={(prop) => (
                    <>
                        {
                            prop.map(value => <ProductCard product={value}/>)
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
