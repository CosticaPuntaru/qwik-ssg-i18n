import { speakConfig } from "~/speak-config";

import { component$, useSignal } from '@builder.io/qwik';
import type { DocumentHead, StaticGenerateHandler } from '@builder.io/qwik-city';
import {
    $plural as p,
    $translate as t,
    formatDate as fd,
    formatNumber as fn,
    relativeTime as rt,
    Speak,
    useSpeakLocale
} from 'qwik-speak';

export const onStaticGenerate: StaticGenerateHandler = async () => {
    const r = {
        params: speakConfig.supportedLocales
            .filter((locale) => locale.lang !== speakConfig.defaultLocale.lang)
            .map(locale => ({
                lang: locale.lang,
            })).concat([{
                lang: '',
            }]),
    }
    return r;
};

export const Home = component$(() => {
    const locale = useSpeakLocale();
    const units = locale.units!;

    const count = useSignal(0);

    return (
        <div class="content">
            <h1>{t('app.title')}</h1>
            <h2>{t('app.subtitle')}</h2>

            <h3>{t('home.params')}</h3>
            <p>{t('home.greeting', { name: 'Qwik Speak' })}</p>

            <h3>{t('home.tags')}</h3>
            <p dangerouslySetInnerHTML={t('home.text')}></p>

            <h3>{t('home.plural')}</h3>
            <p class="counter">{p(count.value, 'home.devs')}</p>
            <button class="btn-counter" onClick$={() => count.value++}>{t('home.increment')}</button>

            <h3>{t('home.dates')}</h3>
            <p>{fd(Date.now(), { dateStyle: 'full', timeStyle: 'short' })}</p>
            <p>{rt(-1, 'second')}</p>

            <h3>{t('home.numbers')}</h3>
            <p>{fn(1000000)}</p>
            <p>{fn(1000000, { style: 'currency' })}</p>
            <p>{fn(1, { style: 'unit', unit: units['length'] })}</p>
        </div>
    );
});

export default component$(() => {
    return (
        /**
         * Add Home translations (only available in child components)
         */
        <Speak assets={['home']}>
            <Home/>
        </Speak>
    );
});

export const head: DocumentHead = {
    title: 'runtime.head.home.title',
    meta: [{ name: 'description', content: 'runtime.head.home.description' }]
};
