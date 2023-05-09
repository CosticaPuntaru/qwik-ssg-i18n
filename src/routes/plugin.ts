import type { RequestHandler } from "@builder.io/qwik-city";

import { speakConfig } from '../speak-config';

export const onRequest: RequestHandler = ({ params, locale }) => {
    const lang = params.lang;

    // Set Qwik locale
    locale(lang || speakConfig.defaultLocale.lang);
};
