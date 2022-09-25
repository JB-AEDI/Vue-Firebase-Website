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
      />
    </div>
    <img :src="previewImgSrc" alt="preview-image" class="max-w-sm mb-10" />

    <div class="mb-5">
      <span class="font-bold text-lg">파일추가</span>
      <font-awesome-icon
        icon="fa-solid fa-plus"
        class="cursor-pointer float-right"
        size="lg"
        @click="addFileList"
      />
    </div>

    <div v-for="file in fileListCount" class="flex mb-3">
      <div class="border flex">
        <label :for="'fileName-' + file" class="font-bold mr-2">파일명</label>
        <input
          type="text"
          class="border-l py-1 px-2"
          placeholder="파일명을 입력하세요."
          :id="'fileName-' + file"
          v-model="fileObjectName[file - 1]"
          required
        />
      </div>
      <div>
        <input
          type="file"
          :name="'file-' + file"
          :id="'file-' + file"
          @change="handleFileChange(file)"
          required
        />
      </div>
    </div>

    <TuiEditor v-model="content" @add-image="addImage"></TuiEditor>
    <button
      class="mr-5 mt-4 float-right bg-indigo-500 py-2 px-3 rounded-md text-white"
      type="submit"
    >
      <i class="fa-solid fa-upload mr-2"></i>업로드
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

const loading = ref(false);

const addFileList = () => {
  fileObjectName.value[fileListCount.value] = "";
  fileListCount.value += 1;
};

const handleFileChange = (count) => {
  fileList.value[count] = document.getElementById("file-" + count).files[0];
  console.log(fileList.value);
  console.log(fileObjectName.value);
};

let formImgFile = null;
let formImgFilePath = null;

const userProfile = inject("userProfile");

const handleImgFileChange = (input) => {
  const reader = new FileReader();

  reader.onload = (e) => {
    previewImgSrc.value = e.target.result;
  };
  reader.readAsDataURL(input.target.files[0]);

  formImgFile = input.target.files[0];
  formImgFilePath = "images/graduation/" + formImgFile.name;
};

const upload = async () => {
  loading.value = true;
  if (formImgFile !== null && formImgFilePath !== null) {
    await uploadFile(formImgFilePath, formImgFile);
    imgSrc.value = await getUrl(formImgFilePath);
  } else {
    alert("이미지를 업로드하세요!");
    return;
  }

  if (
    Object.keys(fileList.value).length &&
    Object.keys(fileList.value).length === Object.keys(fileObjectName.value).length
  ) {
    console.log("파일이 비어있지 않음");
    for (const key in fileList.value) {
      const file = fileList.value[key];
      const filePath = "file/graduation/" + fileList.value[key].name;
      fileListName.value.push(fileObjectName.value[key - 1]);

      await uploadFile(filePath, file);
      const fileUrl = await getUrl(filePath);
      fileListUrl.value.push(fileUrl);
    }
  }

  await createProject(
    "graduations",
    postId,
    title,
    userProfile?.value?.name,
    content,
    imgSrc,
    fileListUrl,
    fileListName
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
