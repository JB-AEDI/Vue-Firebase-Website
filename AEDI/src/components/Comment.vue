<template>
  <div class="flex items-center">
    <StarRating
      :star-size="12"
      :rounded-corners="true"
      :border-width="4"
      :show-rating="false"
      :read-only="true"
      :rating="rating"
    ></StarRating>
    <img :src="user?.photoURL" alt="프로필사진" class="w-8 h-8 ml-5 rounded-lg shadow" />
    <span class="font-bold ml-2">{{ name }}</span>
    <div class="ml-10">{{ comment }}</div>
    <button
      v-if="commentUid === user?.uid"
      @click="[deleteComment()]"
      class="ml-auto py-1 px-2 bg-indigo-500 text-white rounded-md"
    >
      <span><i class="fa-solid fa-trash-can"></i></span>
      <span class="ml-1.5">삭제</span>
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

const deleteComment = async () => {
  await deleteProjectComment(
    props.menu,
    postId,
    projectId,
    props.commentUid,
    props.commentId
  );
};
</script>
