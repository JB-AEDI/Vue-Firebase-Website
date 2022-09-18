<template>
  <div class="flex">
    <StarRating
      :star-size="12"
      :rounded-corners="true"
      :border-width="4"
      :show-rating="false"
      :read-only="true"
      :rating="rating"
    ></StarRating>
    <span class="font-bold ml-8">{{ name }}</span>
    <div class="ml-10">{{ comment }}</div>
  </div>
</template>

<script setup>
import StarRating from "vue-star-rating";
const props = defineProps({ comment: String, rating: Number, name: String });
</script>
