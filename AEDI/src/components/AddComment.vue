<template>
  <div class="flex items-center">
    <span class="font-semibold text-lg ml-2 mr-3">평점</span>
    <StarRating
      :star-size="20"
      :rounded-corners="true"
      :border-width="4"
      :show-rating="false"
      v-model:rating="rating"
    ></StarRating>
  </div>
  <div class="w-full mt-2 ml-1">
    <form @submit.prevent="submitComment">
      <div class="mb-4 w-full bg-gray-50 rounded-lg border border-gray-200">
        <div class="py-2 px-4 bg-white rounded-t-lg">
          <label for="comment" class="sr-only">Your comment</label>
          <textarea
            id="comment"
            rows="4"
            class="px-0 w-full text-sm text-gray-900 bg-white border-0 focus:ring-0"
            placeholder="Write a comment..."
            v-model="comment"
            required
          ></textarea>
        </div>
        <div class="flex justify-end items-center py-2 px-3 border-t">
          <button
            type="submit"
            class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800"
          >
            댓글 작성
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import StarRating from "vue-star-rating";
import { ref, inject } from "vue";
import { useRouteParams } from "@vueuse/router";
import { createProjectComment } from "../firebase/post";
import { useRouter } from "vue-router";

const router = useRouter();

const userProfile = inject("userProfile");

const rating = ref(0);
const comment = ref("");
const postId = useRouteParams("post_id").value;
const projectId = useRouteParams("project_id").value;

const props = defineProps({
  menu: String,
});

const submitComment = async () => {
  await createProjectComment(
    props.menu,
    postId,
    projectId,
    rating,
    comment,
    userProfile?.value?.name
  );
  router.go(0);
};
</script>
