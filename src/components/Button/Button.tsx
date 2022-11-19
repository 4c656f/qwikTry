import { component$, useStylesScoped$ } from '@builder.io/qwik';

import styles from './button.scss?inline';





export default component$(()=>{

    useStylesScoped$(styles);

    return(
        <button
            class={'container'}
        >
            someBtn
        </button>
    )
})