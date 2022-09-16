<template>
  <div class="px-5 pt-4 pb-2 flex justify-between items-center">
    <h3 class="ml-1 text-xl font-bold">이벤트</h3>
    <button
      @click="pushUpload"
      v-if="userProfile.admin"
      class="mr-5 bg-indigo-500 py-2 px-3 rounded-md text-white"
    >
      <i class="fa-solid fa-upload mr-2"></i>업로드
    </button>
  </div>

  <div class="p-5">
    <div
      class="grid grid-cols-12 bg-indigo-500 text-white text-center border-b border-white"
    >
      <div class="col-span-5 border-y p-3">제목</div>
      <div class="col-span-2 border p-3">주최사</div>
      <div class="col-span-2 border-y border-r p-3">조회수</div>
      <div class="col-span-3 border-y border-r p-3">진행상태</div>
    </div>

    <div v-for="postData in postsData" class="grid grid-cols-12 bg-gray-200">
      <div class="col-span-5 border-r border-b border-white p-3">
        <span class="cursor-pointer" @click="movePost(postData)">
          {{ postData.data().title }}
        </span>
      </div>
      <div class="col-span-2 border-r border-b border-white p-3 text-center">AEDI</div>
      <div class="col-span-2 border-r border-b border-white p-3 text-center">
        {{ postData.data().views }}
      </div>
      <div class="col-span-3 border-r border-b border-white p-3 text-center">
        <span>{{ postData.data().startDate }}</span>
        <span class="mx-2">~</span>
        <span>{{ postData.data().endDate }}</span>
      </div>
    </div>
  </div>

  <div class="mt-4 mb-10 flex justify-center gap-16">
    <div class="bg-gray-200 px-3 py-1 cursor-pointer" @click="back">&lt</div>
    <div class="bg-gray-200 px-3 py-1 cursor-pointer" @click="next">&gt</div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { inject, onMounted, ref } from "vue";
import {
  setFirstEventsPage,
  pagingEventsPost,
  nextEventsPaging,
  beforeEventsPaging,
} from "../../firebase/post";

const router = useRouter();
const userProfile = inject("userProfile");

const postsData = ref();
const updatePosts = async () => {
  await setFirstEventsPage();
  postsData.value = pagingEventsPost();
};

onMounted(() => {
  updatePosts();
});

const back = async () => {
  await beforeEventsPaging();
  postsData.value = pagingEventsPost();
};
const next = async () => {
  await nextEventsPaging();
  postsData.value = pagingEventsPost();
};

const pushUpload = async () => router.push({ path: "/event/upload" });

const movePost = (post) => {
  router.push({
    path: `/event/post/${post.id}`,
  });
};
</script>
