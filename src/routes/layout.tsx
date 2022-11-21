import {component$, Resource, Slot, useClientEffect$, useContext, useResource$} from '@builder.io/qwik';
import Header from '../components/header/header';
import {globalContext} from "../root";
import HeaderItem from "../components/HeaderItem/HeaderItem";
import HeaderSection from "../components/HeaderSection/HeaderSection";
import {Link} from "@builder.io/qwik-city";
import {isServer} from "@builder.io/qwik/build";
import HeaderSectionElement from "../components/HeaderSectionElement/HeaderSectionElement";
import Button from "../components/Button/Button";
import ArrowIcon from "../components/icons/Arrow";


export default component$(() => {


    const globalStore = useContext(globalContext)

    useClientEffect$(({track}) => {
        track(() => globalStore.isDark)
        document.body.dataset.theme = globalStore.isDark ? 'dark' : 'light'
    })

    const categoriesResource = useResource$(async () => {
        if (isServer) {
            const {prisma} = await import('../server/db/client')
            const categories = await prisma.category.findMany({
                include: {
                    productTypes: true
                }
            })
            return categories
        }
        console.log('headerResource')
    })

    return (
        <>
            <main>
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
                </Header>
                <section>
                    <Slot/>
                </section>
            </main>
            <footer>
                <h1>footer</h1>
            </footer>
        </>
    );
});
