<template>
  <form v-if="userProfile?.admin" class="px-5" @submit.prevent="upload">
    <div class="font-bold text-lg mb-2">
      <input
        type="checkbox"
        name="important"
        id="important"
        class="mr-3"
        v-model="important"
      />
      <label for="important">중요공지 설정</label>
    </div>

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
import { ref, inject } from "vue";

import TuiEditor from "../../components/editor/TuiEditor.vue";
import { createNotice } from "../../firebase/post";
import { uploadFile } from "../../firebase/firestore";
import { useRouter } from "vue-router";
import { user } from "../../firebase/user";

const router = useRouter();

const important = ref(false);
const title = ref("");
const content = ref("");

const editorImgPath = ref([]);

const loading = ref(false);

const userProfile = inject("userProfile");

const upload = async () => {
  loading.value = true;

  await createNotice(
    title,
    content,
    user?.value?.displayName,
    userProfile?.value?.admin,
    editorImgPath,
    important
  );
  loading.value = false;
  router.push({
    path: `/notice/page`,
  });
};

const addImage = async (file, callback) => {
  const imagePath = `images/notices/${file.name}`;
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
  const imgFixPath = `images/notices/` + fixFileName;
  editorImgPath.value.push(imgFixPath);
  console.log(editorImgPath.value);
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
