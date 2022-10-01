<template>
  <div v-if="userProfile.admin" class="px-5 pt-4 pb-2 flex justify-end">
    <button @click="pushUpload" class="bg-indigo-500 py-2 px-3 rounded-md text-white">
      <font-awesome-icon icon="fa-solid fa-upload" class="mr-2" />업로드
    </button>
  </div>

  <div class="p-5">
    <div
      class="grid grid-cols-12 bg-indigo-500 text-white border-b border-white text-xs sm:text-base"
    >
      <div class="flex justify-center items-center col-span-5 border-y p-3">제목</div>
      <div class="flex justify-center items-center col-span-3 border p-3">등록일</div>
      <div
        class="flex justify-center items-center col-span-2 border-y border-r p-1 sm:p-3"
      >
        조회수
      </div>
      <div
        class="flex justify-center items-center col-span-2 border-y border-r p-1 sm:p-3"
      >
        작성자
      </div>
    </div>

    <div v-for="notice in noticesPage[currentPage]" class="grid grid-cols-12 bg-gray-200">
      <div class="col-span-5 border-r border-b border-white p-3">
        <span class="cursor-pointer font-bold" @click="movePost(notice)">
          {{ notice?.title }}
        </span>
      </div>
      <div
        class="sm:flex justify-center items-center col-span-3 border-r border-b border-white py-3 px-2 sm:px-3 text-xs text-center"
      >
        <span>{{ notice?.timestamp.toDate().getFullYear() }}</span>
        <span>-</span>
        <span v-if="notice?.timestamp.toDate().getMonth() < 9"
          >0{{ notice?.timestamp.toDate().getMonth() + 1 }}</span
        >
        <span v-else>{{ notice?.timestamp.toDate().getMonth() + 1 }}</span>
        <span>-</span>
        <span v-if="notice?.timestamp.toDate().getDate() < 10"
          >0{{ notice?.timestamp.toDate().getDate() }}</span
        >
        <span v-else>{{ notice?.timestamp.toDate().getDate() }}</span>
      </div>
      <div
        class="sm:flex justify-center items-center col-span-2 border-r border-b border-white p-3 text-center"
      >
        {{ notice?.views }}
      </div>
      <div
        class="sm:flex justify-center items-center text-center col-span-2 border-r border-b border-white py-3 px-1 sm:px-3 text-xs"
      >
        <span>{{ notice?.name }}</span>
        <span v-if="notice?.admin" class="block sm:inline">(관리자)</span>
      </div>
    </div>
  </div>

  <div v-if="noticesPage" class="mt-4 flex justify-center gap-2">
    <div class="bg-gray-200 px-2 py-1 cursor-pointer" @click="[(currentPage = 0)]">
      &lt&lt
    </div>
    <div
      class="bg-gray-200 px-3 py-1 cursor-pointer"
      v-for="listNumber in noticesPage?.length"
      @click="[(currentPage = listNumber - 1)]"
    >
      {{ listNumber }}
    </div>
    <div
      class="bg-gray-200 px-2 py-1 cursor-pointer"
      @click="[(currentPage = noticesPage?.length - 1)]"
    >
      &gt&gt
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { inject, ref } from "vue";
import { onSnapshotPostsPage } from "../../firebase/post";

const router = useRouter();

const userProfile = inject("userProfile");
const currentPage = ref(0);
const noticesPage = onSnapshotPostsPage("notices");

const pushUpload = async () => router.push({ path: "/notice/upload" });

const movePost = (post) => {
  router.push({
    path: `/notice/post/${post.id}`,
  });
};
</script>
