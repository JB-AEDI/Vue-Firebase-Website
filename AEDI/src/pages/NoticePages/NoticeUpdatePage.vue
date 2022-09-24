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
import { useRouteParams } from "@vueuse/router";
import { ref, inject, onBeforeMount } from "vue";
import { useRouter } from "vue-router";

import TuiEditor from "../../components/editor/TuiEditor.vue";
import { updateNotice, getContent, getTitle } from "../../firebase/post";
import { uploadFile, getUrl } from "../../firebase/firestore";

const router = useRouter();
const postId = useRouteParams("post_id").value;

const userProfile = inject("userProfile");
const content = ref("");
const title = ref("");

const loading = ref(false);

onBeforeMount(async () => {
  title.value = await getTitle("notices", postId);
  content.value = await getContent("notices", postId);
});

const upload = async () => {
  loading.value = true;
  await updateNotice(
    title,
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
