<script setup lang="ts">
	defineProps<{
		editor: any;
	}>();
</script>
<template>
	<div class="toolbar-group">
		<button
			@click="editor.chain().focus().toggleBulletList().run()"
			:class="{ 'is-active': editor.isActive('bulletList') }"
			class="toolbar-button"
			title="Bullet List"
		>
			<svg
				width="16"
				height="16"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
			>
				<line x1="8" y1="6" x2="21" y2="6"></line>
				<line x1="8" y1="12" x2="21" y2="12"></line>
				<line x1="8" y1="18" x2="21" y2="18"></line>
				<line x1="3" y1="6" x2="3.01" y2="6"></line>
				<line x1="3" y1="12" x2="3.01" y2="12"></line>
				<line x1="3" y1="18" x2="3.01" y2="18"></line>
			</svg>
		</button>
		<button
			@click="editor.chain().focus().toggleOrderedList().run()"
			:class="{ 'is-active': editor.isActive('orderedList') }"
			class="toolbar-button"
			title="Numbered List"
		>
			<svg
				width="16"
				height="16"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
			>
				<line x1="10" y1="6" x2="21" y2="6"></line>
				<line x1="10" y1="12" x2="21" y2="12"></line>
				<line x1="10" y1="18" x2="21" y2="18"></line>
				<path d="M4 6h1v4"></path>
				<path d="M4 10h2"></path>
				<path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"></path>
			</svg>
		</button>
	</div>
</template>
