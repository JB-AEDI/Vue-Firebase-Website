<template>
  <div>
    <div class="grid grid-cols-12 gap-2 mt-8">
      <div
        v-for="project in projects"
        class="col-span-3 rounded-md h-96 border-2 border-black"
      >
        <div
          class="w-full h-56 rounded-t-md cursor-pointer"
          :style="{ backgroundImage: `url(${project.img})` }"
          @click="moveProject(project.id)"
        ></div>
        <div class="px-2">
          <span
            class="font-bold text-lg mt-1 cursor-pointer"
            @click="moveProject(menu, project.id)"
            >{{ project.title }}</span
          >
          <div class="truncate h-20 text-xs">
            <NonCssViewer :content="project.description"></NonCssViewer>
          </div>
          <div class="flex justify-between text-sm mt-2">
            <div>
              <span>조회수</span>
              <span class="ml-1">{{ project.views }}</span>
            </div>
            <div>
              <span class="text-yellow-300 mr-1">★</span>
              <span>{{ project.likes }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import NonCssViewer from "./editor/NonCssViewer.vue";
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
