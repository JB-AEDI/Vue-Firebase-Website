<template>
  <form class="h-full w-full" @submit.prevent="signin">
    <div class="h-full flex flex-col items-center justify-center text-lg">
      <div
        v-if="error"
        class="w-4/5 md:w-1/2 mb-4 rounded-md bg-red-50 border border-red-100 p-2"
      >
        {{ error }}
      </div>
      <div class="w-4/5 md:w-1/2">
        <label for="email-address" class="sr-only">Email address</label>
        <input
          id="email-address"
          name="email"
          type="email"
          autocomplete="email"
          required
          class="appearance-none w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
          placeholder="Email address"
          v-model="credentials.email"
        />
      </div>
      <div class="w-4/5 md:w-1/2 mt-4">
        <label for="password" class="sr-only">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          autocomplete="password"
          required
          class="appearance-none w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
          placeholder="Password"
          v-model="credentials.password"
        />
      </div>

      <div class="w-4/5 md:w-1/2 mt-4">
        <button
          class="w-full block rounded-md bg-indigo-500 text-white p-2"
          type="submit"
        >
          로그인
        </button>
      </div>

      <RouterLink
        :to="{ name: '회원가입' }"
        class="w-4/5 md:w-1/2 mt-4 text-center"
      >
        계정이 없습니까? 회원가입하세요.
        <a href="@" class="text-gray-500 underline">회원가입</a>
      </RouterLink>
    </div>
  </form>
</template>

<script setup>
import { useCredentials } from "../composable/useCredentials";
import { login, getUserName, getUserAdmin } from "../firebase/user";
import { useRouter, RouterLink } from "vue-router";
import { useStore } from "vuex";
import { SET_USER_NAME, SET_USER_ADMIN } from "./../store/mutation-types";

const { credentials, error, perform } = useCredentials();
const router = useRouter();
const store = useStore();

const signin = perform(async () => {
  await login(credentials.email, credentials.password);
  getUserName().then((name) => {
    store.commit(`user/${SET_USER_NAME}`, {
      name,
    });
  });
  getUserAdmin().then((admin) => {
    store.commit(`user/${SET_USER_ADMIN}`, admin);
  });
  await router.push({ name: "main" });
});
</script>
