<template>
  <Catgory></Catgory>

  <div class="px-5 pt-4 pb-2 flex justify-between items-center">
    <h3 class="ml-1 text-xl font-bold">
      IT/웹/모바일/게임{{ $route.params.page_id }}
    </h3>
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
      class="grid grid-cols-6 bg-indigo-500 text-white text-center border-b border-white"
    >
      <div class="col-span-3 border p-3">공모전명</div>
      <div class="col-span-1 border-y p-3">주최사</div>
      <div class="col-span-1 border p-3">접수기간</div>
      <div class="col-span-1 border-y border-r p-3">진행상태</div>
    </div>

    <div v-for="contest in 10" class="grid grid-cols-6 bg-gray-200">
      <div class="col-span-3 border-x border-b border-white p-3">
        공모전 {{ contest }}
      </div>
      <div class="col-span-1 border-r border-b border-white p-3 text-center">
        주최사
      </div>
      <div class="col-span-1 border-r border-b border-white p-3 text-center">
        접수기간
      </div>
      <div class="col-span-1 border-r border-b border-white p-3 text-center">
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
import Catgory from "../components/Catgory.vue";

import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const userAdmin = store.state.user.userAdmin;
const pushUpload = async () => router.push({ path: "/contest/upload" });
</script>
