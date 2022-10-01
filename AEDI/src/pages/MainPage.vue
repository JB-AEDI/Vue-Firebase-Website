<template>
  <div class="mx-5">
    <div class="flex justify-center pb-[35%] mb-[48%] sm:mb-0">
      <div class="w-11/12 h-0">
        <Carousel :projects="projects" :itemsToShow="itemsToShow"></Carousel>
      </div>
    </div>
    <div class="flex justify-center mb-5 text-neutral-800">
      <div
        class="bg-rose-400 px-4 py-4 rounded-xl flex items-center gap-3 relative z-10 left-3 top-3"
      >
        <font-awesome-icon
          icon="fa-solid fa-clock-rotate-left"
          class="md:text-2xl sm:text-lg"
        />
        <div class="flex flex-col items-center">
          <CountUp
            :endVal="graduationCount + contestCount"
            :duration="5"
            class="md:text-base text-xs font-bold"
          ></CountUp>
          <div class="md:text-base text-xs font-bold">이벤트</div>
        </div>
      </div>

      <div
        class="bg-yellow-300 px-4 py-4 rounded-xl flex items-center gap-3 relative z-20 bottom-2"
      >
        <font-awesome-icon
          icon="fa-solid fa-cloud-arrow-up"
          class="md:text-2xl sm:text-lg"
        />
        <div class="flex flex-col items-center">
          <CountUp
            :endVal="graduationProjectCount + contestProjectCount"
            :duration="5"
            class="md:text-base text-xs font-bold"
          ></CountUp>
          <div class="md:text-base text-xs font-bold">프로젝트</div>
        </div>
      </div>

      <div
        class="bg-lime-400 px-4 py-4 rounded-xl flex items-center gap-3 relative z-30 right-3 top-3"
      >
        <font-awesome-icon icon="fa-solid fa-bullhorn" class="md:text-2xl sm:text-lg" />
        <div class="flex flex-col items-center">
          <CountUp
            :endVal="graduationReviewCount + contestReviewCount"
            :duration="5"
            class="md:text-base text-xs font-bold"
          ></CountUp>
          <div class="md:text-base text-xs font-bold">평가수</div>
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
            v-for="project in projects"
            class="bg-indigo-600 flex justify-center items-center rounded-lg shadow-xl border bg-cover cursor-pointer"
            style="min-height: 300px"
            :style="{ backgroundImage: `url(${project.img})` }"
            @click="goUrl(project.url)"
          ></div>
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
import CountUp from "vue-countup-v3";
import { getPostCount } from "../firebase/post";

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

const graduationCount = getPostCount("graduations").eventCount;
const contestCount = getPostCount("contests").eventCount;

const graduationProjectCount = getPostCount("graduations").projectCount;
const contestProjectCount = getPostCount("contests").projectCount;

const graduationReviewCount = getPostCount("graduations").reviewCount;
const contestReviewCount = getPostCount("contests").reviewCount;

const projects = ref([
  {
    img:
      "https://storage.googleapis.com/aedi--project.appspot.com/images/graduations/btO5HAYyqKKU1UrtMPsP/projects/info-2021-5_1_400x700.webp",
    url:
      "https://aedi--project.web.app/#/graduation/btO5HAYyqKKU1UrtMPsP/project/32980n77ld6VxjswTFY9",
  },
  {
    img:
      "https://storage.googleapis.com/aedi--project.appspot.com/images/graduations/btO5HAYyqKKU1UrtMPsP/projects/info-2021-12_2_400x700.webp",
    url:
      "https://aedi--project.web.app/#/graduation/btO5HAYyqKKU1UrtMPsP/project/ZSQ9ZOu08rmuS7zJLE8D",
  },
  {
    img:
      "https://storage.googleapis.com/aedi--project.appspot.com/images/graduations/btO5HAYyqKKU1UrtMPsP/projects/info-2021-16_2_400x700.webp",
    url:
      "https://aedi--project.web.app/#/graduation/btO5HAYyqKKU1UrtMPsP/project/Mis6ROiCmum7v98vuL52",
  },
  {
    img:
      "https://storage.googleapis.com/aedi--project.appspot.com/images/graduations/btO5HAYyqKKU1UrtMPsP/projects/info-2021-17_1_400x700.webp",
    url:
      "https://aedi--project.web.app/#/graduation/btO5HAYyqKKU1UrtMPsP/project/ZUJ5dJULjONvRV0ZnmJ3",
  },
  {
    img:
      "https://storage.googleapis.com/aedi--project.appspot.com/images/graduations/HpYXjdVOqGbJl6CVm2gx/projects/img-2020-4_400x700.webp",
    url:
      "https://aedi--project.web.app/#/graduation/HpYXjdVOqGbJl6CVm2gx/project/QM9qRjfU64tCJjnEFNIT",
  },
  {
    img:
      "https://storage.googleapis.com/aedi--project.appspot.com/images/graduations/HpYXjdVOqGbJl6CVm2gx/projects/img-2020-7_400x700.webp",
    url:
      "https://aedi--project.web.app/#/graduation/HpYXjdVOqGbJl6CVm2gx/project/EnQMBPiNjrnz8JHVpsx8",
  },
  {
    img:
      "https://storage.googleapis.com/aedi--project.appspot.com/images/graduations/XUlwn516Tjy3jpkgQVxZ/projects/img-2019-2_400x700.webp",
    url:
      "https://aedi--project.web.app/#/graduation/XUlwn516Tjy3jpkgQVxZ/project/W4uotAkrKlBhsE8HJjWl",
  },
  {
    img:
      "https://storage.googleapis.com/aedi--project.appspot.com/images/graduations/XUlwn516Tjy3jpkgQVxZ/projects/img-2019-6_400x700.webp",
    url:
      "https://aedi--project.web.app/#/graduation/XUlwn516Tjy3jpkgQVxZ/project/AqFhcJ1AsG5zOMP3QRcy",
  },
]);

const goUrl = (url) => {
  window.open(url, "_self");
};
</script>
