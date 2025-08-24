<script setup lang="ts">
	defineProps<{
		show: boolean;
	}>();

	const emit = defineEmits(["closeMenu"]);
	const closeMenu = () => {
		emit("closeMenu");
	};
</script>

<template>
	<Transition name="fade">
		<div
			v-if="show"
			class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
			@click.self="closeMenu"
		>
			<Transition name="slide">
				<div
					class="fixed inset-x-0 top-0 py-6 px-6 w-full bg-white/95 backdrop-blur-md shadow-2xl border-b border-gray-100"
				>
					<div class="flex justify-between items-center mb-8">
						<h3 class="text-lg font-medium text-gray-900">Menu</h3>
						<button
							@click="closeMenu"
							class="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
						>
							<IconsCloseMenuIcon class="w-6 h-6" />
						</button>
					</div>

					<div class="space-y-6">asdasd</div>
				</div>
			</Transition>
		</div>
	</Transition>
</template>

<style scoped>
	.fade-enter-active,
	.fade-leave-active {
		transition: opacity 0.3s ease;
	}

	.fade-enter-from,
	.fade-leave-to {
		opacity: 0;
	}

	.slide-enter-active,
	.slide-leave-active {
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.slide-enter-from,
	.slide-leave-to {
		transform: translateY(-100%);
		opacity: 0;
	}
</style>
