<template>
  <div class="px-5 pt-4 pb-2 flex justify-between items-center">
    <h3 class="ml-1 text-xl font-bold">공지사항</h3>
    <button
      v-if="userAdmin"
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
      <div class="col-span-1 border p-3">번호</div>
      <div class="col-span-5 border-y p-3">제목</div>
      <div class="col-span-2 border p-3">등록일</div>
      <div class="col-span-2 border-y border-r p-3">조회수</div>
      <div class="col-span-2 border-y border-r p-3">작성자</div>
    </div>

    <div v-for="notice in 10" class="grid grid-cols-12 bg-gray-200">
      <div class="col-span-1 border-x border-b border-white p-3 text-center">
        {{ notice }}
      </div>
      <div class="col-span-5 border-r border-b border-white p-3">
        공지사항 {{ notice }}
      </div>
      <div class="col-span-2 border-r border-b border-white p-3 text-center">
        등록일
      </div>
      <div class="col-span-2 border-r border-b border-white p-3 text-center">
        조회수
      </div>
      <div class="col-span-2 border-r border-b border-white p-3 text-center">
        작성자
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
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const userAdmin = store.state.user.userAdmin;
const pushUpload = async () => router.push({ path: "/notice/upload" });
</script>
