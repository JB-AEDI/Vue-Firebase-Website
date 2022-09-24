<template>
  <div class="h-full flex flex-col items-center justify-center text-lg gap-4">
    <div class="w-4/5 md:w-1/2 border-2 border-gray-400 px-3 py-2 rounded-md">
      <span class="font-bold">당신의 Email</span>
      <span>: {{ user?.email }}</span>
      <p class="mt-2 text-red-500 font-bold">
        이메일을 인증해야지 게시물 작성이 가능합니다.
      </p>
    </div>
    <div
      v-if="user?.emailVerified"
      class="w-4/5 md:w-1/2 border-2 border-emerald-400 px-3 py-2 rounded-md"
    >
      <font-awesome-icon icon="fa-solid fa-check" class="text-emerald-800 mr-2" />
      <span>인증 되었습니다.</span>
      <div class="flex justify-center">
        <button
          class="py-2 px-6 bg-indigo-500 text-white rounded-md mt-6 mb-2"
          @click="moveHome"
        >
          홈으로
        </button>
      </div>
    </div>
    <div v-else class="w-4/5 md:w-1/2 border-2 border-rose-500 px-3 py-2 rounded-md">
      <font-awesome-icon icon="fa-solid fa-x" class="text-rose-800 mr-2" />
      <span>인증 되지않았습니다.</span>
    </div>
    <div class="w-4/5 md:w-1/2 flex justify-center gap-12 text-white font-bold">
      <button
        class="py-2 px-3 bg-green-400 rounded-md"
        @click="openUrl('https://www.naver.com')"
      >
        Naver
      </button>
      <button
        class="py-2 px-3 bg-sky-400 rounded-md"
        @click="openUrl('https://www.daum.net')"
      >
        Daum
      </button>
      <button
        class="py-2 px-3 bg-red-500 rounded-md"
        @click="openUrl('https://www.google.com')"
      >
        Google
      </button>
    </div>
  </div>
</template>

<script setup>
import { user } from "../firebase/user";
import { useRouter } from "vue-router";

const router = useRouter();

const openUrl = (url) => {
  window.open(url, "_blank");
};

const moveHome = () => {
  router.push({ name: "main" });
};
</script>
