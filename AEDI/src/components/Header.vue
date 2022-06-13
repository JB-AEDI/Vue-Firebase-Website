<template>
  <div class="flex justify-end items-center pl-5 pr-5 pt-5">
    <div v-if="user === null">
      <RouterLink :to="{ name: '로그인' }" class="mr-5">
        <a href="@">로그인</a>
      </RouterLink>
      <RouterLink :to="{ name: '회원가입' }">
        <a href="@">회원가입</a>
      </RouterLink>
    </div>
    <div v-else>
      <span>{{ userProfile.name }}</span>
      <span v-if="userProfile.admin">(관리자)</span>
      <span>님</span>
      <span @click="doLogout" class="cursor-pointer ml-2">로그아웃</span>
    </div>
  </div>

  <div class="flex items-center justify-between p-5">
    <RouterLink :to="{ name: 'main' }">
      <a href="@">
        <div class="flex items-center">
          <i class="fa-regular fa-lightbulb fa-2xl"></i>
          <h1 class="text-3xl">AEDI</h1>
        </div>
      </a>
    </RouterLink>
    <RouterLink :to="{ name: '졸업작품' }" class="text-lg">졸업작품</RouterLink>
    <RouterLink :to="{ name: '공모전' }" class="text-lg">공모전</RouterLink>
    <RouterLink :to="{ name: '공지사항' }" class="text-lg">공지사항</RouterLink>
    <RouterLink :to="{ name: '이벤트' }" class="text-lg">이벤트</RouterLink>
    <label class="relative block">
      <span class="sr-only">Search</span>
      <span class="absolute inset-y-0 left-0 flex items-center pl-2">
        <i class="fa-solid fa-magnifying-glass"></i>
      </span>
      <input
        class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
        placeholder="Search for anything..."
        type="text"
        name="search"
      />
    </label>
  </div>

  <div v-if="$route.name == 'main'" class="border-b"></div>
  <div v-else class="flex justify-between p-5 bg-indigo-500 text-white mb-2">
    <h2 class="text-xl ml-1">{{ $route.name }}</h2>

    <div class="flex">
      <h3 class="ml-4">홈</h3>
      <div class="flex">
        <h3 class="ml-4">></h3>
        <h3 class="ml-4">{{ $route.name }}</h3>
      </div>
      <!-- <h3 class="mr-4">></h3>
      <h3>디자인</h3> -->
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { user, logout, useUserProfile } from "../firebase/user";

const doLogout = async () => {
  await logout();
};
const userProfile = useUserProfile();
</script>
