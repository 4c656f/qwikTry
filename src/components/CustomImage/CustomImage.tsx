import styles from './customImage.scss?inline'
import {component$, useClientEffect$, useSignal, useStylesScoped$} from "@builder.io/qwik";

type CustomImageProps = {
    src: string;
    width: number;
    height: number;
    alt: string;
    className?: string

}

export default component$((props: CustomImageProps) => {

    const {
        src,
        width,
        alt,
        height,
        className,

    } = props

    const url = useSignal<string|undefined>()

    useStylesScoped$(styles)

    useClientEffect$(({track})=>{
        track(()=>src)
        if(!src)return
        const img = new Image()
        img.src = src
        img.onload = () => url.value = src
    })


    return (
        <div
            className={'container'}
        >
            {!url.value ?

                <div
                    className={'placeholder'}
                >

                </div>
                : <img
                    src={url.value}
                    alt={alt}
                    height={height}
                    width={width}
                    className={`image ${className ? className : ""}`}
                    style={{objectFit: 'cover'}}
                />

            }


        </div>
    )})
