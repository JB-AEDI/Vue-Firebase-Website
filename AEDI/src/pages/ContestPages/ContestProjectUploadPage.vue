<template>
  <form v-if="user?.emailVerified" class="px-5" @submit.prevent="upload">
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
        @change="handleImgFileChange"
        required
        accept="image/*"
      />
    </div>
    <img :src="previewImgSrc" alt="preview-image" class="max-w-sm mb-10" />

    <div class="mb-5">
      <span class="font-bold text-lg">파일추가</span>
      <div class="float-right">
        <font-awesome-icon
          v-if="fileListCount > 0"
          icon="fa-solid fa-minus"
          size="lg"
          class="cursor-pointer"
          @click="deleteFileList"
        />
        <font-awesome-icon
          icon="fa-solid fa-plus"
          class="cursor-pointer ml-4"
          size="lg"
          @click="addFileList"
        />
      </div>
    </div>

    <div v-for="file in fileListCount" class="flex mb-3">
      <div class="border flex rounded border-gray-300">
        <label
          :for="'fileName-' + file"
          class="font-bold px-2 flex justify-center items-center bg-gray-400 rounded-l-sm"
          >파일명</label
        >
        <input
          type="text"
          class="border-l py-1 px-2"
          placeholder="파일명을 입력하세요."
          :id="'fileName-' + file"
          v-model="fileObjectName[file - 1]"
          required
        />
      </div>
      <div class="ml-5">
        <input
          type="file"
          :name="'file-' + file"
          :id="'file-' + file"
          @change="handleFileChange(file)"
          class="file:border-0 file:bg-sky-200 file:text-sky-600 file:py-1 file:px-2 file:rounded-full file:font-semibold file:mr-3 hover:file:bg-sky-300"
          required
        />
      </div>
    </div>

    <TuiEditor v-model="content" @add-image="addImage"></TuiEditor>
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
import { ref } from "vue";

import TuiEditor from "../../components/editor/TuiEditor.vue";
import { createProject } from "../../firebase/post";
import { uploadFile, getUrl } from "../../firebase/firestore";
import { useRouter } from "vue-router";
import { useRouteParams } from "@vueuse/router";
import { user } from "../../firebase/user";

const router = useRouter();
const postId = useRouteParams("post_id").value;

const title = ref();
const content = ref();
const previewImgSrc = ref("https://via.placeholder.com/384x500?text=Upload+Image");
const imgSrc = ref("");

const fileListCount = ref(0);
const fileObjectName = ref({});
const fileList = ref({});
const fileListUrl = ref([]);
const fileListName = ref([]);
const fileListPath = ref([]);

const editorImgPath = ref([]);
const loading = ref(false);

const addFileList = () => {
  fileObjectName.value[fileListCount.value] = "";
  fileListCount.value += 1;
};

const deleteFileList = () => {
  delete fileObjectName.value[fileListCount.value];
  fileListCount.value -= 1;
};

const handleFileChange = (count) => {
  fileList.value[count] = document.getElementById("file-" + count).files[0];
};

let formImgFile = null;
let formImgFilePath = null;
let formImgFixFilePath = null;

const handleImgFileChange = (input) => {
  const reader = new FileReader();

  reader.onload = (e) => {
    previewImgSrc.value = e.target.result;
  };
  reader.readAsDataURL(input.target.files[0]);

  formImgFile = input.target.files[0];
  const fileName = formImgFile.name;
  formImgFilePath = `images/contests/${postId}/projects/` + fileName;
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
  formImgFixFilePath = `images/contests/${postId}/projects/` + fixFileName;
  console.log(formImgFixFilePath);
};

const upload = async () => {
  loading.value = true;
  if (formImgFile !== null && formImgFilePath !== null) {
    await uploadFile(formImgFilePath, formImgFile);
    imgSrc.value =
      `https://storage.googleapis.com/aedi--project.appspot.com/` + formImgFixFilePath;
  } else {
    alert("이미지를 업로드하세요!");
    return;
  }

  if (
    Object.keys(fileList.value).length &&
    Object.keys(fileList.value).length === Object.keys(fileObjectName.value).length
  ) {
    for (const key in fileList.value) {
      const file = fileList.value[key];
      const filePath = `file/contests/${postId}/projects` + fileList.value[key].name;
      fileListName.value.push(fileObjectName.value[key - 1]);
      fileListPath.value.push(filePath);

      await uploadFile(filePath, file);
      const fileUrl = await getUrl(filePath);
      fileListUrl.value.push(fileUrl);
    }
  }

  await createProject(
    "contests",
    postId,
    title,
    user?.value?.displayName,
    content,
    imgSrc,
    fileListUrl,
    fileListName,
    formImgFixFilePath,
    fileListPath,
    editorImgPath
  );

  loading.value = false;

  router.go(-1);
};

const addImage = async (file, callback) => {
  const imagePath = `images/contests/${postId}/projects/${file.name}`;
  await uploadFile(imagePath, file);
  const fileNameArray = file.name.split(".");
  let fileNameSum = "";
  for (let i = 0; i < fileNameArray.length - 1; i++) {
    if (i == fileNameArray.length - 2) {
      fileNameSum = fileNameSum + fileNameArray[i];
    } else {
      fileNameSum = fileNameSum + fileNameArray[i] + ".";
    }
  }
  const fixFileName = fileNameSum + "_800x1200.webp";
  const imgFixPath = `images/contests/${postId}/projects/` + fixFileName;
  editorImgPath.value.push(imgFixPath);
  const image = "https://storage.googleapis.com/aedi--project.appspot.com/" + imgFixPath;

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
