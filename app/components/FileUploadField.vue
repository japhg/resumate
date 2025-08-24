<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  modelValue: File | null;
  label: string;
  required?: boolean;
  helper?: string;
  name: string;
  id: string;
  alt?: string;
  error: string;
}>();

const emit = defineEmits(["update:modelValue"]);

const fileInput = ref<HTMLInputElement | null>(null);
const src = ref<string | null>(null);
const fileName = ref<string | null>(null);

const triggerFileInput = () => {
  fileInput.value?.click();
};

const onFileSelect = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0] || null;

  emit("update:modelValue", file);
  fileName.value = file?.name || null;

  if (file && file.type.startsWith("image/")) {
    const reader = new FileReader();
    reader.onload = (e) => {
      src.value = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  } else {
    src.value = null;
  }
};
</script>
<template>
  <div class="flex flex-col gap-2">
    <div class="flex justify-between items-end">
      <InputLabel :for="id">
        <div class="flex items-center gap-1">
          {{ label }}
          <span v-if="required" class="text-red-500">*</span>
        </div>
      </InputLabel>
      <p v-if="helper" class="text-sm text-gray-800">{{ helper }}</p>
    </div>

    <input
      :id="id"
      :name="name"
      type="file"
      class="hidden"
      @change="onFileSelect"
      accept="image/*"
      ref="fileInput"
    />

    <button
      type="button"
      class="px-4 py-2 border rounded w-fit text-sm text-gray-700 hover:bg-gray-100"
      @click="triggerFileInput"
    >
      Choose File
    </button>

    <img
      v-if="src"
      :src="src"
      :alt="alt || 'Preview'"
      class="shadow-md rounded-xl w-full sm:w-64"
      style="filter: grayscale(100%)"
    />

    <p v-if="fileName && !src" class="text-gray-600 text-sm truncate">
      {{ fileName }}
    </p>

    <InputError :message="error" />
  </div>
</template>
