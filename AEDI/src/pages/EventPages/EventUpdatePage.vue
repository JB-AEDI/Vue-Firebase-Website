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
    <div class="mb-3">
      <label
        for="formFile"
        class="form-label inline-block mb-1 text-lg font-bold text-gray-900 dark:text-gray-300"
        >첨부파일</label
      >
      <input
        class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        type="file"
        id="formFile"
        @change="handleFileChange"
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
      <i class="fa-solid fa-upload mr-2"></i>업로드
    </button>
  </form>
</template>

<script setup>
import { ref, inject, onMounted } from "vue";
import {
  updateEvent,
  uploadFile,
  getUrl,
  getTitle,
  getContent,
  getStartDate,
  getEndDate,
} from "../../firebase/post";
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

onMounted(async () => {
  title.value = await getTitle("events", postId);
  content.value = await getContent("events", postId);
  startDate.value = await getStartDate("events", postId);
  endDate.value = await getEndDate("events", postId);
});

let formFile = null;
let formFilePath = null;

const handleFileChange = (e) => {
  formFile = e.target.files[0];
  formFilePath = "file/" + formFile.name;
};

const upload = () => {
  updateEvent(
    title,
    startDate,
    endDate,
    content,
    userProfile?.value?.name,
    userProfile?.value?.admin,
    postId
  );
  if (formFile !== null && formFilePath !== null) {
    uploadFile(formFilePath, formFile);
  }
  router.go(-1);
};

const addImage = async (file, callback) => {
  const imagePath = `images/${file.name}`;
  uploadFile(imagePath, file);
  const image = await getUrl(imagePath);

  callback(image);
};
</script>
