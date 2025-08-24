<script setup>
	// Define props for v-model support
	const props = defineProps({
		modelValue: {
			type: String,
			default: "",
		},
		placeholder: {
			type: String,
			default: "Start typing here...",
		},
	});

	// Define emits for v-model
	const emit = defineEmits(["update:modelValue"]);

	// Create editor with reactive content
	const editor = useEditor({
		content: props.modelValue || "",
		extensions: [TiptapStarterKit],
		editorProps: {
			attributes: {
				class: "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none",
			},
		},
		onUpdate: ({ editor }) => {
			// Emit the updated content for v-model
			emit("update:modelValue", editor.getHTML());
		},
	});

	// Watch for external changes to modelValue
	watch(
		() => props.modelValue,
		(newValue) => {
			if (editor.value && newValue !== editor.value.getHTML()) {
				editor.value.commands.setContent(newValue, false);
			}
		}
	);

	onBeforeUnmount(() => {
		unref(editor).destroy();
	});
</script>

<template>
	<div class="tiptap-editor">
		<!-- Toolbar -->
		<div v-if="editor" class="editor-toolbar">
			<!-- Text Formatting Group -->
			<div class="toolbar-group">
				<button
					@click="editor.chain().focus().toggleBold().run()"
					:disabled="!editor.can().chain().focus().toggleBold().run()"
					:class="{ 'is-active': editor.isActive('bold') }"
					class="toolbar-button"
					title="Bold"
				>
					<svg
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
					>
						<path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path>
						<path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path>
					</svg>
				</button>
				<button
					@click="editor.chain().focus().toggleItalic().run()"
					:disabled="
						!editor.can().chain().focus().toggleItalic().run()
					"
					:class="{ 'is-active': editor.isActive('italic') }"
					class="toolbar-button"
					title="Italic"
				>
					<svg
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
					>
						<line x1="19" y1="4" x2="10" y2="4"></line>
						<line x1="14" y1="20" x2="5" y2="20"></line>
						<line x1="15" y1="4" x2="9" y2="20"></line>
					</svg>
				</button>
				<button
					@click="editor.chain().focus().toggleStrike().run()"
					:disabled="
						!editor.can().chain().focus().toggleStrike().run()
					"
					:class="{ 'is-active': editor.isActive('strike') }"
					class="toolbar-button"
					title="Strikethrough"
				>
					<svg
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
					>
						<path
							d="M16 4H9a3 3 0 0 0-2.125 5.124A3 3 0 0 0 9 12h6a3 3 0 0 1 2.125 5.124A3 3 0 0 1 15 20H8"
						></path>
						<line x1="4" y1="12" x2="20" y2="12"></line>
					</svg>
				</button>
				<button
					@click="editor.chain().focus().toggleCode().run()"
					:disabled="!editor.can().chain().focus().toggleCode().run()"
					:class="{ 'is-active': editor.isActive('code') }"
					class="toolbar-button"
					title="Inline Code"
				>
					<svg
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
					>
						<polyline points="16 18 22 12 16 6"></polyline>
						<polyline points="8 6 2 12 8 18"></polyline>
					</svg>
				</button>
			</div>

			<!-- Divider -->
			<div class="toolbar-divider"></div>

			<!-- Headings Group -->
			<div class="toolbar-group">
				<button
					@click="editor.chain().focus().setParagraph().run()"
					:class="{ 'is-active': editor.isActive('paragraph') }"
					class="toolbar-button"
					title="Paragraph"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="size-6"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5"
						/>
					</svg>
				</button>
				<button
					@click="
						editor.chain().focus().toggleHeading({ level: 1 }).run()
					"
					:class="{
						'is-active': editor.isActive('heading', { level: 1 }),
					}"
					class="toolbar-button"
					title="Heading 1"
				>
					H1
				</button>
				<button
					@click="
						editor.chain().focus().toggleHeading({ level: 2 }).run()
					"
					:class="{
						'is-active': editor.isActive('heading', { level: 2 }),
					}"
					class="toolbar-button"
					title="Heading 2"
				>
					H2
				</button>
				<button
					@click="
						editor.chain().focus().toggleHeading({ level: 3 }).run()
					"
					:class="{
						'is-active': editor.isActive('heading', { level: 3 }),
					}"
					class="toolbar-button"
					title="Heading 3"
				>
					H3
				</button>
			</div>

			<!-- Divider -->
			<div class="toolbar-divider"></div>

			<!-- Lists Group -->
			<TiptapMenuBar :editor="editor" />

			<!-- Divider -->
			<div class="toolbar-divider"></div>

			<!-- Advanced Formatting Group -->
			<div class="toolbar-group">
				<button
					@click="editor.chain().focus().toggleBlockquote().run()"
					:class="{ 'is-active': editor.isActive('blockquote') }"
					class="toolbar-button"
					title="Blockquote"
				>
					<svg
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
					>
						<path
							d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
						></path>
					</svg>
				</button>
				<button
					@click="editor.chain().focus().toggleCodeBlock().run()"
					:class="{ 'is-active': editor.isActive('codeBlock') }"
					class="toolbar-button"
					title="Code Block"
				>
					<svg
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
					>
						<polyline points="16 18 22 12 16 6"></polyline>
						<polyline points="8 6 2 12 8 18"></polyline>
						<rect
							x="2"
							y="2"
							width="20"
							height="20"
							rx="2"
							ry="2"
						></rect>
					</svg>
				</button>
				<button
					@click="editor.chain().focus().setHorizontalRule().run()"
					class="toolbar-button"
					title="Horizontal Rule"
				>
					<svg
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
					>
						<line x1="5" y1="12" x2="19" y2="12"></line>
					</svg>
				</button>
			</div>

			<!-- Divider -->
			<div class="toolbar-divider"></div>

			<!-- History Group -->
			<div class="toolbar-group">
				<button
					@click="editor.chain().focus().undo().run()"
					:disabled="!editor.can().chain().focus().undo().run()"
					class="toolbar-button"
					title="Undo"
				>
					<svg
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
					>
						<path d="M3 7v6h6"></path>
						<path
							d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"
						></path>
					</svg>
				</button>
				<button
					@click="editor.chain().focus().redo().run()"
					:disabled="!editor.can().chain().focus().redo().run()"
					class="toolbar-button"
					title="Redo"
				>
					<svg
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
					>
						<path d="M21 7v6h-6"></path>
						<path
							d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3-2.7"
						></path>
					</svg>
				</button>
			</div>

			<!-- Divider -->
			<div class="toolbar-divider"></div>

			<!-- Clear Group -->
			<div class="toolbar-group">
				<button
					@click="editor.chain().focus().unsetAllMarks().run()"
					class="toolbar-button clear-button"
					title="Clear Formatting"
				>
					<svg
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
					>
						<path
							d="M18.364 18.364A9 9 0 1 1 5.636 5.636a9 9 0 0 1 12.728 12.728zM12 8v4m0 4h.01"
						></path>
					</svg>
				</button>
			</div>
		</div>

		<!-- Editor Content -->
		<div class="editor-content">
			<TiptapEditorContent :editor="editor" />
		</div>
	</div>
</template>

<style scoped>
	.tiptap-editor {
		border: 1px solid #e2e8f0;
		border-radius: 8px;
		background: white;
		box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1),
			0 1px 2px 0 rgba(0, 0, 0, 0.06);
		overflow: hidden;
	}

	.editor-toolbar {
		display: flex;
		align-items: center;
		padding: 8px 12px;
		background: #f8fafc;
		border-bottom: 1px solid #e2e8f0;
		gap: 4px;
		flex-wrap: wrap;
	}

	.toolbar-group {
		display: flex;
		align-items: center;
		gap: 2px;
	}

	.toolbar-divider {
		width: 1px;
		height: 24px;
		background: #cbd5e1;
		margin: 0 4px;
	}

	.toolbar-button {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		border: none;
		border-radius: 6px;
		background: transparent;
		color: #64748b;
		cursor: pointer;
		transition: all 0.15s ease;
		font-size: 12px;
		font-weight: 600;
	}

	.toolbar-button:hover {
		background: #e2e8f0;
		color: #334155;
	}

	.toolbar-button:active {
		background: #cbd5e1;
		transform: translateY(1px);
	}

	.toolbar-button.is-active {
		background: #3b82f6;
		color: white;
	}

	.toolbar-button:disabled {
		opacity: 0.4;
		cursor: not-allowed;
	}

	.toolbar-button:disabled:hover {
		background: transparent;
		color: #64748b;
	}

	.clear-button {
		color: #ef4444;
	}

	.clear-button:hover {
		background: #fef2f2;
		color: #dc2626;
	}

	.editor-content {
		padding: 16px;
		min-height: 200px;
		background: white;
	}

	.editor-content :deep(.ProseMirror) {
		outline: none;
		font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
			"Helvetica Neue", Arial, sans-serif;
		line-height: 1.6;
		color: #1f2937;
		min-height: 150px;
		cursor: text;
	}

	.editor-content :deep(.ProseMirror p) {
		margin: 0 0 12px 0;
	}

	.editor-content :deep(.ProseMirror h1) {
		font-size: 2em;
		font-weight: 700;
		margin: 24px 0 16px 0;
		color: #111827;
	}

	.editor-content :deep(.ProseMirror h2) {
		font-size: 1.5em;
		font-weight: 600;
		margin: 20px 0 12px 0;
		color: #111827;
	}

	.editor-content :deep(.ProseMirror h3) {
		font-size: 1.25em;
		font-weight: 600;
		margin: 16px 0 8px 0;
		color: #111827;
	}

	.editor-content :deep(.ProseMirror ul),
	.editor-content :deep(.ProseMirror ol) {
		padding-left: 24px;
		margin: 12px 0;
	}

	.editor-content :deep(.ProseMirror li) {
		margin: 4px 0;
	}

	.editor-content :deep(.ProseMirror blockquote) {
		border-left: 4px solid #3b82f6;
		padding-left: 16px;
		margin: 16px 0;
		color: #6b7280;
		font-style: italic;
	}

	.editor-content :deep(.ProseMirror code) {
		background: #f3f4f6;
		padding: 2px 6px;
		border-radius: 4px;
		font-family: "Monaco", "Menlo", "Ubuntu Mono", monospace;
		font-size: 0.875em;
		color: #dc2626;
	}

	.editor-content :deep(.ProseMirror pre) {
		background: #1f2937;
		color: #f9fafb;
		padding: 16px;
		border-radius: 6px;
		overflow-x: auto;
		margin: 16px 0;
	}

	.editor-content :deep(.ProseMirror pre code) {
		background: transparent;
		padding: 0;
		color: inherit;
	}

	.editor-content :deep(.ProseMirror hr) {
		border: none;
		border-top: 2px solid #e5e7eb;
		margin: 24px 0;
	}

	.editor-content :deep(.ProseMirror strong) {
		font-weight: 600;
	}

	.editor-content :deep(.ProseMirror em) {
		font-style: italic;
	}

	.editor-content :deep(.ProseMirror s) {
		text-decoration: line-through;
	}

	/* Focus styles */
	.editor-content :deep(.ProseMirror:focus) {
		outline: none;
	}

	/* Placeholder styles */
	.editor-content :deep(.ProseMirror p.is-editor-empty:first-child::before) {
		content: v-bind("placeholder");
		float: left;
		color: #9ca3af;
		pointer-events: none;
		height: 0;
	}

	/* Ensure the editor is always visible */
	.editor-content :deep(.ProseMirror) {
		position: relative;
	}

	.editor-content :deep(.ProseMirror:empty::before) {
		content: v-bind("placeholder");
		color: #9ca3af;
		position: absolute;
		pointer-events: none;
	}

	ul li {
		list-style-type: disc !important;
		padding-left: 20px !important;
	}

	ol li {
		list-style-type: disc !important;
		padding-left: 20px !important;
	}

	/* Responsive design */
	@media (max-width: 768px) {
		.editor-toolbar {
			padding: 6px 8px;
			gap: 2px;
		}

		.toolbar-button {
			width: 28px;
			height: 28px;
			font-size: 11px;
		}

		.toolbar-divider {
			height: 20px;
			margin: 0 2px;
		}

		.editor-content {
			padding: 12px;
		}
	}
</style>
