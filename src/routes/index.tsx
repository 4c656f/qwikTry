import {component$, Resource, useContext, useResource$} from '@builder.io/qwik';
import type {DocumentHead} from '@builder.io/qwik-city';
import {Link} from '@builder.io/qwik-city';
import type {Product} from '@prisma/client'
import {globalContext} from "../root";
import Button from "../components/Button/Button";
import ArrowIcon from "../components/icons/Arrow";
import {isServer} from "@builder.io/qwik/build";


export default component$(() => {


    const resource = useResource$<Product[] | undefined>(async () => {
        if (isServer) {
            console.log('serverResource')
            return undefined
        }
        console.log('clientResource')
        return undefined
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
                onPending={() => <h1>loading</h1>}
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
