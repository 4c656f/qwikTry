import {component$, useContext, useResource$} from "@builder.io/qwik";
import {globalContext} from "../../root";


export default component$(() => {


    const globalStore = useContext(globalContext)


    const productResource = useResource$<any>(() => {
        console.log('resource')
    })


    return (
        <div>
            <h1>store: {globalStore.count}</h1>
            <button
                onClick$={()=>globalStore.count++}
            >incriment</button>
        </div>
    )
})