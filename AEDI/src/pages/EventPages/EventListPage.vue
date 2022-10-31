<template>
  <div v-if="userProfile.admin" class="px-5 pt-4 pb-2 flex justify-end">
    <button
      @click="pushUpload"
      class="bg-indigo-500 py-2 px-3 rounded-md text-white"
    >
      <font-awesome-icon icon="fa-solid fa-upload" class="mr-2" />업로드
    </button>
  </div>

  <div class="p-5">
    <div
      class="grid grid-cols-12 bg-indigo-500 text-white border-b border-white text-xs sm:text-base"
    >
      <div class="flex justify-center items-center col-span-5 border-y p-3">
        제목
      </div>
      <div
        class="flex justify-center items-center col-span-2 border p-1 sm:p-3"
      >
        주최사
      </div>
      <div
        class="flex justify-center items-center col-span-2 border-y border-r p-1 sm:p-3"
      >
        조회수
      </div>
      <div
        class="flex justify-center items-center col-span-3 border-y border-r p-3"
      >
        진행상태
      </div>
    </div>

    <!-- 중요 공지 -->
    <div
      class="grid grid-cols-12 bg-gray-300"
      v-if="importantEvents"
      v-for="importantEvent in importantEvents?.value"
    >
      <div class="col-span-5 border-r border-b border-white p-3">
        <span
          class="cursor-pointer font-bold"
          @click="movePost(importantEvent)"
          >{{ importantEvent?.title }}</span
        >
      </div>
      <div
        class="col-span-2 border-r border-b border-white p-3 text-center text-sm sm:text-base"
      >
        AEDI
      </div>
      <div
        class="col-span-2 border-r border-b border-white p-3 text-center text-sm sm:text-base"
      >
        {{ importantEvent?.views }}
      </div>
      <div
        class="col-span-3 border-r border-b border-white p-2 sm:p-3 text-center text-xs sm:text-base"
      >
        <span class="block sm:inline">{{ importantEvent?.startDate }}</span>
        <span class="block sm:inline sm:mx-2">~</span>
        <span class="block sm:inline">{{ importantEvent?.endDate }}</span>
      </div>
    </div>

    <div
      v-if="eventsPage"
      v-for="event in eventsPage[currentPage]"
      class="grid grid-cols-12 bg-gray-200"
    >
      <div class="col-span-5 border-r border-b border-white p-3">
        <span class="cursor-pointer font-bold" @click="movePost(event)">
          {{ event?.title }}
        </span>
      </div>
      <div
        class="col-span-2 border-r border-b border-white p-3 text-center text-sm sm:text-base"
      >
        AEDI
      </div>
      <div
        class="col-span-2 border-r border-b border-white p-3 text-center text-sm sm:text-base"
      >
        {{ event?.views }}
      </div>
      <div
        class="col-span-3 border-r border-b border-white p-2 sm:p-3 text-center text-xs sm:text-base"
      >
        <span class="block sm:inline">{{ event?.startDate }}</span>
        <span class="block sm:inline sm:mx-2">~</span>
        <span class="block sm:inline">{{ event?.endDate }}</span>
      </div>
    </div>
  </div>

  <div v-if="eventsPage" class="mt-4 flex justify-center gap-2">
    <div
      class="bg-gray-200 px-2 py-1 cursor-pointer"
      @click="[(currentPage = 0)]"
    >
      &lt&lt
    </div>
    <div
      class="bg-gray-200 px-3 py-1 cursor-pointer"
      v-for="listNumber in eventsPage?.length"
      @click="[(currentPage = listNumber - 1)]"
    >
      {{ listNumber }}
    </div>
    <div
      class="bg-gray-200 px-2 py-1 cursor-pointer"
      @click="[(currentPage = eventsPage?.length - 1)]"
    >
      &gt&gt
    </div>
  </div>
</template>

<script setup>
import { useRouter, RouterLink } from "vue-router";
import { inject, onBeforeMount, ref } from "vue";
import {
  onSnapshotPostsPage,
  onSnapshotImportantPosts,
} from "../../firebase/post";

const router = useRouter();
const userProfile = inject("userProfile");

const currentPage = ref(0);
const eventsPage = onSnapshotPostsPage("events");
const importantEvents = ref([]);
onBeforeMount(async () => {
  importantEvents.value = await onSnapshotImportantPosts("events");
});

const pushUpload = async () => router.push({ path: "/event/upload" });

const movePost = (post) => {
  router.push({
    path: `/event/post/${post.id}`,
  });
};
</script>
