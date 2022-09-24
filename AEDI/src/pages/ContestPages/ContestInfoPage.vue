<template>
  <div v-if="postData" class="px-5 flex">
    <div class="w-64 h-96 bg-gray-200 flex justify-center items-center">
      <img :src="postData?.img" alt="poster" class="w-full" />
    </div>
    <div class="pl-6 w-4/5">
      <div class="h-5/6">
        <div class="border-b border-gray-300 pb-2">
          <span class="text-red-400 mr-1.5"
            ><font-awesome-icon icon="fa-solid fa-heart"
          /></span>
          <span class="mr-4">{{ postData?.likes }}</span>
          <span>프로젝트 수 - </span>
          <span>{{ postData?.projects }}</span>
          <span class="float-right mr-2">조회수 - {{ postData?.views }}</span>
        </div>
        <div class="border-b border-gray-300 py-2">
          <h1 class="text-xl font-bold mb-3">
            {{ postData?.title }}
          </h1>
          <div class="flex flex-col gap-1">
            <div>
              <span class="text-gray-400 inline-block w-24">주최</span>
              <span>{{ postData?.host }}</span>
            </div>
            <div>
              <span class="text-gray-400 inline-block w-24">주관</span>
              <span>{{ postData?.supervision }}</span>
            </div>
            <div>
              <span class="text-gray-400 inline-block w-24">후원</span>
              <span>{{ postData?.sponsor }}</span>
            </div>
          </div>
        </div>

        <div class="mt-2 border-b border-gray-300 pb-2">
          <div class="flex flex-col gap-1">
            <div class="flex">
              <span class="text-gray-400 inline-block w-24">접수기간</span>
              <span>{{ postData?.startDate }}</span>
              <span class="mx-0.5">~</span>
              <span>{{ postData?.endDate }}</span>
            </div>
            <div>
              <span class="text-gray-400 inline-block w-24">참가대상</span>
              <span>{{ postData?.target }}</span>
            </div>
            <div>
              <span class="text-gray-400 inline-block w-24">응모분야</span>
              <span>{{ postData?.field }}</span>
            </div>
          </div>
        </div>

        <div class="mt-2">
          <div class="flex flex-col gap-1">
            <div class="flex">
              <span class="text-gray-400 inline-block w-24">게시일</span>
              <div v-if="postData?.timestamp">
                <span>{{ postData?.timestamp.toDate().getFullYear() }}</span>
                <span>-</span>
                <span v-if="postData?.timestamp.toDate().getMonth() < 9"
                  >0{{ postData?.timestamp.toDate().getMonth() + 1 }}</span
                >
                <span v-else>{{ postData?.timestamp.toDate().getMonth() + 1 }}</span>
                <span>-</span>
                <span v-if="postData?.timestamp.toDate().getDate() < 10"
                  >0{{ postData?.timestamp.toDate().getDate() }}</span
                >
                <span v-else>{{ postData?.timestamp.toDate().getDate() }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="h-1/6 flex flex-col justify-end items-start">
        <div class="w-full flex justify-between">
          <div>
            <button
              class="ml-3 p-3 bg-yellow-300 rounded-md"
              @click="openUrl(postData?.url)"
            >
              <span class="font-bold">졸업작품 발표회 바로가기</span>
              <span class="ml-3"
                ><font-awesome-icon icon="fa-solid fa-chevron-right"
              /></span>
            </button>
            <button
              class="ml-12 p-2 border-4 border-red-400 rounded-md box-content"
              @click="pushLike('contests', postId)"
            >
              <span class="text-red-400"
                ><font-awesome-icon icon="fa-solid fa-heart"
              /></span>
              <span class="font-bold ml-2">좋아요</span>
            </button>
          </div>
          <div class="flex items-end">
            <button
              v-if="userProfile.admin"
              @click="updatePost(postId)"
              class="mr-3 bg-indigo-500 py-2 px-3 rounded-md text-white"
            >
              <font-awesome-icon icon="fa-solid fa-upload" class="mr-2" />수정
            </button>

            <button
              v-if="userProfile.admin"
              @click="[deleteProjectPost('contests', postId), backList()]"
              class="bg-indigo-500 py-2 px-3 rounded-md text-white"
            >
              <font-awesome-icon icon="fa-solid fa-trash" class="mr-2" />삭제
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="px-5 mt-24 mb-10">
    <div class="flex justify-between items-center pb-3 border-b border-gray-400">
      <span class="font-bold text-xl">프로젝트</span>
      <button
        v-if="user"
        @click="uploadProject"
        class="px-3 py-2 bg-yellow-300 rounded-md"
      >
        업로드
      </button>
    </div>
    <ProjectList :projects="projects" :menu="menu"></ProjectList>
  </div>
</template>

<script setup>
import { inject, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { onSnapshotPost } from "../../firebase/post";
import { useRouteParams } from "@vueuse/router";
import { user } from "../../firebase/user";
import {
  pushLike,
  updateViewsCount,
  onSnapshotProjects,
  deleteProjectPost,
} from "../../firebase/post";

import ProjectList from "../../components/ProjectList.vue";

const router = useRouter();

const userProfile = inject("userProfile");
const postId = useRouteParams("post_id").value;
const postData = onSnapshotPost("contests", postId);
const projects = onSnapshotProjects("contests", postId);
const menu = ref("contest");

const props = defineProps({
  projects: Object,
  menu: String,
});

onMounted(() => {
  updateViewsCount("contests", postId);
});

const openUrl = (url) => {
  window.open(url, "_blank");
};

const updatePost = (post_id) => {
  router.push({
    path: `/contest/info/${post_id}/update`,
  });
};

const backList = () => {
  router.push({
    path: `/contest/page/`,
  });
};

const uploadProject = () => {
  router.push({
    path: `/contest/info/${postId}/project/upload`,
  });
};
</script>
