<template>
  <form v-if="userProfile?.admin" class="px-5" @submit.prevent="upload">
    <div>
      <label
        for="title"
        class="block ml-1 mb-1 text-lg font-bold text-gray-900 dark:text-gray-300"
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

    <div>
      <label
        for="host"
        class="block ml-1 mb-1 text-lg font-bold text-gray-900 dark:text-gray-300"
        >주최</label
      >
      <input
        type="text"
        id="host"
        class="mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        placeholder="주최사를 입력하세요."
        required
        v-model="host"
      />
    </div>

    <div>
      <label
        for="supervision"
        class="block ml-1 mb-1 text-lg font-bold text-gray-900 dark:text-gray-300"
        >주관</label
      >
      <input
        type="text"
        id="supervision"
        class="mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        placeholder="주관사를 입력하세요."
        required
        v-model="supervision"
      />
    </div>

    <div>
      <label
        for="sponsor"
        class="block ml-1 mb-1 text-lg font-bold text-gray-900 dark:text-gray-300"
        >후원</label
      >
      <input
        type="text"
        id="sponsor"
        class="mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        placeholder="후원사를 입력하세요."
        required
        v-model="sponsor"
      />
    </div>

    <div class="flex gap-12 mb-5">
      <div>
        <label
          for="start-date"
          class="form-label inline-block mb-1 text-lg font-bold text-gray-900 dark:text-gray-300"
          >접수 시작</label
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
          >접수 종료</label
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

    <div>
      <label
        for="target"
        class="block ml-1 mb-1 text-lg font-bold text-gray-900 dark:text-gray-300"
        >대상</label
      >
      <input
        type="text"
        id="target"
        class="mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        placeholder="대상을 입력하세요."
        required
        v-model="target"
      />
    </div>

    <div>
      <label
        for="field"
        class="block ml-1 mb-1 text-lg font-bold text-gray-900 dark:text-gray-300"
        >분야</label
      >
      <input
        type="text"
        id="field"
        class="mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        placeholder="분야을 입력하세요."
        required
        v-model="field"
      />
    </div>

    <div>
      <label
        for="url"
        class="block ml-1 mb-1 text-lg font-bold text-gray-900 dark:text-gray-300"
        >사이트링크</label
      >
      <input
        type="text"
        id="url"
        class="mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        placeholder="링크를 입력하세요."
        required
        v-model="url"
      />
    </div>

    <div class="mb-3">
      <label
        for="formFile"
        class="form-label inline-block mb-2 text-lg font-bold text-gray-900 dark:text-gray-300"
        >이미지</label
      >
      <input
        class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        type="file"
        id="formFile"
        @change="handleFileChange"
        required
        accept="image/*"
      />
    </div>
    <img :src="previewImgSrc" alt="preview-image" class="max-w-sm" />

    <button
      class="mb-10 mr-5 mt-4 float-right bg-indigo-500 py-2 px-3 rounded-md text-white"
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
  <div v-else>잘못된 접근입니다.</div>
</template>

<script setup>
import { ref, inject } from "vue";

import { createContest } from "../../firebase/post";
import { uploadFile } from "../../firebase/firestore";
import { useRouter } from "vue-router";

const router = useRouter();
const userProfile = inject("userProfile");

const title = ref("");
const host = ref("");
const supervision = ref("");
const sponsor = ref("");
const startDate = ref("");
const endDate = ref("");
const target = ref("");
const field = ref("");
const url = ref("");
const previewImgSrc = ref("https://via.placeholder.com/384x500?text=Upload+Image");
const imgSrc = ref("");

const loading = ref(false);

let formFile = null;
let formFilePath = null;
let formFixFilePath = null;

const handleFileChange = (input) => {
  const reader = new FileReader();

  reader.onload = (e) => {
    previewImgSrc.value = e.target.result;
  };
  reader.readAsDataURL(input.target.files[0]);

  formFile = input.target.files[0];
  const fileName = formFile.name;
  formFilePath = "images/contests/" + fileName;
  const fileNameArray = fileName.split(".");
  let fileNameSum = "";
  for (let i = 0; i < fileNameArray.length - 1; i++) {
    if (i == fileNameArray.length - 2) {
      fileNameSum = fileNameSum + fileNameArray[i];
    } else {
      fileNameSum = fileNameSum + fileNameArray[i] + ".";
    }
  }
  const fixFileName = fileNameSum + "_800x1200.webp";
  formFixFilePath = "images/contests/" + fixFileName;
};

const upload = async () => {
  loading.value = true;
  if (formFile !== null && formFilePath !== null) {
    await uploadFile(formFilePath, formFile);
    imgSrc.value =
      "https://storage.googleapis.com/aedi--project.appspot.com/" + formFixFilePath;
  }
  await createContest(
    title,
    host,
    supervision,
    sponsor,
    startDate,
    endDate,
    target,
    field,
    imgSrc,
    url,
    formFixFilePath
  );
  loading.value = false;
  router.push({
    path: `/contest/page`,
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
</style>
