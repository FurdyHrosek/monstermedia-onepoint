<script lang="ts" setup>
    import type { Swiper } from 'swiper'
    import type { SwiperOptions } from 'swiper/types';

    import SVGZoom from '@/assets/svg/icons/zoom.svg';

    const { locale } = useI18n();
    const { selectedCurrency } = useCurrency();
    const { setPopups, togglePopup } = usePopup();

	const popups = setPopups('productImage'); 
    const isClient = ref(false);

    ////////
    /// HERO

    const heroBannersStore = useBannersStore();
    const { heroBanners } = storeToRefs(heroBannersStore);
    const { getHeroBanners } = heroBannersStore;

    const heroContainer = ref<HeroBanner[] | null>(null)
    const swiperContainer = ref<Swiper | null>(null)
    const swiperOptions: SwiperOptions = {
        slidesPerView: 1,
        loop: true,
        speed: 300,
        autoplay: {
            delay: 9000,
            disableOnInteraction: false,
        },
        pagination: {
            clickable: true,
        },
    };

    await useAsyncData('heroBanners', () => getHeroBanners());

    ////////////
    /// PRODUCTS

    const zoomImageSrc = ref<string>('');

    const productsStore = useProductsStore();
    const { products } = storeToRefs(productsStore);
    const { getProducts } = productsStore;

    await useAsyncData('products', () => getProducts());

    
    onMounted(() => {
        isClient.value = true;
    });

</script>

<template>
    <ClientOnly>
        <Teleport to="#teleports">
            <LayoutPopup type="fullscreen" :visible="popups.productImage" @update:visible="togglePopup('productImage', $event)">
                <NuxtImg  
                    :src="zoomImageSrc" 
                    class="
                        zoom-image absolute z-[41] w-full md:max-w-[50vw] h-full md:max-h-[90vh]
                        top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                        fade-in fade-out_target object-contain
                    " 
                />
            </LayoutPopup>
		</Teleport>
	</ClientOnly>

    <section id="hero" class="h-[400px]">
        <div v-if="!isClient" class="relative h-[400px] w-full bg-gray-300 rounded">
            <NuxtImg  
                v-if="heroBanners && heroBanners.length"
                :src="heroBanners[0].imageURL" 
                alt="Hero image" 
                class="w-full h-[400px] object-cover"
            />
            <h1 
                v-if="heroBanners && heroBanners.length"
                v-html="heroBanners[0].title" class="
                absolute w-full text-center text-white
                top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
            "></h1>
        </div>
        <ClientOnly>
            <swiper-container ref="heroContainer"
                v-if="isClient && heroBanners && heroBanners.length"
                class="h-[400px]"
                :key="locale"
                v-bind="swiperOptions"
                style="
                    --swiper-pagination-color: #0A0A0F;
                    --swiper-pagination-bullet-size: 20px;
                    --swiper-pagination-bottom: 20px;
                    --swiper-pagination-bullet-inactive-color: #0A0A0F80;
                    --swiper-pagination-bullet-inactive-opacity: 0.6;
                    --swiper-pagination-bullet-horizontal-gap: 7px;
                "
            >
                <swiper-slide 
                    v-for="(heroBanner, idx) in heroBanners"
                    :key="heroBanner.id || idx"
                    class="w-full relative"
                >
                    <NuxtLinkLocale to="/" :title="format.stripHTML(heroBanner.title)">
                        <NuxtImg  
                            :src="heroBanner.imageURL" 
                            :alt="format.stripHTML(heroBanner.title)"
                            class="w-full h-[400px] object-cover" 
                        />
                        <h1 v-html="heroBanner.title" class="
                            container absolute !w-full text-center text-white
                            top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                        "></h1>
                    </NuxtLinkLocale>
                </swiper-slide>
            </swiper-container>
        </ClientOnly>
    </section>
    <section id="products" class="container">
        <div class="product flex flex-col md:flex-row flex-wrap justify-center max-w-[871px] mx-auto gap-6"
            v-if="products && products.length"
            v-for="product in products"
        >
            <div class="product-column product-image
                relative
            ">
                <NuxtImg  
                    :src="product.image.default" 
                    :alt="product.name"
                    class="w-full h-[600px] min-h-[566px] object-cover" 
                />
                <SVGZoom class="product-image_zoom"
                    @click="zoomImageSrc = product.image.big, togglePopup('productImage', true)"
                />
            </div>
            <div class="product-column product-data">
                <h2>
                    {{ product.name }}
                </h2>
                <span class="font-default">
                    {{ product.description }}
                </span>
                <h3>
                    {{ product.price[selectedCurrency] }} {{ selectedCurrency.toUpperCase() }}
                </h3>
                <div class="add-to-cart">
                    <UIPrimaryBtn>
                        <span>
                            {{ $t('cart-add') }}
                        </span>
                    </UIPrimaryBtn>
                </div>
            </div>
        </div>
    </section>
</template>