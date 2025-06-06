import { getHeader, getQuery } from 'h3';

export async function readServerData(event: any, dataByLocale: Record<string, any>) {
    const query = getQuery(event);
    const locale =
        (query?.locale as string)
        || getHeader(event, 'accept-language')?.split(',')[0]?.split('-')[0]
        || 'en';

    return dataByLocale[locale] || dataByLocale['en'];
}
