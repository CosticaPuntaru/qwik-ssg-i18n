import { useSpeakConfig, useSpeakLocale } from "qwik-speak";
import { useLocation } from "@builder.io/qwik-city";

export const useAnchorHref = () => {
    const locale = useSpeakLocale();
    const config = useSpeakConfig();
    const location = useLocation();

    return (url: string, { targetLang = locale.lang, baseHref = location.url.origin }) => {
        const link = new URL(url, baseHref);
        if (link.origin !== location.url.origin || targetLang === config.defaultLocale.lang) {
            if (config.supportedLocales.find(l => l.lang === url.split('/')[1])) {
                return url.replace(`/${url.split('/')[1]}`, ``);
            }
            return url;
        }
        link.pathname = `/${targetLang}${link.pathname}`;
        return link.toString();
    }
}