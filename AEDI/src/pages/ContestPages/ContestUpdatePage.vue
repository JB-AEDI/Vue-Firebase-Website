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
      />
    </div>
    <img :src="previewImgSrc" alt="preview-image" class="max-w-sm" />

    <button
      class="mb-10 mr-5 mt-4 float-right bg-indigo-500 py-2 px-3 rounded-md text-white"
      type="submit"
    >
      <font-awesome-icon icon="fa-solid fa-upload" class="mr-2" />업로드
    </button>
  </form>
</template>

<script setup>
import { onMounted, ref } from "vue";
import {
  updateContest,
  getEndDate,
  getImg,
  getPostUrl,
  getStartDate,
  getTitle,
  getHost,
  getSupervision,
  getSponsor,
  getTarget,
  getField,
} from "../../firebase/post";
import { uploadFile, getUrl } from "../../firebase/firestore";
import { useRouter } from "vue-router";
import { useRouteParams } from "@vueuse/router";

const router = useRouter();
const postId = useRouteParams("post_id").value;

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

onMounted(async () => {
  title.value = await getTitle("contests", postId);
  host.value = await getHost("contests", postId);
  supervision.value = await getSupervision("contests", postId);
  sponsor.value = await getSponsor("contests", postId);
  startDate.value = await getStartDate("contests", postId);
  endDate.value = await getEndDate("contests", postId);
  target.value = await getTarget("contests", postId);
  field.value = await getField("contests", postId);
  url.value = await getPostUrl("contests", postId);
  imgSrc.value = await getImg("contests", postId);
  previewImgSrc.value = await getImg("contests", postId);
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
  formFilePath = "images/contest/" + formFile.name;
};

const upload = async () => {
  if (formFile !== null && formFilePath !== null) {
    await uploadFile(formFilePath, formFile);
    imgSrc.value = await getUrl(formFilePath);
  }
  updateContest(
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
    postId
  );
  router.go(-1);
};
</script>
