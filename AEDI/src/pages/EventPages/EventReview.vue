<template>
  <div class="px-5">
    <div class="mb-5">
      <span class="font-bold text-lg mr-3">평가작성 현황 :</span>
      <span class="text-lg">
        {{ reviewCount }}
      </span>
    </div>
    <h2 class="font-bold text-lg mb-2">평가작성 유저 랭킹</h2>
    <div v-for="(user, key) in userRank" :key="key">
      <span class="mr-0.5">{{ key + 1 }}.</span>
      <span>{{ user?.name }}</span>
      <span> - {{ user?.myReviewCount }}</span>
    </div>
  </div>
</template>

<script setup>
import { onSnapshotUserReviewCount, onSnapshotUserReviewRank } from "../../firebase/post";

const reviewCount = onSnapshotUserReviewCount();
const userRank = onSnapshotUserReviewRank();
</script>
