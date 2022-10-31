<template>
  <div ref="editorRef"></div>
</template>

<script setup>
import { defineProps, onMounted, ref } from "vue";
import Viewer from "@toast-ui/editor/dist/toastui-editor-viewer";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";

const editorRef = ref();
const viewer = ref(Viewer);
const props = defineProps({ content: String });

onMounted(() => {
  viewer.value = new Viewer({
    el: editorRef.value,
    initialValue: props.content,
    customHTMLRenderer: {
      htmlBlock: {
        iframe(node) {
          return [
            {
              type: "openTag",
              tagName: "iframe",
              outerNewLine: true,
              attributes: node.attrs,
            },
            { type: "html", content: node.childrenHTML },
            { type: "closeTag", tagName: "iframe", outerNewLine: true },
          ];
        },
      },
    },
  });
});
</script>
