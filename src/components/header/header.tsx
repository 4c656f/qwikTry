import {component$, useStylesScoped$} from '@builder.io/qwik';
import styles from './header.scss?inline';
import {Link} from "@builder.io/qwik-city";

export default component$(() => {


    useStylesScoped$(styles);

    return (
        <header>
            <div class="container">
                <Link href="/">
                    logo
                </Link>
            </div>
        </header>
    );
});
