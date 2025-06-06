<script lang="ts" setup>
    import SVGClosePopup from '@/assets/svg/icons/close-popup.svg'

	const props = defineProps<{
		visible: boolean;
		type: 'bound' | 'fullscreen';
	}>();

	const emit = defineEmits<{
		(event: 'update:visible', value: boolean): void;
	}>();

	const internalVisible = ref(false);
	const isClosing = ref(false);

	watch(
		() => props.visible,
		(newVal) => {
			if (newVal) {
				internalVisible.value = true;
				isClosing.value = false;
			}
		}
	);

	const closePopup = () => {
		isClosing.value = true;
		setTimeout(() => {
			emit('update:visible', false);
			internalVisible.value = false;
		}, 300);
	};

	watchEffect(() => {
		(props.visible && props.type === 'fullscreen') 
			? document.body.classList.add('popup-visible')
			: document.body.classList.remove('popup-visible');
	});

	onUnmounted(() => {
		document.body.classList.remove('popup-visible');
	});
</script>

<template>
	<div
		v-if="internalVisible"
		:class="[
			'popup z-50 transition-opacity duration-300',
			props.type === 'fullscreen'
				? 'fixed inset-0'
				: 'fixed w-full h-full sm:h-auto sm:w-auto sm:absolute top-0 sm:top-15 right-0 bg-white shadow-[0_4px_20px_0_rgba(0,0,0,0.3)] fade-in fade-out_target',
			isClosing ? 'fade-out' : ''
		]"
	>
		<div class="popup-inner py-10 px-5 sm:px-13">
			<button 
				:class="[
					'popup-close absolute top-5 right-5 cursor-pointer z-[51] fade-out_target',
					isClosing ? 'fade-out' : 'fade-in'
				]" name="close" 
				@click="closePopup"
			>
				<SVGClosePopup />
			</button>

			<div :class="[
				'flex flex-col gap-10', 
				isClosing ? 'fade-out' : ''
			]">
				<slot />
			</div>
		</div>

		<div
			v-if="props.type === 'fullscreen'"
			@click="closePopup"
			:class="[
				'popup-overlay z-40 fixed inset-0 backdrop-blur transition-opacity duration-300',
				isClosing ? 'fade-out' : 'fade-in'
			]"
		></div>
	</div>
</template>

<style scoped>
    svg path {
        fill: var(--clr-accent);
    }
</style>