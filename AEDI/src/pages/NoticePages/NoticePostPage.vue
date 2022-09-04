<template>
  <div>
    <h1>공지사항 게시물 페이지</h1>
    <p>{{ $route.params.post_id }}</p>
    <p>{{ post?.views }}</p>
    <p>{{ post?.timestamp }}</p>
    <p>{{ post?.title }}</p>
    <p>{{ post?.admin }}</p>
    <p>{{ post?.name }}</p>
    <p>{{ post?.description }}</p>
    <TuiViewer :content="content"></TuiViewer>
  </div>
</template>

<script setup>
import { useRouteParams } from "@vueuse/router";
import { ref } from "vue";
import { usePost } from "../../firebase/post";

import TuiViewer from "../../components/editor/TuiViewer.vue";

const postId = useRouteParams("post_id");
console.log(postId?.value);

const post = usePost();
console.log(post?.value?.title);

const content = ref(post?.value?.description);
</script>
