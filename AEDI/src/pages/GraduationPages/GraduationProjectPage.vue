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
            class="p-2 border-4 border-red-400 rounded-md box-content"
            @click="pushGraduationProjectLike(postId, projectId)"
          >
            <span class="text-red-400"><i class="fa-solid fa-heart"></i></span>
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
    <h2 class="mt-16 mb-5 text-2xl font-bold pb-2 border-b border-gray-400">평가</h2>
    <Chart :menu="menu"></Chart>
    <div class="text-end">
      <!-- 버튼 클릭시 평가 모달창 나타남 -->
      <button
        class="bg-indigo-500 py-3 px-4 rounded-md text-white text-lg close-btn"
        @click="isModalOpen = true"
      >
        <span><i class="fa-solid fa-clipboard-check"></i></span>
        <span class="ml-2">평가하기</span>
      </button>
    </div>
    <Teleport to="#modal">
      <Transition name="modal">
        <div class="modal-bg" v-if="isModalOpen">
          <div class="modal" ref="modal">
            <form @submit.prevent="[uploadReview(), (isModalOpen = false)]">
              <button class="close-btn" @click="isModalOpen = false">x</button>
              <Review></Review>
              <div class="flex justify-center mt-5">
                <button
                  class="bg-indigo-500 py-2 px-3 rounded-md text-white"
                  type="submit"
                >
                  평가하기
                </button>
              </div>
            </form>
          </div>
        </div>
      </Transition>
    </Teleport>
    <h2 class="mt-16 mb-5 text-2xl font-bold pb-2 border-b border-gray-400">댓글</h2>
    <AddComment></AddComment>
    <Comment v-for="i in 10" :comment="i"></Comment>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import { useRouteParams } from "@vueuse/router";
import {
  getTitle,
  onSnapshotProject,
  pushGraduationProjectLike,
  updateViewsProjectCount,
} from "../../firebase/post";
import { user } from "../../firebase/user";
import TuiViewer from "../../components/editor/TuiViewer.vue";
import Chart from "../../components/Chart.vue";
import AddComment from "../../components/AddComment.vue";
import Comment from "../../components/Comment.vue";
import Review from "../../components/Review.vue";

const postId = useRouteParams("post_id").value;
const projectId = useRouteParams("project_id").value;
const graduationTitle = ref("");
const projectData = onSnapshotProject("graduations", postId, projectId);

const props = defineProps({
  comment: Number,
  menu: String,
});

const menu = ref("graduations");

const isModalOpen = ref(false);
const modal = ref(null);

onClickOutside(modal, () => (isModalOpen.value = false));

const uploadReview = () => {
  console.log("평가 업로드");
};

onMounted(async () => {
  graduationTitle.value = await getTitle("graduations", postId);
  updateViewsProjectCount("graduations", postId, projectId);
});
</script>
<style>
.modal-bg {
  /* always fix our modal to the viewport */
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  /* Darken the Screen */
  background-color: rgba(0, 0, 0, 0.5);

  /* Center the modal itself */
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal {
  /* needed to position button */
  position: relative;

  /* these are all just for aesthetic purposes */
  background: white;
  padding: 50px 100px;
  border-radius: 5px;
  box-shadow: 0px 10px 5px 2px rgba(0, 0, 0, 0.1);
}
.modal .close-btn {
  /* put our modal in the top right */
  position: absolute;
  top: 10px;
  right: 15px;

  /* remove some of the default button styling */
  background: none;
  border: none;
  cursor: pointer;
}

.modal-enter-active,
.modal-leave-active {
  transition: all 0.25s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(1.1);
}
</style>
