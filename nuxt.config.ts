import tailwindcss from "@tailwindcss/vite";
import svgLoader from 'vite-svg-loader'

export default defineNuxtConfig({
    compatibilityDate: '2025-06-05',
    devtools: { enabled: false },
    modules: ['@nuxtjs/i18n', '@nuxt/image-edge', 'nuxt-swiper', '@pinia/nuxt'],
    css: ['~/assets/css/main.css'],

    i18n: {
        lazy: true,
        langDir: 'locales/',
        locales: [
            { code: 'en', iso: 'en-US', file: 'en.json', name: 'English' },
            { code: 'cs', iso: 'cs-CZ', file: 'cs.json', name: 'Čeština' }
        ],
        defaultLocale: 'en',
        pages: {
            'terms': {
                en: '/terms-and-conditions',
                cs: '/smluvni-podminky'
            },
            'gdpr': {
                en: '/gdpr',
                cs: '/gdpr'
            },
        },
    },
    vite: {    
        plugins: [      
            tailwindcss(),    
            svgLoader()
        ], 
    },
})