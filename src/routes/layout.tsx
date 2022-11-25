import {component$, Slot, useClientEffect$, useContext} from '@builder.io/qwik';
import {globalContext} from "../root";
import ServerHeader from "../components/ServerHeader/ServerHeader";


export default component$(() => {


    const globalStore = useContext(globalContext)

    useClientEffect$(({track}) => {
        track(() => globalStore.isDark)
        document.body.dataset.theme = globalStore.isDark ? 'dark' : 'light'
    })
    return (
        <>
            <main>
                <ServerHeader/>
                <section>
                    <Slot/>
                </section>
            </main>
            <footer>
                <h1>footer</h1>
            </footer>
        </>
    );
});
