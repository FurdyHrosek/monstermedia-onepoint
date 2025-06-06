<script lang="ts" setup>
    import SVGCaretDown from "assets/svg/icons/caret-down.svg";

    const props = defineProps({
        id: { type: String, required: true },
        fieldTitle: { type: String, required: true },
        options: { type: Array as PropType<string[]>, required: true },
        modelValue: { type: String as PropType<string | undefined>, required: false, default: undefined },
    });


    const emit = defineEmits(['update:modelValue']);

    const isSelectVisible = ref(false);
    const selectOption = (option: string) => emit('update:modelValue', option)

    onMounted(() => {
        if (!props.modelValue && props.options.length > 0) {
            nextTick(() => selectOption(props.options[0]));
        }
    });
</script>

<template>
    <div class="custom-select-wrappe relative flex flex-col" @click.stop>
        <label class="font-regular mb-5 text-center font-bold text-[var(--clr-font-black)]" :for="`option-${props.id}`">{{ props.fieldTitle }}</label>

        <button class="btn-select
            flex items-center max-h-[50px] w-full border border-[var(--clr-font-black)]
        ">
            <input class="min-w-[432px] font-regular text-[var(----clr-font-black)] px-5 py-4 outline-0 cursor-pointer"
                type="text" :id="`option-${props.id}`" name="text" 
                :value="modelValue"
                readonly
            />
            <SVGCaretDown class="absolute right-3" />
            <div :id="props.id" class="custom-select" :class="{ 'visible': isSelectVisible }">
                <span 
                    v-for="option in props.options" :key="option" 
                    :class="[
                        'custom-option px-5 py-4',
                        option === props.modelValue ? '!bg-black text-white' : ''
                    ]"
                    @click="selectOption(option)"
                >
                    {{ option }}
                </span>
            </div>
        </button>
        <button class="btn-unfocus" tabindex="-1" aria-hidden="true"></button>
    </div>
</template>

<style scoped>
    .custom-select {
        display: none;
        flex-direction: column;
        width: stretch;

        z-index: 10;
        position: absolute;
        top: 100%;
        left: 0;

        margin: -4px 0 0;

        cursor: pointer;
        background-color: white;
        color: var(--clr-font-black);

        border: 1px solid black !important;
        border-style: none solid solid solid !important;
        border-radius: 0 0 var(--br-small) var(--br-small);
    }
    .custom-select .custom-option:hover {
        background-color: var(--clr-grey-light);
    }
    .btn-select:focus-within .custom-select {
        display: flex;
    }
    .btn-unfocus {
        position: absolute;
        inset: 0;
        z-index: 2;
        background: transparent;
        border: none;
        pointer-events: none;
        outline: none;
    }
    .custom-select-wrapper:focus .btn-unfocus,
    .custom-select-wrapper:focus-within .btn-unfocus {
        pointer-events: auto;
        z-index: 10; 
    }
    .custom-select .custom-option:focus {
        display: none !important;
    }
    .btn-unfocus:focus {
        pointer-events: none !important;
    }
    .custom-select span.selected {
        font-weight: bold;
        color: var(--clr-accent);
        cursor: default !important;
    }
    .custom-select-wrapper:has(.svg:focus) {
        display: none !important;
    }

</style>