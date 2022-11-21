import React, {FC, ReactElement} from 'react';
import styles from './HeaderSection.scss?inline'
import {
    component$,
    FunctionComponent,
    JSXNode,
    QwikIntrinsicElements,
    QwikJSX,
    Slot,
    useStylesScoped$
} from "@builder.io/qwik";




export type HeaderSectionProps = {

}


export default component$((props: HeaderSectionProps) => {

        const {
        } = props

        useStylesScoped$(styles)

        return (
            <menu
                class={'container'}
            >
                <div
                    className={'main_title'}
                >
                    <Slot name={'title'}/>
                </div>

                <div
                    className={'elements_container'}
                >
                    <Slot/>
                </div>
            </menu>
        );
    })

