<template>
  <div v-if="projectData" class="px-10">
    <div class="flex">
      <div
        class="w-full max-w-[260px] h-80 bg-cover shadow-lg"
        :style="{ backgroundImage: `url(${projectData?.img})` }"
      ></div>
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
        <div class="grid grid-cols-12">
          <div class="col-span-2 font-bold">첨부파일</div>
          <div class="col-span-10">
            <a
              v-for="(name, i) in projectData?.filesName"
              :key="i"
              :href="projectData?.filesUrl[i]"
              target="_blank"
              class="mr-4 text-blue-600 underline"
              >{{ name }}</a
            >
          </div>
        </div>
        <div class="flex justify-between mt-10">
          <button
            class="p-2 border-4 border-red-400 rounded-md box-content"
            @click="pushProjectLike('graduations', postId, projectId)"
          >
            <span class="text-red-400"
              ><font-awesome-icon icon="fa-solid fa-heart"
            /></span>
            <span class="font-bold ml-2">좋아요</span>
            <span class="ml-2 mr-1">{{ projectData?.likes }}</span>
          </button>
          <div>
            <button
              v-if="projectData?.uid === user?.uid"
              class="bg-indigo-500 py-2 px-3 rounded-md text-white"
              @click="updateProject"
            >
              <font-awesome-icon icon="fa-solid fa-upload" class="mr-2" />수정
            </button>

            <button
              v-if="projectData?.uid === user?.uid"
              class="bg-indigo-500 py-2 px-3 rounded-md text-white ml-4"
              @click="deleteBtn"
            >
              <font-awesome-icon icon="fa-solid fa-trash" class="mr-2" />삭제
            </button>
          </div>
        </div>
      </div>
    </div>
    <h3 class="text-2xl font-bold my-5 pb-2 border-b border-gray-400">상세설명</h3>
    <TuiViewer
      v-if="projectData?.description"
      :content="projectData?.description"
    ></TuiViewer>
    <h2 class="mt-16 mb-5 text-2xl font-bold pb-2 border-b border-gray-400">평가</h2>
    <Chart
      v-if="perfectionSum && creativitySum && technicalitySum && businessSum && designSum"
      :perfectionSum="perfectionSum"
      :creativitySum="creativitySum"
      :technicalitySum="technicalitySum"
      :businessSum="businessSum"
      :designSum="designSum"
    ></Chart>
    <!-- 평가하지 않았을때 나타남 -->
    <div class="text-end" v-if="!isReview">
      <!-- 버튼 클릭시 평가 모달창 나타남 -->
      <button
        class="bg-indigo-500 py-3 px-4 rounded-md text-white text-lg close-btn"
        @click="isModalOpen = true"
      >
        <span><font-awesome-icon icon="fa-solid fa-clipboard-check" /></span>
        <span class="ml-2">평가하기</span>
      </button>
    </div>
    <!-- 평가했을때 나타남 -->
    <div v-else class="mt-5">
      <h3 class="text-lg font-bold">나의 평가</h3>
      <div>
        <span class="mr-4">완성도: {{ myReviewData?.perfection }}</span>
        <span class="mr-4">창의성: {{ myReviewData?.creativity }}</span>
        <span class="mr-4">기술성: {{ myReviewData?.technicality }}</span>
        <span class="mr-4">사업성: {{ myReviewData?.business }}</span>
        <span>예술성: {{ myReviewData?.design }}</span>
        <button
          class="bg-indigo-500 py-2 px-3 rounded-md text-white text-lg float-right"
          @click="
            [deleteMyProjectReview('graduations', postId, projectId), (isReview = false)]
          "
        >
          <span><font-awesome-icon icon="fa-solid fa-trash" /></span>
          <span class="ml-2">삭제</span>
        </button>
      </div>
    </div>
    <Teleport to="#modal">
      <Transition name="modal">
        <div class="modal-bg" v-if="isModalOpen">
          <div class="modal" ref="modal">
            <form
              @submit.prevent="
                [
                  createProjectReview(
                    'graduations',
                    postId,
                    projectId,
                    perfection,
                    creativity,
                    technicality,
                    business,
                    design
                  ),
                  (isModalOpen = false),
                  checkReview(),
                  getReview(),
                ]
              "
            >
              <button class="close-btn" @click="isModalOpen = false">x</button>
              <Review
                @send-perfection="getPerfection"
                @send-creativity="getCreativity"
                @send-technicality="getTechnicality"
                @send-business="getBusiness"
                @send-design="getDesign"
              ></Review>
              <div v-if="user" class="flex justify-center mt-5">
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
    <AddComment v-if="!isComment" :menu="menu" @submit="checkComment"></AddComment>
    <Comment
      v-if="commentsData"
      v-for="commentData in commentsData"
      :rating="commentData?.rating"
      :comment="commentData?.comment"
      :name="commentData?.name"
      :comment-uid="commentData?.uid"
      :comment-id="commentData?.id"
      :menu="menu"
      class="mb-4 pb-4 border-b border-gray-300"
      @submit="router.go(0)"
    ></Comment>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import { useRouteParams } from "@vueuse/router";
import {
  getTitle,
  onSnapshotProject,
  pushProjectLike,
  updateViewsProjectCount,
  createProjectReview,
  checkProjectReview,
  getMyProjectReview,
  deleteMyProjectReview,
  onSnapshotProjectReviews,
  checkProjectComments,
  onSnapshotProjectComments,
  deleteProject,
} from "../../firebase/post";
import { user } from "../../firebase/user";
import TuiViewer from "../../components/editor/TuiViewer.vue";
import Chart from "../../components/Chart.vue";
import AddComment from "../../components/AddComment.vue";
import Comment from "../../components/Comment.vue";
import Review from "../../components/Review.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const postId = useRouteParams("post_id").value;
const projectId = useRouteParams("project_id").value;
const graduationTitle = ref("");
const projectData = onSnapshotProject("graduations", postId, projectId);
const menu = ref("graduations");

const props = defineProps({
  perfectionSum: Number,
  creativitySum: Number,
  technicalitySum: Number,
  businessSum: Number,
  designSum: Number,
  comment: String,
  rating: Number,
  name: String,
  commentUid: String,
  commentId: String,
  menu: String,
});

const {
  perfectionSum,
  creativitySum,
  technicalitySum,
  businessSum,
  designSum,
} = onSnapshotProjectReviews("graduations", postId, projectId);

const isModalOpen = ref(false);
const modal = ref(null);

const perfection = ref();
const creativity = ref();
const technicality = ref();
const business = ref();
const design = ref();

const isReview = ref(false);
const isComment = ref(false);

onClickOutside(modal, () => (isModalOpen.value = false));

const getPerfection = (payload) => {
  perfection.value = payload;
};
const getCreativity = (payload) => {
  creativity.value = payload;
};
const getTechnicality = (payload) => {
  technicality.value = payload;
};
const getBusiness = (payload) => {
  business.value = payload;
};
const getDesign = (payload) => {
  design.value = payload;
};

const myReviewData = ref();

const checkReview = async () => {
  isReview.value = await checkProjectReview("graduations", postId, projectId);
};
const getReview = async () => {
  myReviewData.value = await getMyProjectReview("graduations", postId, projectId);
};

const checkComment = async () => {
  isComment.value = await checkProjectComments("graduations", postId, projectId);
};

const commentsData = onSnapshotProjectComments("graduations", postId, projectId);

onBeforeMount(async () => {
  graduationTitle.value = await getTitle("graduations", postId);
  checkReview();
  getReview();
  checkComment();
  updateViewsProjectCount("graduations", postId, projectId);
});

const updateProject = () => {
  router.push({
    path: `/graduation/${postId}/project/${projectId}/update`,
  });
};

const deleteBtn = async () => {
  await deleteProject("graduations", postId, projectId);
  router.push({
    path: `/graduation/info/${postId}`,
  });
};
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
