<template>
  <div class="flex items-center">
    <div class="hidden sm:flex">
      <StarRating
        :star-size="12"
        :rounded-corners="true"
        :border-width="4"
        :show-rating="false"
        :read-only="true"
        :rating="rating"
      ></StarRating>
    </div>
    <div class="sm:hidden mr-1">
      <span class="text-yellow-300 text-lg">★</span>{{ rating }}
    </div>

    <div class="sm:flex">
      <span class="font-bold ml-1 sm:ml-2">{{ name }}</span>
      <div class="mx-1 sm:ml-10">{{ comment }}</div>
    </div>
    <button
      v-if="commentUid === user?.uid"
      type="submit"
      class="ml-auto py-1 px-2 bg-indigo-500 text-white rounded-md"
      @click="deleteProjectComment(menu, postId, projectId, commentUid, commentId)"
    >
      <font-awesome-icon icon="fa-solid fa-trash" />
      <span class="hidden sm:inline sm:ml-1.5">삭제</span>
    </button>
  </div>
</template>

<script setup>
import StarRating from "vue-star-rating";
import { user } from "../firebase/user";
import { useRouteParams } from "@vueuse/router";
import { deleteProjectComment } from "../firebase/post";

const props = defineProps({
  comment: String,
  rating: Number,
  name: String,
  commentUid: String,
  commentId: String,
  menu: String,
});
const postId = useRouteParams("post_id").value;
const projectId = useRouteParams("project_id").value;
</script>
