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

    <div v-for="event in 10" class="grid grid-cols-12 bg-gray-200">
      <div class="col-span-5 border-r border-b border-white p-3">이벤트 {{ event }}</div>
      <div class="col-span-2 border-r border-b border-white p-3 text-center">주최사</div>
      <div class="col-span-2 border-r border-b border-white p-3 text-center">조회수</div>
      <div class="col-span-3 border-r border-b border-white p-3 text-center">
        진행상태
      </div>
    </div>
  </div>

  <div class="mt-4 flex justify-center gap-2">
    <div class="bg-gray-200 px-2 py-1">&lt&lt</div>
    <div class="bg-gray-200 px-3 py-1" v-for="listNumber in 8">
      {{ listNumber }}
    </div>
    <div class="bg-gray-200 px-2 py-1">&gt&gt</div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { inject } from "vue";

const router = useRouter();

const userProfile = inject("userProfile");

const pushUpload = async () => router.push({ path: "/event/upload" });
</script>
