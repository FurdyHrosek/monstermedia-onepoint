export const useProductsStore = defineStore('products', () => {
    const { locale } = useI18n();

    const products = ref<Product[]>([]);
    const lastProductsLocale = ref<string | null>(null);;

    const getProducts = async () => {
        if (products.value.length > 0 && lastProductsLocale.value === locale.value) return products.value;
        const data = await $fetch('/api/products', { params: { locale: locale.value } })

        products.value = data;
        lastProductsLocale.value = locale.value;

        return data;
    }

    return {
        products,
        getProducts
    };
});