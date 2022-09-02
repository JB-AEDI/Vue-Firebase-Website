<template>
  <div ref="editorRef"></div>
</template>

<script setup>
import Viewer from "@toast-ui/editor/dist/toastui-editor-viewer";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";

import { ref, onMounted, defineProps } from "vue";

const editorRef = ref();
const viewer = ref(null);
const props = defineProps({ content: String });

onMounted(() => {
  viewer.value = new Viewer({
    el: editorRef.value,
    initialValue: props.content,
  });
});
</script>
