<script lang="ts" setup>
	useHead({
        bodyAttrs: {
            class: 'body'
        }
    })

    const selectedCurrency = useCookie<'czk' | 'eur'>('selectedCurrency', {
        default: () => 'czk',
        maxAge: format.timeSpan({ days: 30 }),
        watch: true,
    })

    const selectedCurrencyName = useCookie<string>('selectedCurrencyName', {
        default: () => 'Česká koruna',
        maxAge: format.timeSpan({ days: 30 }),
        watch: true,
    })

    const setCurrency = (val: 'czk' | 'eur') => {
        selectedCurrency.value = val;
    }

    const setCurrencyName = (val: string) => {
        selectedCurrencyName.value = val;
    }

    provide('selectedCurrency', selectedCurrency)
    provide('selectedCurrencyName', selectedCurrencyName)
    provide('setCurrency', setCurrency)
    provide('setCurrencyName', setCurrencyName)
</script>

<template>
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
</template>