import { getLocaleFromNavigator, init, locale, register } from "svelte-i18n";

register("en", () => import("./en.json"));
register("ja", () => import("./ja.json"));


export async function initializeLocale() {
    init({
        fallbackLocale: "en",
        initialLocale: getLocaleFromNavigator(),
    });
}

export async function setLocale(lang: string) {
    locale.set(lang);
}

export async function setLocaleToBrowser() {
    locale.set(getLocaleFromNavigator());
}
