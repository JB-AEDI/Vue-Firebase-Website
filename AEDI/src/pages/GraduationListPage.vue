<template>
  <div class="grid grid-cols-4 gap-8 px-5">
    <div class="mb-3 xl:w-96">
      <select
        class="w-full form-select block px-3 py-1.5 text-base font-normal text-white bg-indigo-500 bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-white focus:bg-indigo-500 focus:border-blue-600 focus:outline-none"
        aria-label="Default select example"
      >
        <option selected>학과별<span></span></option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </select>
    </div>
    <div class="mb-3 xl:w-96">
      <select
        class="w-full form-select block px-3 py-1.5 text-base font-normal text-white bg-indigo-500 bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-white focus:bg-indigo-500 focus:border-blue-600 focus:outline-none"
        aria-label="Default select example"
      >
        <option selected>연도별</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </select>
    </div>
  </div>

  <div class="px-5 pt-4 pb-2 flex justify-between items-center">
    <h3 class="ml-1 text-xl font-bold">정보보호학과</h3>
    <button class="mr-5 bg-indigo-500 py-2 px-3 rounded-md text-white">
      <i class="fa-solid fa-upload mr-2"></i>업로드
    </button>
  </div>

  <div class="p-5">
    <div
      class="grid grid-cols-12 bg-indigo-500 text-white text-center border-b border-white"
    >
      <div class="col-span-6 border p-3">프로젝트명</div>
      <div class="col-span-4 border-y p-3">팀이름</div>
      <div class="col-span-2 border p-3">조회수</div>
    </div>
    <div v-for="graduation in 10" class="grid grid-cols-12 bg-gray-200">
      <div class="col-span-6 border-x border-b border-white p-3">
        졸업작품 {{ graduation }}
      </div>
      <div class="col-span-4 border-r border-b border-white p-3 text-center">
        팀이름
      </div>
      <div class="col-span-2 border-r border-b border-white p-3 text-center">
        조회수
      </div>
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

<script setup></script>
