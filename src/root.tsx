import {
    component$,
    createContext,
    useClientEffect$,
    useContextProvider,
    useStore,
    useStyles$,
    useWatch$
} from '@builder.io/qwik';
import {QwikCity, RouterOutlet, ServiceWorkerRegister} from '@builder.io/qwik-city';
import {RouterHead} from './components/router-head/router-head';

import globalStyles from './global.scss?inline';
import {getBody} from "@trpc/client/dist/links/internals/httpUtils";

type globalStore = {
    count: number;
    isDark:boolean;
}

export const globalContext = createContext<globalStore>('globalContext')

export default component$(() => {

    const globalStore = useStore<globalStore>({
        count: 0,
        isDark: true
    })

    useStyles$(globalStyles);



    useContextProvider(globalContext, globalStore)
    return (
        <QwikCity>
            <head>
                <meta charSet="utf-8"/>
                <link rel="manifest" href="/manifest.json"/>
                <RouterHead/>
            </head>
            <body
                lang="en"
            >
            <RouterOutlet/>
            <ServiceWorkerRegister/>
            </body>
        </QwikCity>
    );
});
