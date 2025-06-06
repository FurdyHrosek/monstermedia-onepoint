export const useBannersStore = defineStore('banners', () => {
    const { locale } = useI18n();

    const heroBanners = ref<HeroBanner[]>([]);
    const lastBannersLocale = ref<string | null>(null);;

    const getHeroBanners = async () => {
        if (heroBanners.value.length > 0 && lastBannersLocale.value === locale.value) return heroBanners.value;
        const data = await $fetch('/api/hero', { params: { locale: locale.value } })

        heroBanners.value = data;
        lastBannersLocale.value = locale.value;

        return data;
    }

    return {
        heroBanners,
        getHeroBanners
    };
});