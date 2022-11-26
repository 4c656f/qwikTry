import {component$, useClientEffect$, useSignal, useStyles$} from '@builder.io/qwik';
import { Remarkable } from 'remarkable';
import styles from "./code.scss?inline"
import hljs from 'highlight.js';
type IndexProps = {

}
export const remark = new Remarkable()

export default component$((props:IndexProps) => {

    const {
        
    } = props

    useStyles$(styles)

    const inputSignal = useSignal('```js\n' +
        'const value = 10\n' +
        '```')

    const markdownHTML = useSignal<string|undefined>('')

    useClientEffect$(({track})=>{
        track(()=>markdownHTML.value)
        document.querySelectorAll('pre code').forEach((el) => {

            hljs.highlightElement(el as HTMLElement);
        });
    })
    useClientEffect$(async ({track, cleanup})=>{
        track(()=>inputSignal.value)

        const html = remark.render(inputSignal.value)


        markdownHTML.value = html
    })

    return (
        <div>
            <textarea
                value={inputSignal.value}
                onInput$={(ev) => {
                    const target = ev.target as HTMLInputElement
                    inputSignal.value = target.value
                }}
            />
            {
                markdownHTML.value?
                    <div dangerouslySetInnerHTML={markdownHTML.value}>

                    </div>:null
            }

        </div>
    );
});
