<script setup lang="ts">
	const props = defineProps<{
		modelValue: string;
		id?: string;
		label?: string;
		error?: string | null | undefined;
		placeholder?: string;
		required?: boolean;
		autofocus?: boolean;
		helper?: string;
		maxlength?: any;
		readonly?: boolean;
		mask?: string;
		pattern?: string;
		max?: string;
        rows: string;
	}>();

	const input = (event: any) => {
		if (props.maxlength && event.target.value.length > +props.maxlength) {
			event.target.value = event.target.value?.slice(0, +props.maxlength);
			return;
		}

		emit("update:modelValue", event.target.value);
	};

	const emit = defineEmits(["update:modelValue"]);
</script>

<template>
	<div class="flex flex-col">
		<div class="flex justify-between items-end">
			<InputLabel :for="id">
				{{ label }} <span v-if="required" class="text-gray-500">*</span>
			</InputLabel>
			<p v-if="helper" class="text-sm text-gray-800">{{ helper }}</p>
		</div>
		<Textarea
			class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
			:aria-label="label"
			:name="label"
			:placeholder="placeholder"
			:aria-placeholder="placeholder"
			@input="input($event)"
			:class="error ? 'border-red-500' : 'border-gray-300'"
			:id="id"
			:value="modelValue"
			:readonly="readonly"
			:required="required"
			:max="props.max"
            :rows="rows"
		/>

		<InputError :message="error" />
	</div>
</template>
