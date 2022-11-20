import {component$, PropFunction, Slot, useStyles$, useStylesScoped$} from '@builder.io/qwik';

import styles from './button.scss?inline';
import {ButtonType} from "../../../types/IElementType";
import {IElementsSize} from "../../../types/IElementsSize";
import {IColorIndex} from "../../../types/IColorIndex";


type ButtonProps = {
    onClick$?: PropFunction<() => void>;
    type?: ButtonType;
    size?: IElementsSize;
    colorIndex?: IColorIndex;
}


export default component$((props: ButtonProps) => {

    const {
        onClick$,
        type = 'contained',
        size = 'medium',
        colorIndex = '0'
    } = props


    useStyles$(styles);

    const classes = [
        'container',
        type,
        size,
        `color_${colorIndex}_index`
    ]

    return (
        <button
            onClick$={onClick$}
            class={classes.join(' ')}
        >
            <Slot/>
            <div
                class={'icon'}
            >
                <Slot
                    name={'icon'}
                />
            </div>
        </button>
    )
})