<template>
  <div class="px-5 pt-4 pb-2 flex justify-between items-center">
    <h3 class="ml-1 text-xl font-bold">공지사항</h3>
    <button
      v-if="userProfile.admin"
      @click="pushUpload"
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
      <div class="col-span-3 border p-3">등록일</div>
      <div class="col-span-2 border-y border-r p-3">조회수</div>
      <div class="col-span-2 border-y border-r p-3">작성자</div>
    </div>

    <div v-for="postData in postsData" class="grid grid-cols-12 bg-gray-200">
      <div class="col-span-5 border-r border-b border-white p-3">
        <span class="cursor-pointer" @click="movePost(postData)">
          {{ postData.data().title }}
        </span>
      </div>
      <div class="col-span-3 border-r border-b border-white p-3 text-center">
        <span>{{ postData.data().timestamp.toDate().getFullYear() }}</span>
        <span>-</span>
        <span v-if="postData.data().timestamp.toDate().getMonth() < 11"
          >0{{ postData.data().timestamp.toDate().getMonth() + 1 }}</span
        >
        <span v-else>{{ postData.data().timestamp.toDate().getMonth() + 1 }}</span>
        <span>-</span>
        <span v-if="postData.data().timestamp.toDate().getDate() < 10"
          >0{{ postData.data().timestamp.toDate().getDate() }}</span
        >
        <span v-else>0{{ postData.data().timestamp.toDate().getDate() }}</span>
      </div>
      <div class="col-span-2 border-r border-b border-white p-3 text-center">
        {{ postData.data().views }}
      </div>
      <div class="col-span-2 border-r border-b border-white p-3 text-center">
        <span>{{ postData.data().name }}</span>
        <span v-if="postData.data().admin">(관리자)</span>
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
import { inject, ref } from "vue";
import { pagingPost, nextPaging, beforePaging } from "../../firebase/post";

const router = useRouter();
const userProfile = inject("userProfile");

const postsData = ref();
const updatePosts = () => {
  postsData.value = pagingPost();
};
updatePosts();

const back = async () => {
  await beforePaging();
  updatePosts();
};
const next = async () => {
  await nextPaging();
  updatePosts();
};

const pushUpload = async () => router.push({ path: "/notice/upload" });

const movePost = (post) => {
  router.push({
    path: `/notice/post/${post.id}`,
  });
};
</script>
