<template>
  <form class="px-5" @submit.prevent="upload">
    <div>
      <label
        for="title"
        class="block mb-1 text-lg font-bold text-gray-900 dark:text-gray-300"
        >제목</label
      >
      <input
        type="text"
        id="title"
        class="mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        placeholder="제목을 입력하세요."
        required
        v-model="title"
      />
    </div>

    <div class="flex gap-12 mb-5">
      <div>
        <label
          for="start-date"
          class="form-label inline-block mb-1 text-lg font-bold text-gray-900 dark:text-gray-300"
          >이벤트 시작</label
        >
        <input
          v-model="startDate"
          type="date"
          name="start-date"
          id="start-date"
          class="block bg-gray-50 border border-gray-300 rounded px-1 transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none text-base font-normal text-gray-700"
          required
        />
      </div>
      <div>
        <label
          for="end-date"
          class="form-label inline-block mb-1 text-lg font-bold text-gray-900 dark:text-gray-300"
          >이벤트 종료</label
        >
        <input
          v-model="endDate"
          type="date"
          name="end-date"
          id="end-date"
          class="block bg-gray-50 border border-gray-300 rounded px-1 transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none text-base font-normal text-gray-700"
          required
          :min="startDate"
        />
      </div>
    </div>

    <TuiEditor v-if="content" v-model="content" @add-image="addImage"></TuiEditor>
    <button
      class="mr-5 mt-4 float-right bg-indigo-500 py-2 px-3 rounded-md text-white"
      type="submit"
    >
      <font-awesome-icon icon="fa-solid fa-upload" class="mr-2" />업로드
    </button>

    <Teleport to="#modal">
      <div class="modal-bg" v-if="loading">
        <font-awesome-icon
          icon="fa-solid fa-spinner"
          size="5x"
          spin-pulse
          class="text-white"
        />
      </div>
    </Teleport>
  </form>
</template>

<script setup>
import { ref, inject, onBeforeMount } from "vue";
import {
  updateEvent,
  getTitle,
  getContent,
  getStartDate,
  getEndDate,
} from "../../firebase/post";
import { uploadFile, getUrl } from "../../firebase/firestore";
import { useRouter } from "vue-router";
import { useRouteParams } from "@vueuse/router";
import TuiEditor from "../../components/editor/TuiEditor.vue";

const router = useRouter();
const postId = useRouteParams("post_id").value;

const userProfile = inject("userProfile");
const title = ref();
const startDate = ref();
const endDate = ref();
const content = ref();

const loading = ref(false);

onBeforeMount(async () => {
  title.value = await getTitle("events", postId);
  content.value = await getContent("events", postId);
  startDate.value = await getStartDate("events", postId);
  endDate.value = await getEndDate("events", postId);
});

const upload = async () => {
  loading.value = true;

  await updateEvent(
    title,
    startDate,
    endDate,
    content,
    userProfile?.value?.name,
    userProfile?.value?.admin,
    postId
  );
  loading.value = false;
  router.go(-1);
};

const addImage = async (file, callback) => {
  const imagePath = `images/${file.name}`;
  uploadFile(imagePath, file);
  const image = await getUrl(imagePath);

  callback(image);
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
</style>
