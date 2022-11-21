import {component$, useContext} from "@builder.io/qwik";
import {globalContext} from "../../root";


export default component$(() => {


    const globalStore = useContext(globalContext)


    return (
        <div>
            <h1>store: {globalStore.count}</h1>
            <button
                onClick$={() => globalStore.count++}
            >incriment
            </button>
        </div>
    )
})