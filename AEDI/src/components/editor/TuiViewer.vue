<template>
  <div class="markdown-body" v-html="md(content)"></div>
</template>

<script setup>
import { defineProps } from "vue";
import "github-markdown-css";

const props = defineProps({ content: String });
</script>
<style></style>
