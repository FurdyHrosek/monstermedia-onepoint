<script lang="ts" setup>
    import SVGBasket from '@/assets/svg/icons/basket.svg';

    const router = useRouter();
    const { locale } = useI18n()
    const switchLocalePath = useSwitchLocalePath()
    const { selectedCurrency, selectedCurrencyName, setCurrency, setCurrencyName } = useCurrency();

    const { setPopups, togglePopup } = usePopup();
	const popups = setPopups('locale'); 

    const localeMap = {
        cs: {
            code: 'cs',
            lang: 'Čeština',
            currency: 'czk',
            currencyName: 'Česká koruna'
        },
        en: {
            code: 'en',
            lang: 'English',
            currency: 'eur',
            currencyName: 'Euro'
        }
    }
    
    const switchLocale = (langName: string) => {
        const foundEntry = Object.values(localeMap).find(entry => entry.lang === langName);
        if (foundEntry) {
            const path = switchLocalePath(foundEntry.code as SupportedLocale);
            if (path) {
                router.push(path);
            }
        }
    };

    const switchCurrency = (currencyName: string) => {
        const foundEntry = Object.values(localeMap).find(entry => entry.currencyName === currencyName);
        if (foundEntry) {
            setCurrency(foundEntry.currency as CurrencyMap);
            setCurrencyName(foundEntry.currencyName);
        }   
    }
</script>

<template>
    <ClientOnly>
        <Teleport to="#header_controls">
            <LayoutPopup type="bound" :visible="popups.locale" @update:visible="togglePopup('locale', $event)">
                <FormSelect :id="'select_locale'" 
                    :field-title="$t('lang')" 
                    :options="Object.values(localeMap).map(item => item.lang)"
                    :model-value="localeMap[locale].lang"
                    @update:model-value="switchLocale" 
                />
                <FormSelect :id="'select_currency'" 
                    :field-title="$t('currency')" 
                    :options="Object.values(localeMap).map(item => item.currencyName)" 
                    :model-value="selectedCurrencyName"
                    @update:model-value="switchCurrency"
                />
            </LayoutPopup>
		</Teleport>
	</ClientOnly>

    <header id="headerWrap" class="bg-white w-full shadow-sm sticky top-0 z-30 transition-[top] duration-150 delay-100">
        <div class="max-w-[1440px] mx-auto flex items-center justify-between
                py-3 px-5 sm:px-12
            "
        >
            <!-- Left: Name -->
            <div id="header_logo-left" class="text-lg font-bold">
                <NuxtLinkLocale to="/">
                    <NuxtImg src="/img/janKalab.png" alt="Jan Kaláb" class="
                        w-[69.79px] sm:w-[94px] h-auto object-contain" 
                    />
                </NuxtLinkLocale>
            </div>

            <!-- Center: Logo -->
            <div id="header_logo-center" class="flex-shrink-0">
                <NuxtLinkLocale to="/">
                    <NuxtImg src="/img/logo-one-point.png" alt="One Point Logo" class="
                        w-auto h-[52px] sm:h-[72px] object-contain"
                    />
                </NuxtLinkLocale>
            </div>

            <!-- Right: Language + Cart -->
            <div id="header_controls" class="relative flex items-center justify-end space-x-4 font-semibold">
                <span id="header_locale" class="cursor-pointer hover:text-[var(--clr-accent)]" @click="togglePopup('locale', !popups.locale)">
                    {{ locale.toUpperCase() }}/{{ selectedCurrency.toUpperCase() }}
                </span>
                <div class="mr-0 pr-0 sm:pr-2 pb-1 relative">
                    <SVGBasket />
                    <span class="absolute hidden sm:flex displa bottom-0 right-0 bg-white border border-black text-black text-xs rounded-full h-4 w-4 items-center justify-center">
                        1
                    </span>
                </div>
            </div>
        </div>
    </header>
</template>  

<style scoped>
    .scrolled-down #headerWrap {
        top: -100px;
        transition-delay: 0s !important;
    }
</style>