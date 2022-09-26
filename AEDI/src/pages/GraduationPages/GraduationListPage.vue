<template>
  <div class="flex w-full px-8 gap-6">
    <div class="mb-3 w-1/5">
      <select
        class="form-select block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        aria-label="Default select example"
        v-model="selectedYear"
        @change="selectCategory"
      >
        <option selected>연도별</option>
        <option v-for="year in categoryYear" :value="year">{{ year }}</option>
      </select>
    </div>

    <div class="mb-3 w-1/5">
      <select
        class="form-select block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        aria-label="Default select example"
        v-model="selectedUniversity"
        @change="selectCategory"
      >
        <option selected>학교별</option>
        <option v-for="university in categoryUniversity" :value="university">
          {{ university }}
        </option>
      </select>
    </div>

    <div class="mb-3 w-1/5">
      <select
        class="form-select block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        aria-label="Default select example"
        v-model="selectedDepartment"
        @change="selectCategory"
      >
        <option selected>학과별</option>
        <option v-for="department in categoryDepartment" :value="department">
          {{ department }}
        </option>
      </select>
    </div>

    <div class="flex-1">
      <font-awesome-icon
        icon="fa-solid fa-arrow-rotate-left"
        @click="categorySwitch = false"
        size="xl"
        class="float-right mt-2 mr-2 cursor-pointer"
      />
    </div>
  </div>

  <div class="px-5 pt-4 pb-2 flex justify-between items-center">
    <h3 class="ml-1 text-xl font-bold">정보보호학과</h3>
    <button
      v-if="userProfile.admin"
      @click="pushUpload"
      class="mr-5 bg-indigo-500 py-2 px-3 rounded-md text-white"
    >
      <font-awesome-icon icon="fa-solid fa-upload" class="mr-2" />업로드
    </button>
  </div>

  <div v-if="!categorySwitch">
    <div class="p-5">
      <div
        class="grid grid-cols-12 bg-indigo-500 text-white text-center border-b border-white"
      >
        <div class="col-span-1 border p-3">연도</div>
        <div class="col-span-7 border p-3">제목</div>
        <div class="col-span-2 border-y p-3">학교</div>
        <div class="col-span-2 border p-3">프로젝트 수</div>
      </div>
      <div
        v-for="graduation in graduationsPage[currentPage]"
        class="grid grid-cols-12 bg-gray-200"
      >
        <div
          class="flex justify-center items-center col-span-1 border-x border-b border-white p-3"
        >
          {{ graduation?.year }}
        </div>
        <div class="col-span-7 border-r border-b border-white p-3">
          <div>
            <span class="cursor-pointer font-bold" @click="movePost(graduation)">
              {{ graduation?.title }}
            </span>
          </div>
          <div class="mt-1">
            <div
              class="inline-block border-2 border-red-400 py-0.5 px-1.5 rounded-lg text-sm"
            >
              <span class="text-red-400"
                ><font-awesome-icon icon="fa-solid fa-heart"
              /></span>
              <span class="ml-1">{{ graduation?.likes }}</span>
            </div>
            <span class="font-semibold text-gray-800 text-sm mx-2">[학과]</span>
            <span class="text-gray-600">{{ graduation?.department }}</span>
          </div>
        </div>
        <div
          class="flex justify-center items-center col-span-2 border-r border-b border-white p-3"
        >
          {{ graduation?.university }}
        </div>
        <div
          class="flex justify-center items-center col-span-2 border-r border-b border-white p-3"
        >
          {{ graduation?.projects }}
        </div>
      </div>
    </div>

    <div v-if="graduationsPage" class="mt-4 flex justify-center gap-2">
      <div class="bg-gray-200 px-2 py-1 cursor-pointer" @click="[(currentPage = 0)]">
        &lt&lt
      </div>
      <div
        class="bg-gray-200 px-3 py-1 cursor-pointer"
        v-for="listNumber in graduationsPage?.length"
        @click="[(currentPage = listNumber - 1)]"
      >
        {{ listNumber }}
      </div>
      <div
        class="bg-gray-200 px-2 py-1 cursor-pointer"
        @click="[(currentPage = graduationsPage?.length - 1)]"
      >
        &gt&gt
      </div>
    </div>
  </div>

  <div v-else>
    <div class="p-5">
      <div
        class="grid grid-cols-12 bg-indigo-500 text-white text-center border-b border-white"
      >
        <div class="col-span-1 border p-3">연도</div>
        <div class="col-span-7 border p-3">제목</div>
        <div class="col-span-2 border-y p-3">학교</div>
        <div class="col-span-2 border p-3">프로젝트 수</div>
      </div>
      <div
        v-for="graduation in categoryPage?.value[currentPage]"
        class="grid grid-cols-12 bg-gray-200"
      >
        <div
          class="flex justify-center items-center col-span-1 border-x border-b border-white p-3"
        >
          {{ graduation?.year }}
        </div>
        <div class="col-span-7 border-r border-b border-white p-3">
          <div>
            <span class="cursor-pointer font-bold" @click="movePost(graduation)">
              {{ graduation?.title }}
            </span>
          </div>
          <div class="mt-1">
            <div
              class="inline-block border-2 border-red-400 py-0.5 px-1.5 rounded-lg text-sm"
            >
              <span class="text-red-400"
                ><font-awesome-icon icon="fa-solid fa-heart"
              /></span>
              <span class="ml-1">{{ graduation?.likes }}</span>
            </div>
            <span class="font-semibold text-gray-800 text-sm mx-2">[학과]</span>
            <span class="text-gray-600">{{ graduation?.department }}</span>
          </div>
        </div>
        <div
          class="flex justify-center items-center col-span-2 border-r border-b border-white p-3"
        >
          {{ graduation?.university }}
        </div>
        <div
          class="flex justify-center items-center col-span-2 border-r border-b border-white p-3"
        >
          {{ graduation?.projects }}
        </div>
      </div>
    </div>

    <div v-if="categoryPage" class="mt-4 flex justify-center gap-2">
      <div class="bg-gray-200 px-2 py-1 cursor-pointer" @click="[(currentPage = 0)]">
        &lt&lt
      </div>
      <div
        class="bg-gray-200 px-3 py-1 cursor-pointer"
        v-for="listNumber in categoryPage?.value?.length"
        @click="[(currentPage = listNumber - 1)]"
      >
        {{ listNumber }}
      </div>
      <div
        class="bg-gray-200 px-2 py-1 cursor-pointer"
        @click="[(currentPage = categoryPage?.length - 1)]"
      >
        &gt&gt
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { inject, ref } from "vue";
import {
  onSnapshotPostsPage,
  onSnapshotGraduationsUniversity,
  onSnapshotGraduationsDepartment,
  onSnapshotGraduationsYear,
  graduationCategoryPage,
} from "../../firebase/post";

const router = useRouter();

const userProfile = inject("userProfile");
const currentPage = ref(0);
const graduationsPage = onSnapshotPostsPage("graduations");

const categoryUniversity = onSnapshotGraduationsUniversity();
const categoryDepartment = onSnapshotGraduationsDepartment();
const categoryYear = onSnapshotGraduationsYear();

const selectedYear = ref("연도별");
const selectedUniversity = ref("학교별");
const selectedDepartment = ref("학과별");

const categoryPage = ref();
const categorySwitch = ref(false);

const selectCategory = () => {
  categoryPage.value = graduationCategoryPage(
    selectedYear,
    selectedUniversity,
    selectedDepartment
  );
  categorySwitch.value = true;
};

const pushUpload = async () => router.push({ path: "/graduation/upload" });

const movePost = (post) => {
  router.push({
    path: `/graduation/info/${post.id}`,
  });
};
</script>
