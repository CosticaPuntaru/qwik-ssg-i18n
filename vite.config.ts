import { defineConfig } from 'vite';
import { qwikVite } from '@builder.io/qwik/optimizer';
import { qwikCity } from '@builder.io/qwik-city/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { qwikSpeakInline } from "qwik-speak/inline";
import { speakConfig } from "./src/speak-config";

export default defineConfig(() => {
    return {
        build: {
            minify: false // To inspect production files
        },
        plugins: [
            qwikCity(),
            qwikVite(),
            qwikSpeakInline({
                supportedLangs: speakConfig.supportedLocales.map((locale) => locale.lang),
                defaultLang: speakConfig.defaultLocale.lang,
                assetsPath: 'i18n'
            }),
            tsconfigPaths()
        ],
        preview: {
            headers: {
                'Cache-Control': 'public, max-age=600',
            },
        },
        test: {
            include: ['./src/**']
        },
    };
});
