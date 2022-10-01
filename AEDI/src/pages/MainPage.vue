<template>
  <div class="mx-5">
    <div class="flex justify-center pb-[35%] mb-40 sm:mb-0">
      <div class="w-11/12 h-0">
        <Carousel :projects="projects" :itemsToShow="itemsToShow"></Carousel>
      </div>
    </div>
    <div class="flex justify-center lg:gap-12 md:gap-10 sm:gap-8 gap-4 mt-7 mb-5">
      <div
        class="bg-gray-200 md:py-3 md:px-4 sm:py-2 sm:px-3 py-1.5 px-2 flex items-center gap-3"
      >
        <font-awesome-icon
          icon="fa-solid fa-clock-rotate-left"
          class="md:text-2xl sm:text-lg"
        />
        <div class="flex flex-col items-center">
          <div class="md:text-base text-xs">150</div>
          <div class="md:text-base text-xs">마감임박</div>
        </div>
      </div>

      <div
        class="bg-gray-200 md:py-3 md:px-4 sm:py-2 sm:px-3 py-1.5 px-2 flex items-center gap-3"
      >
        <font-awesome-icon
          icon="fa-solid fa-cloud-arrow-up"
          class="md:text-2xl sm:text-lg"
        />
        <div class="flex flex-col items-center">
          <div class="md:text-base text-xs">239</div>
          <div class="md:text-base text-xs">최근등록</div>
        </div>
      </div>

      <div
        class="bg-gray-200 md:py-3 md:px-4 sm:py-2 sm:px-3 py-1.5 px-2 flex items-center gap-3"
      >
        <font-awesome-icon icon="fa-solid fa-bullhorn" class="md:text-2xl sm:text-lg" />
        <div class="flex flex-col items-center">
          <div class="md:text-base text-xs">342</div>
          <div class="md:text-base text-xs">진행중</div>
        </div>
      </div>
    </div>
    <div class="flex justify-center">
      <div class="w-[1000px]">
        <RouterLink to="/graduation/page">
          <a href="@" class="text-xl">
            <span><font-awesome-icon icon="fa-solid fa-graduation-cap" size="1x" /></span>
            <span class="font-semibold ml-2">졸업작품</span>
          </a>
        </RouterLink>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-6 text-white my-5">
          <div
            v-for="graduation in 8"
            class="bg-indigo-600 flex justify-center items-center rounded-lg"
            style="min-height: 280px"
          >
            <div>{{ graduation }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-center">
      <div class="mt-10 w-[1000px]">
        <RouterLink to="/contest/page">
          <a href="@" class="text-xl">
            <span><font-awesome-icon icon="fa-solid fa-book" size="1x" /></span>
            <span class="font-semibold ml-2">공모전</span>
          </a>
        </RouterLink>
        <div class="grid grid-cols-2 sm:grid-cols-4 w-full gap-6 text-white my-5">
          <div
            v-for="contest in 8"
            class="bg-indigo-600 flex justify-center items-center rounded-lg"
            style="min-height: 300px"
          >
            <div>{{ contest }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Carousel from "../components/Carousel.vue";
import { RouterLink } from "vue-router";
import { onUnmounted, ref, watchEffect } from "vue";
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";

const props = defineProps({
  projects: Array,
  itemsToShow: Number,
});

const breakpoints = useBreakpoints(breakpointsTailwind);
const smallerSm = breakpoints.smaller("sm");
const itemsToShow = ref(3.95);

const smWatch = watchEffect(
  () => {
    if (smallerSm.value) {
      itemsToShow.value = 1.8;
    } else {
      itemsToShow.value = 3.95;
    }
  },
  {
    immediate: true,
    flush: "pre",
  }
);

onUnmounted(() => {
  smWatch();
});

const projects = ref([
  {
    img: "",
    url:
      "https://aedi--project.web.app/#/graduation/btO5HAYyqKKU1UrtMPsP/project/32980n77ld6VxjswTFY9",
  },
  {
    img: "",
    url:
      "https://aedi--project.web.app/#/graduation/btO5HAYyqKKU1UrtMPsP/project/ZSQ9ZOu08rmuS7zJLE8D",
  },
  {
    img: "",
    url:
      "https://aedi--project.web.app/#/graduation/btO5HAYyqKKU1UrtMPsP/project/Mis6ROiCmum7v98vuL52",
  },
  {
    img: "",
    url:
      "https://aedi--project.web.app/#/graduation/btO5HAYyqKKU1UrtMPsP/project/ZUJ5dJULjONvRV0ZnmJ3",
  },
  {
    img: "",
    url:
      "https://aedi--project.web.app/#/graduation/HpYXjdVOqGbJl6CVm2gx/project/QM9qRjfU64tCJjnEFNIT",
  },
  {
    img: "",
    url:
      "https://aedi--project.web.app/#/graduation/XUlwn516Tjy3jpkgQVxZ/project/W4uotAkrKlBhsE8HJjWl",
  },
  {
    img: "",
    url:
      "https://aedi--project.web.app/#/graduation/XUlwn516Tjy3jpkgQVxZ/project/AqFhcJ1AsG5zOMP3QRcy",
  },
]);
</script>
