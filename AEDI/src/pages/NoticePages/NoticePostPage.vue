<template>
  <div>
    <p>{{ post?.title }}</p>
    <p>{{ postDocSnap.data().name }}</p>
    <TuiViewer :content="content"></TuiViewer>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import TuiViewer from "../../components/editor/TuiViewer.vue";
import { postDocSnap, getPost, getContent } from "../../firebase/post";
import { useRouteParams } from "@vueuse/router";

const postId = useRouteParams("post_id");

const post = ref(null);
const content = ref("");

onMounted(async () => {
  const doc = await getPost(postId.value);
  post.value = doc.data();
  content.value = await getContent(postId.value);
});
</script>
