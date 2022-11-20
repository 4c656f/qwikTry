import {component$, Slot, useClientEffect$, useContext} from '@builder.io/qwik';
import Header from '../components/header/header';
import {globalContext} from "../root";

export default component$(() => {


    const globalStore = useContext(globalContext)

    useClientEffect$(({track})=>{
        track(()=>globalStore.isDark)
        document.body.dataset.theme = globalStore.isDark ? 'dark' : 'light'
    })

    return (
        <>
            <main>
                <Header/>
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
