export const useCurrentYear = () => {
    const year = ref(new Date().getFullYear());
    let interval: NodeJS.Timeout;

    onMounted(() => {
        interval = setInterval(() => {
            const now = new Date().getFullYear();
            if (now !== year.value) year.value = now;
        }, 60_000);
    })

    onBeforeUnmount(() => {
        clearInterval(interval);
    })

    return year;
}