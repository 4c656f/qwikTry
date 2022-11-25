import {component$, useContext} from "@builder.io/qwik";
import ReactMarkdown from "react-markdown";
import {globalContext} from "../../root";
import {qwikify$} from "@builder.io/qwik-react";
import {FC} from "react";


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