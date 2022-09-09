<template>
  <div class="mx-5">
    <h1 class="font-bold text-lg mb-5">{{ post?.title }}</h1>
    <div class="flex gap-3 justify-end bg-gray-50 py-2 px-4 mb-8">
      <div>{{ post?.name }}<span v-if="post?.admin">(관리자)</span></div>
      <div class="text-sm">&#124</div>
      <div v-if="post?.timestamp">
        <span>{{ post?.timestamp.toDate().getFullYear() }}</span>
        <span>-</span>
        <span v-if="post?.timestamp.toDate().getMonth() < 11"
      >0{{ post?.timestamp.toDate().getMonth() + 1 }}</span
    >
        <span v-else>{{ post?.timestamp.toDate().getMonth() + 1 }}</span>
        <span>-</span>
        <span v-if="post?.timestamp.toDate().getDate() < 10">0{{ post?.timestamp.toDate().getDate() }}</span>
        <span v-else>{{ post?.timestamp.toDate().getDate() }}</span>
      </div>
      <div class="text-sm">&#124</div>
      <div>{{ post?.views }}</div>
    </div>
    <TuiViewer v-if="content" :content="content"></TuiViewer>
    <div class="mt-8 text-end">
      <button
        v-if="userProfile.admin"
        @click="updatePost(postId)"
        class="mr-3 bg-indigo-500 py-2 px-3 rounded-md text-white"
      >
        <i class="fa-solid fa-upload mr-2"></i>수정
      </button>

      <button
        v-if="userProfile.admin"
        @click="[deleteNotice(postId), backList()]"
        class="bg-indigo-500 py-2 px-3 rounded-md text-white"
      >
        <i class="fa-solid fa-trash mr-2"></i>삭제
      </button>
    </div>
    
  </div>
</template>

<script setup>
import { onMounted, ref, inject } from "vue";
import { useRouter } from "vue-router";
import { getPost, getContent, updateViewsCount, deleteNotice } from "../../firebase/post";
import { useRouteParams } from "@vueuse/router";

import TuiViewer from "../../components/editor/TuiViewer.vue";

const router = useRouter();

const postId = useRouteParams("post_id").value;
const userProfile = inject("userProfile");
const post = ref(null);
const content = ref("");

onMounted(async () => {
  const doc = await getPost(postId);
  post.value = doc.data();
  content.value = await getContent(postId);
  updateViewsCount(postId);
});

const updatePost = (post_id) => {
  router.push({
    path: `/notice/post/${post_id}/update`,
  });
};

const backList = () => {
  router.push({
    path: `/notice/page/`,
  });
}
</script>
