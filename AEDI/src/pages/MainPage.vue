<template>
  <div class="mx-5">
    <Carousel></Carousel>
    <div class="flex justify-center gap-10 mt-7">
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
  </div>
</template>

<script setup>
import Carousel from "../components/Carousel.vue";
</script>
