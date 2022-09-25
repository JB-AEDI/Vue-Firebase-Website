<template>
  <div
    class="flex items-center justify-between h-20 bg-stone-100 sticky top-0 shadow-xl z-10"
  >
    <div class="flex items-center justify-between w-10/12 pl-3">
      <RouterLink :to="{ name: 'main' }">
        <a href="@">
          <div class="flex items-center">
            <font-awesome-icon
              icon="fa-regular fa-lightbulb"
              size="2xl"
              rotation="180"
            />
            <h1 class="text-3xl font-bold ml-2">AEDI</h1>
          </div>
        </a>
      </RouterLink>
      <RouterLink to="/graduation/page" class="text-lg font-semibold"
        >졸업작품</RouterLink
      >
      <RouterLink to="/contest/page" class="text-lg font-semibold"
        >공모전</RouterLink
      >
      <RouterLink to="/notice/page" class="text-lg font-semibold"
        >공지사항</RouterLink
      >
      <RouterLink to="/event/page" class="text-lg font-semibold"
        >이벤트</RouterLink
      >
    </div>
    <div class="w-2/12 flex justify-end pr-3">
      <div v-if="user === null">
        <RouterLink
          :to="{ name: '로그인' }"
          class="font-medium border border-gray-400 py-1 px-2 rounded hover:bg-gray-200"
        >
          <a href="@">로그인</a>
        </RouterLink>
      </div>
      <div v-else class="flex items-center">
        <div class="flex items-center">
          <span
            v-if="!user?.emailVerified"
            class="font-bold text-red-600 ml-2 cursor-pointer"
            @click="router.push({ path: '/email' })"
            >[이메일 인증안됨]</span
          >
          <div>
            <img
              :src="user?.photoURL"
              alt="프로필사진"
              class="rounded-lg w-10 box-content hover:shadow hover:border-2 hover:border-gray-300 cursor-pointer"
              @click="clickPhoto"
            />
            <div
              v-if="isClickedPhoto"
              class="fixed top-24 right-4 bg-white rounded w-64 shadow-lg"
              ref="userModal"
            >
              <div class="flex justify-center my-5">
                <img
                  :src="user?.photoURL"
                  alt="프로필사진"
                  class="w-20 rounded-lg shadow-md"
                />
              </div>
              <div class="flex justify-center">
                <span>{{ user?.displayName }}</span>
                <span v-if="userProfile.admin">(관리자)</span>
                <span>님</span>
              </div>
              <div class="flex justify-center text-sm">
                <span>{{ user?.email }}</span>
              </div>
              <div class="flex justify-center border-b border-gray-300 py-3">
                <button
                  class="py-1 px-3 border-2 rounded-3xl hover:bg-gray-100"
                  @click="
                    [
                      router.push({ name: '마이페이지' }),
                      (isClickedPhoto = false),
                    ]
                  "
                >
                  사용자정보 변경
                </button>
              </div>
              <div class="flex justify-center p-4">
                <button
                  @click="[(isClickedPhoto = false), doLogout()]"
                  class="py-2 px-4 border-2 rounded-md hover:bg-gray-100"
                >
                  로그아웃
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
    </div>
  </div>
</template>

<script setup>
import { RouterLink, useRouter } from "vue-router";
import { user, logout } from "../firebase/user";
import { inject, ref } from "vue";
import { onClickOutside } from "@vueuse/core";

const router = useRouter();
const userProfile = inject("userProfile");

const isClickedPhoto = ref(false);
const userModal = ref(null);

onClickOutside(userModal, () => (isClickedPhoto.value = false));

const clickPhoto = () => {
  if (isClickedPhoto.value) {
    isClickedPhoto.value = false;
  } else {
    isClickedPhoto.value = true;
  }
};

const doLogout = async () => {
  await logout();
};
</script>
