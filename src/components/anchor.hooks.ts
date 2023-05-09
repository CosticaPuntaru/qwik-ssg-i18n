import { useSpeakConfig, useSpeakLocale } from "qwik-speak";

export const useAnchorHref = () => {
    const locale = useSpeakLocale();
    const config = useSpeakConfig();

    return (url: string, { targetLang = locale.lang, }) => {
        let link = url.replace(/^.*\/\/[^/]+/, '')
        const fragment = url.split('/')[1]
        if (config.supportedLocales.find(l => l.lang === fragment)) {
            link = link.replace(`/${fragment}`, ``);
        }
        if (targetLang === config.defaultLocale.lang) {
            return link;
        }
        return `/${targetLang}${link}`;
    }
}