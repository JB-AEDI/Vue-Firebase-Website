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
        for="year"
        class="block ml-1 mb-1 text-lg font-bold text-gray-900 dark:text-gray-300"
        >연도</label
      >
      <input
        type="number"
        id="year"
        class="mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        placeholder="연도를 입력하세요."
        required
        v-model="year"
        min="1950"
      />
    </div>
    <div>
      <label
        for="university"
        class="block ml-1 mb-1 text-lg font-bold text-gray-900 dark:text-gray-300"
        >대학</label
      >
      <input
        type="text"
        id="university"
        class="mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        placeholder="대학을 입력하세요."
        required
        v-model="university"
      />
    </div>
    <div>
      <label
        for="department"
        class="block ml-1 mb-1 text-lg font-bold text-gray-900 dark:text-gray-300"
        >학과</label
      >
      <input
        type="text"
        id="department"
        class="mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        placeholder="대학을 입력하세요."
        required
        v-model="department"
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
    <div v-if="isChangeImg" class="mb-3">
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

    <div v-else class="flex justify-between mb-4">
      <span class="font-bold text-lg">이미지를 변경하시겠습니까?</span>
      <button class="py-2 px-3 bg-indigo-500 text-white rounded-md" @click="deleteBefore">
        변경
      </button>
    </div>

    <img :src="previewImgSrc" alt="preview-image" class="max-w-sm" />

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
  <div v-else>잘못된 접근입니다.</div>
</template>

<script setup>
import { useRouteParams } from "@vueuse/router";
import { ref, onBeforeMount, inject } from "vue";
import { useRouter } from "vue-router";
import {
  getTitle,
  getYear,
  getUniversity,
  getDepartment,
  getImg,
  getPostUrl,
  updateGraduation,
} from "../../firebase/post";
import { uploadFile, deleteBeforeImgFile } from "../../firebase/firestore";

const router = useRouter();
const postId = useRouteParams("post_id").value;
const userProfile = inject("userProfile");

const title = ref("");
const year = ref("");
const university = ref("");
const department = ref("");
const previewImgSrc = ref("https://via.placeholder.com/384x500?text=Upload+Image");
const imgSrc = ref("");
const url = ref("");

const loading = ref(false);
const isChangeImg = ref(false);

onBeforeMount(async () => {
  title.value = await getTitle("graduations", postId);
  year.value = await getYear("graduations", postId);
  university.value = await getUniversity("graduations", postId);
  department.value = await getDepartment("graduations", postId);
  previewImgSrc.value = await getImg("graduations", postId);
  imgSrc.value = await getImg("graduations", postId);
  url.value = await getPostUrl("graduations", postId);
});

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
  formFilePath = "images/graduations/" + fileName;
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
  formFixFilePath = "images/graduations/" + fixFileName;
};

const deleteBefore = async () => {
  isChangeImg.value = true;
  await deleteBeforeImgFile("graduations", postId);
};

const upload = async () => {
  loading.value = true;
  if (formFile !== null && formFilePath !== null) {
    await uploadFile(formFilePath, formFile);
    imgSrc.value =
      "https://storage.googleapis.com/aedi--project.appspot.com/" + formFixFilePath;
  }
  await updateGraduation(
    title,
    year,
    university,
    department,
    imgSrc,
    url,
    postId,
    formFixFilePath
  );

  loading.value = false;
  router.go(-1);
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
