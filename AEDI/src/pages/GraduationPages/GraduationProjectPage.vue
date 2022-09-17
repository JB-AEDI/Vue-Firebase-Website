<template>
  <div v-if="projectData" class="px-10">
    <div class="flex">
      <div class="w-full max-w-[260px] h-72 bg-gray-200 flex justify-center items-center">
        <img :src="projectData?.img" alt="project-img" class="w-full" />
      </div>
      <div class="w-full pl-6 flex flex-col gap-2 mt-2">
        <div class="grid grid-cols-12">
          <div class="col-span-2 font-bold">졸업작품</div>
          <div class="col-span-10">{{ graduationTitle }}</div>
        </div>
        <div class="grid grid-cols-12">
          <div class="col-span-2 font-bold">프로젝트명</div>
          <div class="col-span-10">{{ projectData?.title }}</div>
        </div>
        <div class="grid grid-cols-12">
          <div class="col-span-2 font-bold">작성자</div>
          <div class="col-span-10">{{ projectData?.name }}</div>
        </div>
        <div class="grid grid-cols-12">
          <div class="col-span-2 font-bold">작성시간</div>
          <div class="col-span-10">
            <span>{{ projectData?.timestamp.toDate().getFullYear() }}</span>
            <span class="mx-0.5">-</span>
            <span v-if="projectData?.timestamp.toDate().getMonth() < 9"
              >0{{ projectData?.timestamp.toDate().getMonth() + 1 }}</span
            >
            <span v-else>{{ projectData?.timestamp.toDate().getMonth() + 1 }}</span>
            <span class="mx-0.5">-</span>
            <span v-if="projectData?.timestamp.toDate().getDate() < 10"
              >0{{ projectData?.timestamp.toDate().getDate() }}</span
            >
            <span v-else>{{ projectData?.timestamp.toDate().getDate() }}</span>

            <span v-if="projectData?.timestamp.toDate().getHours() < 10" class="ml-2"
              >0{{ projectData?.timestamp.toDate().getHours() }}</span
            >
            <span v-else class="ml-3">{{
              projectData?.timestamp.toDate().getHours()
            }}</span>
            <span class="mx-0.5">:</span>
            <span v-if="projectData?.timestamp.toDate().getMinutes() < 10"
              >0{{ projectData?.timestamp.toDate().getMinutes() }}</span
            >
            <span v-else>{{ projectData?.timestamp.toDate().getMinutes() }}</span>
            <span class="mx-0.5">:</span>
            <span v-if="projectData?.timestamp.toDate().getSeconds() < 10"
              >0{{ projectData?.timestamp.toDate().getSeconds() }}</span
            >
            <span v-else>{{ projectData?.timestamp.toDate().getSeconds() }}</span>
          </div>
        </div>
        <div class="grid grid-cols-12">
          <div class="col-span-2 font-bold">조회수</div>
          <div class="col-span-10">{{ projectData?.views }}</div>
        </div>
        <div class="flex justify-between mt-10">
          <button
            class="p-2 border-4 border-yellow-300 rounded-md box-content"
            @click="pushGraduationProjectLike(postId, projectId)"
          >
            <span class="text-yellow-300"><i class="fa-solid fa-star"></i></span>
            <span class="font-bold ml-2">좋아요</span>
            <span class="ml-2 mr-1">{{ projectData?.likes }}</span>
          </button>

          <button
            v-if="projectData?.uid === user?.uid"
            class="bg-indigo-500 py-2 px-3 rounded-md text-white"
          >
            <i class="fa-solid fa-upload mr-2"></i>수정
          </button>
        </div>
      </div>
    </div>
    <h3 class="text-2xl font-bold my-5 pb-2 border-b border-gray-400">상세설명</h3>
    <TuiViewer
      v-if="projectData?.description"
      :content="projectData?.description"
    ></TuiViewer>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouteParams } from "@vueuse/router";
import {
  getTitle,
  onSnapshotProject,
  pushGraduationProjectLike,
  updateViewsProjectCount,
} from "../../firebase/post";
import { user } from "../../firebase/user";
import TuiViewer from "../../components/editor/TuiViewer.vue";

const postId = useRouteParams("post_id").value;
const projectId = useRouteParams("project_id").value;
const graduationTitle = ref("");
const projectData = onSnapshotProject("graduations", postId, projectId);

onMounted(async () => {
  graduationTitle.value = await getTitle("graduations", postId);
  updateViewsProjectCount("graduations", postId, projectId);
});
</script>
