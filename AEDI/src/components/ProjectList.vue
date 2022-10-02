<template>
  <div>
    <div
      class="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 mt-3"
    >
      <div v-for="project in projects">
        <div class="rounded-md h-96 border-2 border-black">
          <div
            class="w-full h-56 rounded-t cursor-pointer bg-cover border-b"
            :style="{ backgroundImage: `url(${encodeURI(project?.img)})` }"
            @click="moveProject(menu, project.id)"
          ></div>
          <div class="px-3 mt-2 truncate">
            <span
              class="font-bold text- mt-1 cursor-pointer"
              @click="moveProject(menu, project.id)"
              >{{ project.title }}</span
            >
            <div class="truncate h-20 text-xs">
              <div
                v-html="md(project?.description)"
                class="project-description text-sm"
              ></div>
            </div>
            <div class="flex justify-between text-sm mt-2">
              <div>
                <span>조회수</span>
                <span class="ml-1">{{ project.views }}</span>
              </div>
              <div>
                <font-awesome-icon icon="fa-solid fa-heart" class="text-red-400 mr-1" />
                <span>{{ project.likes }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useRouteParams } from "@vueuse/router";

defineProps({
  projects: Array,
  menu: String,
});

const router = useRouter();
const postId = useRouteParams("post_id").value;

const moveProject = (menu, project_id) => {
  router.push({
    path: `/${menu}/${postId}/project/${project_id}`,
  });
};
</script>
<style>
.project-description img {
  display: none;
}
.project-description hr {
  display: none;
}
</style>
