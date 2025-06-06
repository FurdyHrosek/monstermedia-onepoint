<script lang="ts" setup>
    const props = defineProps<{
        inputClass?: string
    }>()
</script>

<template>
    <input type="text" placeholder="your@email.com"
        :class="[`
            flex flex-1 w-full items-stretch sm:items-center font-regular min-w-0 max-w-full sm:w-[293px] max-h-[34px] 
            placeholder-[var(--clr-grey-dark)] rounded-xl border !leading-none
            px-5 py-2
        `, props.inputClass
        ]"
    />
</template>
  