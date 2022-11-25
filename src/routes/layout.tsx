import {component$, Resource, Slot, useClientEffect$, useContext, useResource$} from '@builder.io/qwik';
import Header from '../components/ui/header/header';
import {globalContext} from "../root";
import HeaderItem from "../components/ui/HeaderItem/HeaderItem";
import HeaderSection from "../components/ui/HeaderSection/HeaderSection";
import {Link} from "@builder.io/qwik-city";
import {isServer} from "@builder.io/qwik/build";
import HeaderSectionElement from "../components/ui/HeaderSectionElement/HeaderSectionElement";
import Button from "../components/ui/Button/Button";
import ArrowIcon from "../components/ui/icons/Arrow";
import ServerHeader from "../components/ServerHeader/ServerHeader";


export default component$(() => {


    const globalStore = useContext(globalContext)

    useClientEffect$(({track}) => {
        track(() => globalStore.isDark)
        document.body.dataset.theme = globalStore.isDark ? 'dark' : 'light'
    })

    const categoriesResource = useResource$(async () => {
        if (isServer) {
            const {prisma} = await import('~/server/prisma')
            return prisma.category.findMany({
                include:{
                    productTypes: true
                }
            })
        }
        console.log('headerResource')
    })

    return (
        <>
            <main>
                <ServerHeader/>
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
