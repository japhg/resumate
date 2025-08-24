<script setup lang="ts">
	defineProps<{
		type?: "button" | "submit" | "reset";
		href?: string;
		icon?: string;
	}>();
</script>
<template>
	<NuxtLink
		v-if="href"
		:to="href"
		class="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
	>
		<slot />
	</NuxtLink>

	<button
		v-else
		:type="type"
		class="flex items-center gap-2 w-auto justify-center rounded-md bg-black px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black hover:bg-gray-700"
	>
		<i v-if="icon" :class="icon" />

		<slot />
	</button>
</template>
