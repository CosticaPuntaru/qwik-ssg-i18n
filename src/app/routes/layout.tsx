import { component$, Slot } from '@builder.io/qwik';
import { RequestHandler } from '@builder.io/qwik-city';

import { Header } from '../components/header/header';
import { config } from '../speak-config';

export default component$(() => {
  return (
    <>
      <Header />
      <main>
        <Slot />
      </main>
    </>
  );
});

// E.g. Redirect if the language is different from the default language
export const onGet: RequestHandler = ({ request, response, params }) => {
  let lang = params.lang;

  if (!lang) {
    const cookie = request.headers?.get('cookie');
    const acceptLanguage = request.headers?.get('accept-language');

    // Try whether the language is stored in a cookie
    if (cookie) {
      const result = new RegExp('(?:^|; )' + encodeURIComponent('locale') + '=([^;]*)').exec(cookie);
      if (result) {
        lang = JSON.parse(result[1])['lang'];
      }
    }
    // Try to use user language
    if (!lang) {
      if (acceptLanguage) {
        lang = acceptLanguage.split(';')[0]?.split(',')[0];
      }
    }
    // Use default language
    if (!lang) {
      lang = config.defaultLocale.lang;
    }

    if (lang !== config.defaultLocale.lang) {
      const locale = config.supportedLocales.find(x => x.lang == lang);
      if (locale) {
        const url = new URL(request.url);
        throw response.redirect(`/${lang}${url.pathname.replace(/\/$/, '')}`, 302);
      }
    }
  }
};
