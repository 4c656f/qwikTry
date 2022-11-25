import {component$, Resource, useContext, useResource$} from '@builder.io/qwik';
import {isServer} from "@builder.io/qwik/build";
import {Link} from "@builder.io/qwik-city";
import HeaderItem from "../ui/HeaderItem/HeaderItem";
import HeaderSection from "../ui/HeaderSection/HeaderSection";
import HeaderSectionElement from "../ui/HeaderSectionElement/HeaderSectionElement";
import Button from "../ui/Button/Button";
import ArrowIcon from "../ui/icons/Arrow";
import Header from "../ui/header/header";
import {globalContext} from "../../root";

type ServerHeaderProps = {

}

export default component$((props:ServerHeaderProps) => {

    const {

    } = props


    const categoriesResource = useResource$(async () => {
        if (isServer) {
            const {prisma} = await import('~/server/prisma')
            console.log('serverHeaderResource')
            return prisma.category.findMany({
                include:{
                    productTypes: true
                }
            })

        }
        console.log('headerResource')
    })

    const globalStore = useContext(globalContext)
    return (
        <>
            <Header>
                <Link
                    href={'/'}
                    q:slot={'logoSection'}
                ><h1>Logo</h1></Link>
                <HeaderItem
                    q:slot={'mainSection'}
                    title={'Categories'}
                >
                    <HeaderSection

                    >
                        <h1
                            q:slot={'title'}
                        >Categories</h1>

                        <Resource
                            value={categoriesResource}
                            onPending={() => <h1>loading</h1>}
                            onResolved={(value =>
                                (
                                    <>
                                        {
                                            value?.map(category => {
                                                return (
                                                    <HeaderSectionElement
                                                        q:slot={'elements'}
                                                    >
                                                        <Button
                                                            type={'link'}
                                                            q:slot={'title'}
                                                            colorIndex={'1'}
                                                            style={{width: '100%'}}


                                                        >
                                                            <h1>{category.name}</h1>
                                                            <ArrowIcon q:slot={'icon'}/>
                                                        </Button>
                                                        {category.productTypes.map(productType => {
                                                            return (
                                                                <Button
                                                                    type={'link'}
                                                                    q:slot={'title'}
                                                                    colorIndex={'1'}
                                                                    style={{width: '100%'}}
                                                                    size={'small'}
                                                                >
                                                                    <h3>{productType.name}</h3>
                                                                    <ArrowIcon q:slot={'icon'}/>
                                                                </Button>
                                                            )
                                                        })}
                                                    </HeaderSectionElement>
                                                )
                                            })
                                        }
                                    </>
                                ))}
                        />


                    </HeaderSection>

                </HeaderItem>
                <Button
                    onClick$={() => {
                        globalStore.isDark = !globalStore.isDark
                    }}
                    type={'contained'}
                    q:slot={'rightSection'}
                >
                    toggleTheme
                </Button>
            </Header>
        </>
    );
});
