import { readServerData } from '~/utils/readServerData';
import productsData from '~/server/data/products.json';

export default defineEventHandler(async (event) => {
    if (event.method === 'GET') {
        return await readServerData(event, productsData);
    }

    return {
        message: 'Invalid hero banners request!',
    };
});
