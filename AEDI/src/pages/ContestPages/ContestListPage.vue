<template>
  <!--<Catgory></Catgory>-->

  <div class="px-5 pt-4 pb-2 flex justify-between items-center">
    <h3 class="ml-1 text-xl font-bold"><!--IT/웹/모바일/게임--></h3>
    <button
      v-if="userProfile.admin"
      @click="pushUpload"
      class="bg-indigo-500 py-2 px-3 rounded-md text-white"
    >
      <font-awesome-icon icon="fa-solid fa-upload" class="mr-2" />업로드
    </button>
  </div>

  <div class="p-5">
    <div
      class="grid grid-cols-12 bg-indigo-500 text-white text-center border-b border-white"
    >
      <div class="col-span-7 text-sm sm:text-base border p-3">공모전명</div>
      <div class="col-span-2 text-sm sm:text-base border-y border-r p-3">주최</div>
      <div class="col-span-3 text-sm sm:text-base border-y border-r p-3">접수기간</div>
    </div>

    <div
      v-if="contestsPage"
      v-for="contest in contestsPage[currentPage]"
      class="grid grid-cols-12 bg-gray-200"
    >
      <div class="col-span-7 border-x border-b border-white p-3 sm:pl-12">
        <div>
          <span class="font-bold cursor-pointer" @click="movePost(contest)">{{
            contest?.title
          }}</span>
        </div>
        <div class="flex items-center mt-1">
          <div
            class="inline-block border-2 border-red-400 py-0.5 px-1.5 rounded-lg text-sm"
          >
            <span class="text-red-400"
              ><font-awesome-icon icon="fa-solid fa-heart"
            /></span>
            <span class="ml-1">{{ contest?.likes }}</span>
          </div>
          <span class="font-semibold text-gray-800 text-sm mx-2">[분야]</span>
          <span class="text-gray-600">{{ contest?.field }}</span>
        </div>
      </div>
      <div
        class="flex justify-center items-center col-span-2 border-r border-b border-white p-3"
      >
        {{ contest?.host }}
      </div>
      <div
        class="flex items-center justify-center col-span-3 border-r border-b border-white p-2 sm:p-3 text-xs sm:text-sm"
      >
        <div>
          <div>{{ contest?.startDate }}</div>
          <div class="text-center">~</div>
          <div>{{ contest?.endDate }}</div>
        </div>
      </div>
    </div>
  </div>

  <div v-if="contestsPage" class="mt-4 flex justify-center gap-2">
    <div class="bg-gray-200 px-2 py-1 cursor-pointer" @click="[(currentPage = 0)]">
      &lt&lt
    </div>
    <div
      class="bg-gray-200 px-3 py-1 cursor-pointer"
      v-for="listNumber in contestsPage?.length"
      @click="[(currentPage = listNumber - 1)]"
    >
      {{ listNumber }}
    </div>
    <div
      class="bg-gray-200 px-2 py-1 cursor-pointer"
      @click="[(currentPage = contestsPage?.length - 1)]"
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
const contestsPage = onSnapshotPostsPage("contests");

const pushUpload = async () => router.push({ path: "/contest/upload" });

const movePost = (post) => {
  router.push({
    path: `/contest/info/${post.id}`,
  });
};
</script>
