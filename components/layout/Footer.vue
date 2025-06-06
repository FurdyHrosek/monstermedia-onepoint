<script lang="ts" setup>
    import SVGMonsterMedia from '@/assets/svg/footer/monstermedia.svg';
    import SVGFacebook from '@/assets/svg/footer/facebook.svg';
    import SVGInstagram from '@/assets/svg/footer/instagram.svg';
    import SVGYoutube from '@/assets/svg/footer/youtube.svg';

    const year = useCurrentYear();
</script>

<template>
    <footer id="footerWrap" class="mt-15">
        <div id="footer-top" class="container">
            <!-- FOOTER: NEWSLETTTER -->
            <div id="footer-top_newsletter-wrap">
                <h2 class="mb-4">
                    {{ $t('footer.heading') }}
                </h2>
                <div id="footer-top_newsletter" class="flex flex-wrap lg:flex-nowrap items-center gap-x-10 gap-y-5">
                    <span class="font-large">
                        {{ $t('footer.newsletter') }}
                        <br>
                        {{ $t('footer.unsubscribe') }}
                    </span>
                    <div class="flex ml-0 lg:ml-auto">
                        <FormInput :input-class="'!rounded-tr-none !rounded-br-none'" />
                        <UIPrimaryBtn class="max-h-[34px] h-[34px] !py-2" :btn-class="'!rounded-tl-none !rounded-bl-none'">
                            Subscribe
                        </UIPrimaryBtn>
                    </div>
                </div>
            </div>

            <!-- FOOTER: DIRECTIONS -->
            <div id="footer-top_directions" 
                class="flex flex-wrap flex-col lg:flex-row justify-center lg:justify-between items-center font-regular mt-10 gap-5"
            >
                <div id="footer-top_links" 
                    class="flex flex-col sm:flex-row items-center gap-y-5 gap-x-10" 
                >
                    <div id="footer-top_links-socials" 
                        class="flex gap-6"
                    >
                        <NuxtLinkLocale to="/" title="instagram" target="_blank">
                            <SVGInstagram />
                        </NuxtLinkLocale>
                        <NuxtLinkLocale to="/" title="facebook" target="_blank">
                            <SVGFacebook />
                        </NuxtLinkLocale>
                        <NuxtLinkLocale to="/" title="youtube" target="_blank">
                            <SVGYoutube />
                        </NuxtLinkLocale>
                    </div>
                    <div id="footer-top_links-contacts" 
                        class="flex gap-4"
                    >
                        <a
                            href="https://jankalab.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            jankalab.com
                        </a>
                        <a
                            href="mailto:studio@onepoint.cz"
                        >
                            studio@onepoint.cz
                        </a>
                    </div>
                </div>
                <div id="footer-top_navigation" class="flex gap-6" 
                >
                    <NuxtLinkLocale to="/terms" title="">
                        {{ $t('pages.termsAndConditions') }}
                    </NuxtLinkLocale>
                    <NuxtLinkLocale to="/gdpr" title="">
                        {{ $t('pages.GDPR') }}
                    </NuxtLinkLocale>
                </div>
            </div>
        </div>

        <!-- FOOTER: SIGNATURE & COPYRIGHT -->
        <div id="footer-bottom" class="bg-[var(--clr-grey-light)] py-[0.563rem] mt-5">
            <div id="footer-bottom_signature" class="container flex flex-col lg:flex-row gap-[0.625rem] justify-between items-center font-regular">
                <span id="copyright">
                    © {{ year }} Jan Kaláb. {{ $t('footer.rights') }}
                </span>
                <div id="signature" class="flex items-center">
                    <span class="mr-3">
                        {{ $t('footer.created') }}
                    </span>
                    <NuxtLink to="https://monstermedia.cz/" target="_blank" title="Monster Media s.r.o."
                        class="flex items-center gap-1"
                    >
                        <SVGMonsterMedia />
                        <span>
                            Monster Media, s. r. o.
                        </span>
                    </NuxtLink>
                </div>
            </div>
        </div>
    </footer>
</template>
  
<style lang="css" scoped>
    a:hover {
        color: var(--clr-accent);
    }
    :deep(a:hover) svg path {
        fill: var(--clr-accent);
    }
</style>