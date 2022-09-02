<template>
  <div ref="editorRef"></div>
</template>

<script setup>
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/editor";

import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";

import { ref, onMounted, defineProps, defineEmits } from "vue";

const editorRef = ref();
const editor = ref(null);
const props = defineProps({ modelValue: String });
const emits = defineEmits({ e: "update:modelValue", value: String });

onMounted(() => {
  editor.value = new Editor({
    el: editorRef.value,
    height: "500px",
    initialEditType: "wysiwyg",
    previewStyle: "vertical",
    plugins: [colorSyntax],
    events: {
      change: () => {
        if (!editor.value) return;
        emits("update:modelValue", editor.value?.getMarkdown());
      },
    },
  });
});
</script>
