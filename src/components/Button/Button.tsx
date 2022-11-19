import {component$, useStylesScoped$} from '@builder.io/qwik';

import styles from './button.scss?inline';


type ButtonProps = {
    onClick: () => void
}


export default component$((props: ButtonProps) => {

    const {
        onClick,
    } = props
    useStylesScoped$(styles);

    return (
        <button
            onClick$={onClick}
            class={'container'}
        >
            someBtn
        </button>
    )
})