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
      <span
        v-if="!user?.emailVerified"
        class="font-bold text-red-600 ml-2 cursor-pointer"
        @click="router.push({ path: '/email' })"
        >[이메일 인증안됨]</span
      >
      <span @click="doLogout" class="cursor-pointer ml-2">로그아웃</span>
    </div>
  </div>

  <div class="flex items-center justify-between p-5">
    <RouterLink :to="{ name: 'main' }">
      <a href="@">
        <div class="flex items-center">
          <font-awesome-icon icon="fa-regular fa-lightbulb" size="2xl" rotation="180" />
          <h1 class="text-3xl font-bold ml-2">AEDI</h1>
        </div>
      </a>
    </RouterLink>
    <RouterLink to="/graduation/page" class="text-lg font-semibold">졸업작품</RouterLink>
    <RouterLink to="/contest/page" class="text-lg font-semibold">공모전</RouterLink>
    <RouterLink to="/notice/page" class="text-lg font-semibold">공지사항</RouterLink>
    <RouterLink to="/event/page" class="text-lg font-semibold">이벤트</RouterLink>
    <label class="relative block">
      <span class="sr-only">Search</span>
      <span class="absolute inset-y-0 left-0 flex items-center pl-2">
        <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
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
import { RouterLink, useRouter } from "vue-router";
import { user, logout } from "../firebase/user";
import { inject } from "vue";

const router = useRouter();
const userProfile = inject("userProfile");

const doLogout = async () => {
  await logout();
};
</script>
