<template>
  <div class="flex px-5">
    <div class="w-64 h-96 bg-gray-200 flex justify-center items-center">
      <img :src="postSnapshot?.value?.img" alt="poster" class="w-full" />
    </div>
    <div class="pl-6 w-4/5">
      <div class="h-5/6">
        <div class="border-b border-gray-300 pb-2">
          <span class="text-yellow-300 mr-1">★</span>
          <span class="mr-4">{{ likes }}</span>
          <span>프로젝트 수 - </span>
          <span>{{ projectsCount }}</span>
        </div>
        <div class="border-b border-gray-300 py-2">
          <h1 class="text-xl font-bold mb-3">
            {{ postSnapshot?.value?.title }}
          </h1>
          <div class="flex flex-col gap-1">
            <div>
              <span class="text-gray-400 inline-block w-24">학교</span>
              <span>{{ postSnapshot?.value?.university }}</span>
            </div>
            <div>
              <span class="text-gray-400 inline-block w-24">학과</span>
              <span>{{ postSnapshot?.value?.department }}</span>
            </div>
            <div>
              <span class="text-gray-400 inline-block w-24">연도</span>
              <span>{{ postSnapshot?.value?.year }}</span>
            </div>
          </div>
        </div>
        <div class="mt-2">
          <div class="flex flex-col gap-1">
            <div class="flex">
              <span class="text-gray-400 inline-block w-24">게시일</span>
              <div v-if="postSnapshot?.value?.timestamp">
                <span>{{
                  postSnapshot?.value?.timestamp.toDate().getFullYear()
                }}</span>
                <span>-</span>
                <span
                  v-if="postSnapshot?.value?.timestamp.toDate().getMonth() < 11"
                  >0{{
                    postSnapshot?.value?.timestamp.toDate().getMonth() + 1
                  }}</span
                >
                <span v-else>{{
                  postSnapshot?.value?.timestamp.toDate().getMonth() + 1
                }}</span>
                <span>-</span>
                <span
                  v-if="postSnapshot?.value?.timestamp.toDate().getDate() < 10"
                  >0{{
                    postSnapshot?.value?.timestamp.toDate().getDate()
                  }}</span
                >
                <span v-else>{{
                  postSnapshot?.value?.timestamp.toDate().getDate()
                }}</span>
              </div>
            </div>
            <div>
              <span class="text-gray-400 inline-block w-24">조회수</span>
              <span>{{ postSnapshot?.value?.views }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="h-1/6 flex flex-col justify-end items-start">
        <div class="w-full flex justify-between">
          <div>
            <button
              class="ml-3 p-3 bg-yellow-300 rounded-md"
              @click="openUrl(postSnapshot?.value?.url)"
            >
              <span class="font-bold">졸업작품 발표회 바로가기</span>
              <span class="ml-3"
                ><i class="fa-solid fa-chevron-right"></i
              ></span>
            </button>
            <button
              class="ml-12 p-2 border-4 border-yellow-300 rounded-md box-content"
            >
              <span class="text-yellow-300"
                ><i class="fa-solid fa-star"></i
              ></span>
              <span class="font-bold ml-2">좋아요</span>
            </button>
          </div>
          <div class="flex items-end">
            <button
              v-if="userProfile.admin"
              @click="updatePost(postId)"
              class="mr-3 bg-indigo-500 py-2 px-3 rounded-md text-white"
            >
              <i class="fa-solid fa-upload mr-2"></i>수정
            </button>

            <button
              v-if="userProfile.admin"
              @click="[deletePost('graduations', postId), backList()]"
              class="bg-indigo-500 py-2 px-3 rounded-md text-white"
            >
              <i class="fa-solid fa-trash mr-2"></i>삭제
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="px-5 mt-24">
    <div
      class="flex justify-between items-center pb-3 border-b border-gray-400"
    >
      <span class="font-bold text-xl">프로젝트</span>
      <button
        v-if="user"
        @click="uploadProject"
        class="px-3 py-2 bg-yellow-300 rounded-md"
      >
        업로드
      </button>
    </div>
    <ProjectList></ProjectList>
  </div>
</template>

<script setup>
import { ref, inject, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useRouteParams } from "@vueuse/router";
import { user } from "../../firebase/user";
import {
  deletePost,
  onSnapshotPost,
  updateViewsCount,
} from "../../firebase/post";
import ProjectList from "../../components/ProjectList.vue";

const router = useRouter();

const userProfile = inject("userProfile");

const postId = useRouteParams("post_id").value;
const postSnapshot = ref();
const likes = ref(19);
const projectsCount = ref(34);

postSnapshot.value = onSnapshotPost("graduations", postId);

onMounted(() => {
  updateViewsCount("graduations", postId);
});

const openUrl = (url) => {
  window.open(url, "_blank");
};

const updatePost = (post_id) => {
  router.push({
    path: `/graduation/info/${post_id}/update`,
  });
};

const backList = () => {
  router.push({
    path: `/graduation/page/`,
  });
};

const uploadProject = () => {
  router.push({
    path: `/graduation/info/${postId}/project/upload`,
  });
};
</script>
