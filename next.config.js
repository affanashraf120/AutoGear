const locales = ["en", "ru", "ar"];
const defaultLocale = "en";

// noinspection JSUnusedGlobalSymbols
export const env = {
    basePath: process.env.BASE_PATH || "",
    target: "experimental-serverless-trace",
};
export const basePath = process.env.BASE_PATH || "";
export async function rewrites() {
    return [
        ...locales
            .filter((locale) => locale !== defaultLocale)
            .map((locale) => [
                { source: `/${locale}{/}?`, destination: "/" },
                { source: `/${locale}/:path*`, destination: "/:path*" },
            ])
            .reduce((acc, cur) => [...acc, ...cur], []),
    ];
}
export async function redirects() {
    return [
        {
            source: `/${defaultLocale}{/}?`,
            destination: "/",
            permanent: true,
        },
        {
            source: `/${defaultLocale}/:path*`,
            destination: "/:path*",
            permanent: true,
        },
    ];
}
export const target = "experimental-serverless-trace";
