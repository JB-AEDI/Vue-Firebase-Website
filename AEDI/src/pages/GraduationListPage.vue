<template>
  <Catgory></Catgory>
  <div class="p-5">
    <div
      class="flex flex-row bg-indigo-500 text-white text-center border-b border-white"
    >
      <div class="basis-3/6 border p-3">공모전명</div>
      <div class="basis-1/6 border p-3">주최사</div>
      <div class="basis-1/6 border p-3">접수기간</div>
      <div class="basis-1/6 border p-3">진행상태</div>
    </div>
    <div v-for="contest in 10" class="flex flex-row bg-gray-200">
      <div class="basis-3/6 border-r border-b border-white p-3">
        공모전 {{ contest }}
      </div>
      <div class="basis-1/6 border-r border-b border-white p-3">주최사</div>
      <div class="basis-1/6 border-r border-b border-white p-3">접수기간</div>
      <div class="basis-1/6 border-b border-white p-3">진행상태</div>
    </div>
  </div>

  <div class="mt-4 flex justify-center gap-2">
    <div class="bg-gray-200 px-2 py-1">&lt&lt</div>
    <div class="bg-gray-200 px-3 py-1" v-for="listNumber in 8">
      {{ listNumber }}
    </div>
    <div class="bg-gray-200 px-2 py-1">&gt&gt</div>
  </div>
</template>

<script setup>
import Catgory from "../components/Catgory.vue";
</script>
