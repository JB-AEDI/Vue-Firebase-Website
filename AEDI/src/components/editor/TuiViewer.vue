<template>
  <div v-html="content"></div>
</template>

<script setup>
import "@toast-ui/editor/dist/toastui-editor-viewer.css";

import { defineProps } from "vue";

const props = defineProps({ content: String });
</script>
<style></style>
