<template>
  <div class="grid grid-cols-12 px-5">
    <div class="col-span-3">
      <img :src="imgSrc" alt="poster" class="w-full" />
    </div>
    <div class="col-span-9 px-6">
      <div class="border-b border-gray-300 pb-2">
        <span class="text-yellow-300 mr-1">★</span>
        <span class="mr-4">{{ likes }}</span>
        <span>프로젝트 수 - </span>
        <span>{{ projectsCount }}</span>
      </div>
      <div class="border-b border-gray-300 py-2">
        <h1 class="text-lg font-bold mb-3">{{ title }}</h1>
        <div class="mb-1">
          <span>학교</span>
          <span>중부대학교</span>
        </div>
        <div class="mb-1">
          <span>학과</span>
          <span>정보보호학과</span>
        </div>
        <div>
          <span>연도</span>
          <span>2021</span>
        </div>
      </div>
      <div>사이트링크 / 좋아요</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const imgSrc = ref(
  "https://images.unsplash.com/photo-1663051636926-a9719e8f174c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2787&q=80"
);
const likes = ref(19);
const projectsCount = ref(34);
const title = ref("2021 정보보호학과 졸업작품전");
</script>
