import CustomImage from "../CustomImage/CustomImage";
import type {Prisma} from '@prisma/client'
import styles from "./productCart.scss?inline"
import {component$, useStylesScoped$} from "@builder.io/qwik";
import Button from "~/components/ui/Button/Button";
import {Link} from "@builder.io/qwik-city";


type ProductCardProps = {
    product: Prisma.ProductGetPayload<{
        include: {
            image: true;
            productType: {
                include: {
                    category: true
                }
            }
        }
    }>;
    handleCartMutation?: (objID: string) => void

}

export default component$((props: ProductCardProps) => {

    const {
        product: {
            id: productId,
            name,
            link,
            price,
            productType,
            image
        },
        handleCartMutation
    } = props


    useStylesScoped$(styles)

    return (
        <div
            className={'container'}
        >


            {image.map((value, index) => {
                return (
                    <Link
                        key={value.id}
                        style={{width: '100%'}}
                        href={`/product/${link}`}
                    >
                        <div
                            className={'image_container'}
                        >
                            <CustomImage

                                src={`/productpics/${value.src}`}
                                width={224}
                                height={160}
                                alt={`${name} picture`}


                            />
                        </div>
                    </Link>
                )

            })}
            <h1
                class={'name'}
            >{name}</h1>
            <h1>{price}</h1>
            {/*<NestedLink>*/}
            {/*    <Link*/}
            {/*        href={`/categories/${productType?.category?.name}`}*/}
            {/*        class={'link'}*/}

            {/*    >{productType?.category?.name}</Link>*/}
            {/*    <Link*/}
            {/*        href={`/products/${productType?.name}`}*/}
            {/*        class={'link'}*/}

            {/*    >{productType?.name}</Link>*/}

            {/*</NestedLink>*/}
            <Button

                size={'medium'}
                type={'contained'}
                // onClick={()=>handleCartMutation&&handleCartMutation(productId)}
            ><span>add to cart</span></Button>
        </div>
    );
})

export const ProductCardPlaceholder = component$(() => {
    return (
        <>
            {Array.from(Array(10).keys()).map(value => {
                return (
                    <div
                        key={value}
                        class={'container'}
                    >

                        <div
                            class={'sceleton_image'}
                        >
                        </div>
                        <div
                            class={'sceleton_property'}
                        ></div>
                        <div
                            class={'sceleton_property'}
                        ></div>
                    </div>
                )
            })
            }
        </>
    )
})
