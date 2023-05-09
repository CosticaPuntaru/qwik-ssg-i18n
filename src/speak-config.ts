import type { SpeakConfig } from 'qwik-speak';

/**
 * Speak config
 */
export const speakConfig: SpeakConfig = {
    defaultLocale: { lang: 'en', currency: 'USD', timeZone: 'America/Los_Angeles', units: { 'length': 'mile' } },
    supportedLocales: [
        { lang: 'en', currency: 'USD', timeZone: 'America/Los_Angeles', units: { 'length': 'mile' } },
        { lang: 'ro', currency: 'RON', timeZone: 'Europe/Bucharest', units: { 'length': 'kilometer' } }
    ],
    assets: [
        'app' // Translations shared by the pages
    ],
    runtimeAssets: [
        'runtime' // Translations with dynamic keys or parameters
    ]
};
