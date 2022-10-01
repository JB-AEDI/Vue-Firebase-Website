<template>
  <div class="mx-5">
    <h1 class="font-bold text-lg mb-5">{{ postSnapshot?.value?.title }}</h1>
    <div class="flex gap-3 justify-end bg-gray-50 py-2 px-4 mb-8 text-sm sm:text-base">
      <div>{{ postSnapshot?.value?.name }}<span v-if="postSnapshot?.value?.admin">(관리자)</span></div>
      <div class="text-sm">&#124</div>
      <div v-if="postSnapshot?.value?.timestamp">
        <span>{{ postSnapshot?.value?.timestamp.toDate().getFullYear() }}</span>
        <span>-</span>
        <span v-if="postSnapshot?.value?.timestamp.toDate().getMonth() < 9"
      >0{{ postSnapshot?.value?.timestamp.toDate().getMonth() + 1 }}</span
    >
        <span v-else>{{ postSnapshot?.value?.timestamp.toDate().getMonth() + 1 }}</span>
        <span>-</span>
        <span v-if="postSnapshot?.value?.timestamp.toDate().getDate() < 10">0{{ postSnapshot?.value?.timestamp.toDate().getDate() }}</span>
        <span v-else>{{ postSnapshot?.value?.timestamp.toDate().getDate() }}</span>
      </div>
      <div class="text-sm">&#124</div>
      <div>{{ postSnapshot?.value?.views }}</div>
    </div>
    <TuiViewer v-if="content" :content="content"></TuiViewer>
    <div class="mt-8 text-end">
      <button
        v-if="userProfile.admin"
        @click="updatePost(postId)"
        class="mr-3 bg-indigo-500 py-2 px-3 rounded-md text-white"
      >
        <font-awesome-icon icon="fa-solid fa-upload" class="mr-2" />수정
      </button>

      <button
        v-if="userProfile.admin"
        @click="[deletePost('notices', postId), backList()]"
        class="bg-indigo-500 py-2 px-3 rounded-md text-white"
      >
        <font-awesome-icon icon="fa-solid fa-trash" class="mr-2" />삭제
      </button>
    </div>
    
  </div>
</template>

<script setup>
import { onMounted, ref, inject } from "vue";
import { useRouter } from "vue-router";
import { getContent, updateViewsCount, deletePost, onSnapshotPost } from "../../firebase/post";
import { useRouteParams } from "@vueuse/router";

import TuiViewer from "../../components/editor/TuiViewer.vue";

const router = useRouter();

const postId = useRouteParams("post_id").value;
const userProfile = inject("userProfile");
const content = ref("");
const postSnapshot = ref()

postSnapshot.value = onSnapshotPost("notices", postId);

onMounted(async () => {
  content.value = await getContent("notices", postId);
  updateViewsCount("notices", postId);
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
