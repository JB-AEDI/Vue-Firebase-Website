<template>
  <div class="sm:flex px-8">
    <div
      class="w-full mb-4 sm:mb-0 sm:w-64 sm:h-96 bg-gray-200 flex justify-center items-center"
    >
      <img :src="postData?.img" alt="poster" class="w-full" />
    </div>
    <div class="sm:pl-6 w-full sm:w-4/5">
      <div class="h-5/6">
        <div class="border-b border-gray-300 pb-2">
          <span class="text-red-400 mr-1.5"
            ><font-awesome-icon icon="fa-solid fa-heart"
          /></span>
          <span class="mr-4">{{ postData?.likes }}</span>
          <span>프로젝트 수 - </span>
          <span>{{ postData?.projects }}</span>
        </div>
        <div class="border-b border-gray-300 py-2">
          <h1 class="text-xl font-bold mb-3">
            {{ postData?.title }}
          </h1>
          <div class="flex flex-col gap-1">
            <div>
              <span class="text-gray-400 inline-block w-24">학교</span>
              <span>{{ postData?.university }}</span>
            </div>
            <div>
              <span class="text-gray-400 inline-block w-24">학과</span>
              <span>{{ postData?.department }}</span>
            </div>
            <div>
              <span class="text-gray-400 inline-block w-24">연도</span>
              <span>{{ postData?.year }}</span>
            </div>
          </div>
        </div>
        <div class="mt-2">
          <div class="flex flex-col gap-1">
            <div class="flex">
              <span class="text-gray-400 inline-block w-24">게시일</span>
              <div v-if="postData?.timestamp">
                <span>{{ postData?.timestamp.toDate().getFullYear() }}</span>
                <span>-</span>
                <span v-if="postData?.timestamp.toDate().getMonth() < 9"
                  >0{{ postData?.timestamp.toDate().getMonth() + 1 }}</span
                >
                <span v-else>{{
                  postData?.timestamp.toDate().getMonth() + 1
                }}</span>
                <span>-</span>
                <span v-if="postData?.timestamp.toDate().getDate() < 10"
                  >0{{ postData?.timestamp.toDate().getDate() }}</span
                >
                <span v-else>{{ postData?.timestamp.toDate().getDate() }}</span>
              </div>
            </div>
            <div>
              <span class="text-gray-400 inline-block w-24">조회수</span>
              <span>{{ postData?.views }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="h-1/6 flex flex-col justify-end items-start mt-2 sm:mt-0">
        <div class="w-full flex-col">
          <div class="text-xs sm:text-base">
            <button
              class="p-3 bg-yellow-300 rounded-md"
              @click="openUrl(postData?.url)"
            >
              <span class="font-bold">졸업작품 발표회 바로가기</span>
              <span class="ml-1 sm:ml-3"
                ><font-awesome-icon icon="fa-solid fa-chevron-right"
              /></span>
            </button>
            <button
              class="mt-2 ml-4 sm:mt-0 sm:ml-12 p-2 border-4 border-red-400 rounded-md box-content"
              @click="pushLike('graduations', postId)"
            >
              <span class="text-red-400"
                ><font-awesome-icon icon="fa-solid fa-heart"
              /></span>
              <span class="font-bold ml-2">좋아요</span>
            </button>
          </div>
          <div class="flex sm:justify-end mt-2 sm:mt-0">
            <button
              v-if="userProfile.admin"
              @click="updatePost(postId)"
              class="mr-3 bg-indigo-500 py-2 px-3 rounded-md text-white"
            >
              <font-awesome-icon icon="fa-solid fa-upload" class="mr-2" />수정
            </button>

            <button
              v-if="userProfile.admin"
              @click="[deleteProjectPost('graduations', postId), backList()]"
              class="bg-indigo-500 py-2 px-3 rounded-md text-white"
            >
              <font-awesome-icon icon="fa-solid fa-trash" class="mr-2" />삭제
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="px-5 mt-24 mb-10">
    <div class="pb-3 border-b border-gray-400">
      <div class="flex justify-between items-center">
        <span class="font-bold text-xl">프로젝트</span>
        <button
          v-if="user?.emailVerified"
          @click="uploadProject"
          class="px-3 py-2 bg-yellow-300 rounded-md"
        >
          업로드
        </button>
      </div>
      <div>
        <span v-if="selectedTime" class="cursor-pointer" @click="onClickTime">
          <font-awesome-icon icon="fa-solid fa-clock" class="text-sky-400" />
          <span class="text-sm ml-1 hidden sm:inline text-sky-400">시간순</span>
          <font-awesome-icon
            v-if="timeOrder == 'desc'"
            icon="fa-solid fa-arrow-up"
            class="ml-1"
          />
          <font-awesome-icon
            v-if="timeOrder == 'asc'"
            icon="fa-solid fa-arrow-down"
            class="ml-1"
          />
        </span>
        <span v-else class="cursor-pointer" @click="selectTime">
          <font-awesome-icon icon="fa-solid fa-clock" class="text-slate-400" />
          <span class="text-sm ml-1 hidden sm:inline text-slate-400"
            >시간순</span
          >
          <font-awesome-icon
            icon="fa-solid fa-arrow-up"
            class="ml-1 text-slate-400"
          />
        </span>
        <span
          v-if="selectedHot"
          class="ml-6 cursor-pointer"
          @click="onClickHot"
        >
          <font-awesome-icon icon="fa-brands fa-hotjar" class="text-red-600" />
          <span class="text-sm ml-1 hidden sm:inline text-red-600">추천순</span>
          <font-awesome-icon
            v-if="hotOrder == 'desc'"
            icon="fa-solid fa-arrow-up"
            class="ml-1"
          />
          <font-awesome-icon
            v-if="hotOrder == 'asc'"
            icon="fa-solid fa-arrow-down"
            class="ml-1"
          />
        </span>
        <span v-else class="ml-6 cursor-pointer" @click="selectHot">
          <font-awesome-icon
            icon="fa-brands fa-hotjar"
            class="text-slate-400"
          />
          <span class="text-sm ml-1 hidden sm:inline text-slate-400"
            >추천순</span
          >
          <font-awesome-icon
            icon="fa-solid fa-arrow-up"
            class="ml-1 text-slate-400"
          />
        </span>
        <span
          v-if="selectedView"
          class="ml-6 cursor-pointer"
          @click="onClickView"
        >
          <font-awesome-icon icon="fa-solid fa-eye" class="text-emerald-600" />
          <span class="text-sm ml-1 hidden sm:inline text-emerald-600"
            >조회순</span
          >
          <font-awesome-icon
            v-if="viewOrder == 'desc'"
            icon="fa-solid fa-arrow-up"
            class="ml-1"
          />
          <font-awesome-icon
            v-if="viewOrder == 'asc'"
            icon="fa-solid fa-arrow-down"
            class="ml-1"
          />
        </span>
        <span v-else class="ml-6 cursor-pointer" @click="selectView">
          <font-awesome-icon icon="fa-solid fa-eye" class="text-slate-400" />
          <span class="text-sm ml-1 hidden sm:inline text-slate-400"
            >조회순</span
          >
          <font-awesome-icon
            icon="fa-solid fa-arrow-up"
            class="ml-1 text-slate-400"
          />
        </span>
      </div>
    </div>
    <ProjectList :projects="projects" :menu="menu"></ProjectList>
  </div>
</template>

<script setup>
import { inject, onMounted, ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useRouteParams } from "@vueuse/router";
import { user } from "../../firebase/user";
import {
  onSnapshotPost,
  updateViewsCount,
  pushLike,
  deleteProjectPost,
} from "../../firebase/post";
import ProjectList from "../../components/ProjectList.vue";
import { db } from "../../firebase/firebase";
import { useFirestore } from "@vueuse/firebase";
import { collection, orderBy, query } from "@firebase/firestore";

const router = useRouter();

const userProfile = inject("userProfile");
const postId = useRouteParams("post_id").value;
const postData = onSnapshotPost("graduations", postId);

const postsOrder = ref("timestamp");
const postsOrderOption = ref("desc");
const postsQuery = computed(() =>
  query(
    collection(db, "graduations", postId, "projects"),
    orderBy(postsOrder.value, postsOrderOption.value)
  )
);
const projects = useFirestore(postsQuery);
// const projects = onSnapshotProjects("graduations", postId);
const menu = ref("graduation");

const selectedTime = ref(true);
const selectedHot = ref(false);
const selectedView = ref(false);

const timeOrder = ref("desc");
const hotOrder = ref("desc");
const viewOrder = ref("desc");

const onClickTime = () => {
  if (timeOrder.value == "desc") {
    timeOrder.value = "asc";
  } else if (timeOrder.value == "asc") {
    timeOrder.value = "desc";
  }
  postsOrderOption.value = timeOrder.value;
};

const onClickHot = () => {
  if (hotOrder.value == "desc") {
    hotOrder.value = "asc";
  } else if (hotOrder.value == "asc") {
    hotOrder.value = "desc";
  }
  postsOrderOption.value = hotOrder.value;
};

const onClickView = () => {
  if (viewOrder.value == "desc") {
    viewOrder.value = "asc";
  } else if (viewOrder.value == "asc") {
    viewOrder.value = "desc";
  }
  postsOrderOption.value = viewOrder.value;
};

const selectTime = () => {
  selectedTime.value = true;
  selectedHot.value = false;
  selectedView.value = false;

  timeOrder.value = "desc";
  hotOrder.value = "desc";
  viewOrder.value = "desc";

  postsOrder.value = "timestamp";
  postsOrderOption.value = timeOrder.value;
};

const selectHot = () => {
  selectedTime.value = false;
  selectedHot.value = true;
  selectedView.value = false;

  timeOrder.value = "desc";
  hotOrder.value = "desc";
  viewOrder.value = "desc";

  postsOrder.value = "likes";
  postsOrderOption.value = hotOrder.value;
};

const selectView = () => {
  selectedTime.value = false;
  selectedHot.value = false;
  selectedView.value = true;

  timeOrder.value = "desc";
  hotOrder.value = "desc";
  viewOrder.value = "desc";

  postsOrder.value = "views";
  postsOrderOption.value = viewOrder.value;
};

const props = defineProps({
  menu: String,
});

onMounted(() => {
  updateViewsCount("graduations", postId);
});

const openUrl = (url) => {
  window.open(url, "_blank");
};

const updatePost = (post_id) => {
  router.push({
    path: `/graduation/info/${post_id}/update`,
  });
};

const backList = () => {
  router.push({
    path: `/graduation/page/`,
  });
};

const uploadProject = () => {
  router.push({
    path: `/graduation/info/${postId}/project/upload`,
  });
};
</script>
