<template>
  <div class="mx-5">
    <h1 class="font-bold text-lg mb-5">{{ post?.title }}</h1>
    <div class="flex gap-3 justify-end bg-gray-50 py-2 px-4 mb-8">
      <div>{{ post?.name }}<span v-if="post?.admin">(관리자)</span></div>
      <div class="text-sm">｜</div>
      <div>
        <span>{{ post?.timestamp.toDate().getFullYear() }}</span>
        <span>-</span>
        <span v-if="post?.timestamp.toDate().getMonth() < 10"
          >0{{ post?.timestamp.toDate().getMonth() }}</span
        >
        <span v-else>{{ post?.timestamp.toDate().getMonth() }}</span>
        <span>-</span>
        <span v-if="post?.timestamp.toDate().getDate() < 10"
          >0{{ post?.timestamp.toDate().getDate() }}</span
        >
        <span v-else>{{ post?.timestamp.toDate().getDate() }}</span>
      </div>
      <div class="text-sm">｜</div>
      <div>{{ post?.views }}</div>
    </div>
    <TuiViewer :content="content"></TuiViewer>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import TuiViewer from "../../components/editor/TuiViewer.vue";
import { getPost, getContent } from "../../firebase/post";
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
