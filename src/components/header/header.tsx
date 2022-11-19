import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { QwikLogo } from '../icons/qwik';
import styles from './header.scss?inline';

export default component$(() => {
  useStylesScoped$(styles);

  return (
    <header>
      <div class="container">
        <a href="https://qwik.builder.io/" target="_blank">
          <h1>Logo</h1>
        </a>
      </div>
    </header>
  );
});
