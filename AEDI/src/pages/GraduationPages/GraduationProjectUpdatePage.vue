<template>
  <form class="px-5" @submit.prevent="upload">
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
    <div class="mb-5">
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
      />
    </div>
    <img :src="previewImgSrc" alt="preview-image" class="max-w-sm mb-10" />

    <TuiEditor v-if="content" v-model="content" @add-image="addImage"></TuiEditor>
    <button
      class="mr-5 mt-4 float-right bg-indigo-500 py-2 px-3 rounded-md text-white"
      type="submit"
    >
      <font-awesome-icon icon="fa-solid fa-upload" class="mr-2" />업로드
    </button>
  </form>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import TuiEditor from "../../components/editor/TuiEditor.vue";
import {
  updateProject,
  getProjectTitle,
  getProjectContent,
  getProjectImg,
} from "../../firebase/post";
import { uploadFile, getUrl } from "../../firebase/firestore";
import { useRouter } from "vue-router";
import { useRouteParams } from "@vueuse/router";

const router = useRouter();
const postId = useRouteParams("post_id").value;
const projectId = useRouteParams("project_id").value;

const title = ref("");
const content = ref("");
const previewImgSrc = ref("https://via.placeholder.com/384x500?text=Upload+Image");
const imgSrc = ref("");

onBeforeMount(async () => {
  title.value = await getProjectTitle("graduations", postId, projectId);
  content.value = await getProjectContent("graduations", postId, projectId);
  previewImgSrc.value = await getProjectImg("graduations", postId, projectId);
  imgSrc.value = await getProjectImg("graduations", postId, projectId);
});

let formFile = null;
let formFilePath = null;

const handleFileChange = (input) => {
  const reader = new FileReader();

  reader.onload = (e) => {
    previewImgSrc.value = e.target.result;
  };
  reader.readAsDataURL(input.target.files[0]);

  formFile = input.target.files[0];
  formFilePath = "images/graduation/" + formFile.name;
};

const upload = async () => {
  if (formFile !== null && formFilePath !== null) {
    await uploadFile(formFilePath, formFile);
    imgSrc.value = await getUrl(formFilePath);
  }
  updateProject("graduations", postId, projectId, title, content, imgSrc);
  router.go(-1);
};
</script>
