import { component$, useStyles$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import { $translate as t, displayName as dn, useSpeakConfig, useSpeakLocale } from 'qwik-speak';

import styles from './change-locale.css?inline';
import { useAnchorHref } from "~/components/anchor.hooks";

export const ChangeLocale = component$(() => {
    useStyles$(styles);
    const getPath$ = useAnchorHref();
    const loc = useLocation();
    const locale = useSpeakLocale();
    const config = useSpeakConfig();


    return (
        <div class="change-locale">
            <h2>{t('app.changeLocale')}</h2>
            <div class="names">
                {config.supportedLocales.map(value => (
                    <a key={value.lang} href={getPath$(loc.url.pathname, { targetLang: value.lang })}>
                        <button class={{ active: value.lang == locale.lang }}>
                            {dn(value.lang, { type: 'language' })}
                        </button>
                    </a>
                ))}
            </div>
        </div>
    );
});
