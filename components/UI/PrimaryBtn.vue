<script lang="ts" setup>
    const props = defineProps<{
        btnClass?: string
    }>()
</script>

<template>
    <button 
        :class="[`
            group flex items-center btn btn-primary py-3 px-4
            bg-[var(--clr-font-black)] rounded-xl cursor-pointer 
            border border-transparent transition-colors duration-150 
            hover:bg-white hover:border-[var(--clr-font-black)]
            `, props.btnClass
        ]"
    >
        <span class="
            text-white font-regular
            group-hover:text-[var(--clr-font-black)] transition-colors duration-150
        ">
            <slot />
        </span>
    </button>
</template>