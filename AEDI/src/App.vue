<template>
  <Header></Header>
  <div class="mt-6">
    <RouterView />
  </div>
</template>

<script setup>
import Header from "./components/Header.vue";

import { user, getUserProfile } from "./firebase/user";
import { ref, watch, provide } from "vue";

const userProfile = ref({
  name: "",
  admin: false,
});

provide("userProfile", userProfile);

watch(user, () => {
  getUserProfile()
    .then((profile) => (userProfile.value = profile))
    .catch(() => (userProfile.value = {}));
});
</script>
