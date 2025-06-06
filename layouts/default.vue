<script lang="ts" setup>
    let lastScrollY: number = 0;

    const onScroll = (): void => {
        const currentScroll = window.scrollY;
        const body = document.body;

        if (currentScroll <= 0) {
            body.classList.remove('scrolled-up', 'scrolled-down');
            lastScrollY = 0;
            return;
        }

        const handleScrollDown = () => {
            body.classList.add('scrolled-down');
            body.classList.remove('scrolled-up');
        }
        const handleScrollUp = () => {
            body.classList.add('scrolled-up');
            body.classList.remove('scrolled-down');
        }

        currentScroll > lastScrollY
            ? handleScrollDown()
            : handleScrollUp();

        lastScrollY = currentScroll;
    }

    const throttledOnScroll: () => void = throttle(onScroll, 100);
    onMounted(() => {
        window.addEventListener('scroll', throttledOnScroll);
    });
    onUnmounted(() => {
        window.removeEventListener('scroll', throttledOnScroll);
    });
</script>

<template>
    <LayoutHeader />
    <main class="page flex flex-col flex-1">
        <slot />
    </main>
    <LayoutFooter />
</template>

<style scoped>
    :deep(section) {
        margin-bottom: 3.75rem;
    }
    :deep(section:last-of-type) {
        margin-bottom: 0;
    }
</style>