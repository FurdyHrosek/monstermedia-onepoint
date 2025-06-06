import { readServerData } from '~/utils/readServerData';
import heroData from '~/server/data/hero.json';

export default defineEventHandler(async (event) => {
    if (event.method === 'GET') {
        return await readServerData(event, heroData);
    }

    return {
        message: 'Invalid hero banners request!',
    };
});
