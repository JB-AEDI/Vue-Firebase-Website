<template>
  <div class="mx-5">
    <Carousel></Carousel>
    <div class="flex justify-center gap-10 mt-7 mb-5">
      <div class="bg-gray-200 py-3 px-4 flex items-center gap-3">
        <div>
          <i class="fa-solid fa-clock-rotate-left fa-2xl"></i>
        </div>
        <div class="flex flex-col items-center">
          <div>150</div>
          <div>마감임박</div>
        </div>
      </div>
      <div class="bg-gray-200 py-3 px-4 flex items-center gap-3">
        <div>
          <i class="fa-solid fa-cloud-arrow-up fa-2xl"></i>
        </div>
        <div class="flex flex-col items-center">
          <div>239</div>
          <div>최근등록</div>
        </div>
      </div>
      <div class="bg-gray-200 py-3 px-4 flex items-center gap-3">
        <div>
          <i class="fa-solid fa-bullhorn fa-2xl"></i>
        </div>
        <div class="flex flex-col items-center">
          <div>342</div>
          <div>진행중</div>
        </div>
      </div>
    </div>
    <div>
      <RouterLink to="/graduation/page/1">
        <a href="@" class="text-xl">
          <span><i class="fa-solid fa-graduation-cap fa-1x"></i></span>
          <span class="font-semibold ml-1">졸업작품</span>
        </a>
      </RouterLink>
      <div class="grid grid-cols-4 w-full gap-6 text-white my-5">
        <div
          v-for="graduation in 8"
          class="bg-indigo-600 flex justify-center items-center rounded-lg"
          style="min-height: 300px"
        >
          <div>{{ graduation }}</div>
        </div>
      </div>
    </div>
    <div class="mt-10">
      <RouterLink to="/contest/page/1">
        <a href="@" class="text-xl">
          <span><i class="fa-solid fa-book fa-1x"></i></span>
          <span class="font-semibold ml-1">졸업작품</span>
        </a>
      </RouterLink>
      <div class="grid grid-cols-4 w-full gap-6 text-white my-5">
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
</template>

<script setup>
import Carousel from "../components/Carousel.vue";
import { RouterLink } from "vue-router";
</script>
