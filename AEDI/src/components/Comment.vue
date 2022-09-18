<template>
  <div>댓글 {{ comment }}</div>
</template>

<script setup>
const props = defineProps({ comment: Number });
</script>
