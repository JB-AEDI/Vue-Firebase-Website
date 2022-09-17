<template>
  <div class="non" ref="editorRef"></div>
</template>

<script setup>
import { defineProps, onMounted, ref } from "vue";
import Viewer from "@toast-ui/editor/dist/toastui-editor-viewer";

const editorRef = ref();
const viewer = ref(Viewer);
const props = defineProps({ content: String });

onMounted(() => {
  viewer.value = new Viewer({
    el: editorRef.value,
    initialValue: props.content,
  });
});
</script>
<style>
.non img {
  display: none;
}
</style>
