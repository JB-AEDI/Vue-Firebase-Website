<template>
  <div class="mx-5">
    <div class="flex justify-center pb-[35%]">
      <div class="w-11/12 h-0">
        <Carousel :projects="projects"></Carousel>
      </div>
    </div>
    <div class="flex justify-center lg:gap-12 md:gap-10 sm:gap-8 gap-4 mt-7 mb-5">
      <div
        class="bg-gray-200 md:py-3 md:px-4 sm:py-2 sm:px-3 py-1.5 px-2 flex items-center gap-3"
      >
        <font-awesome-icon
          icon="fa-solid fa-clock-rotate-left"
          class="md:text-2xl sm:text-lg"
        />
        <div class="flex flex-col items-center">
          <div class="md:text-base text-xs">150</div>
          <div class="md:text-base text-xs">마감임박</div>
        </div>
      </div>

      <div
        class="bg-gray-200 md:py-3 md:px-4 sm:py-2 sm:px-3 py-1.5 px-2 flex items-center gap-3"
      >
        <font-awesome-icon
          icon="fa-solid fa-cloud-arrow-up"
          class="md:text-2xl sm:text-lg"
        />
        <div class="flex flex-col items-center">
          <div class="md:text-base text-xs">239</div>
          <div class="md:text-base text-xs">최근등록</div>
        </div>
      </div>

      <div
        class="bg-gray-200 md:py-3 md:px-4 sm:py-2 sm:px-3 py-1.5 px-2 flex items-center gap-3"
      >
        <font-awesome-icon icon="fa-solid fa-bullhorn" class="md:text-2xl sm:text-lg" />
        <div class="flex flex-col items-center">
          <div class="md:text-base text-xs">342</div>
          <div class="md:text-base text-xs">진행중</div>
        </div>
      </div>
    </div>
    <div class="flex justify-center">
      <div class="w-[1000px]">
        <RouterLink to="/graduation/page">
          <a href="@" class="text-xl">
            <span><font-awesome-icon icon="fa-solid fa-graduation-cap" size="1x" /></span>
            <span class="font-semibold ml-2">졸업작품</span>
          </a>
        </RouterLink>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-6 text-white my-5">
          <div
            v-for="graduation in 8"
            class="bg-indigo-600 flex justify-center items-center rounded-lg"
            style="min-height: 280px"
          >
            <div>{{ graduation }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-center">
      <div class="mt-10 w-[1000px]">
        <RouterLink to="/contest/page">
          <a href="@" class="text-xl">
            <span><font-awesome-icon icon="fa-solid fa-book" size="1x" /></span>
            <span class="font-semibold ml-2">공모전</span>
          </a>
        </RouterLink>
        <div class="grid grid-cols-2 sm:grid-cols-4 w-full gap-6 text-white my-5">
          <div
            v-for="contest in 8"
            class="bg-indigo-600 flex justify-center items-center rounded-lg"
            style="min-height: 300px"
          >
            <div>{{ contest }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Carousel from "../components/Carousel.vue";
import { RouterLink } from "vue-router";
import { ref } from "vue";

const props = defineProps({
  projects: Array,
});

const projects = ref([
  {
    img:
      "https://firebasestorage.googleapis.com/v0/b/aedi--project.appspot.com/o/images%2F8d85bc74e6974be2d0471924178d59e18rBJ60buefJhONQx-1.png?alt=media&token=a810160e-6b68-497d-8c4c-f8e4e4058fb8",
    url:
      "https://aedi--project.web.app/#/graduation/btO5HAYyqKKU1UrtMPsP/project/32980n77ld6VxjswTFY9",
  },
  {
    img:
      "https://firebasestorage.googleapis.com/v0/b/aedi--project.appspot.com/o/images%2F0b3f1c1f2fca404f99dc13be97c0ca5fzJEb5uy5plwIFZIF-1.png?alt=media&token=ff4c1f42-6cd9-4b07-89e0-7c2e73b72306",
    url:
      "https://aedi--project.web.app/#/graduation/btO5HAYyqKKU1UrtMPsP/project/ZSQ9ZOu08rmuS7zJLE8D",
  },
  {
    img:
      "https://firebasestorage.googleapis.com/v0/b/aedi--project.appspot.com/o/images%2F85378b64d8df4e3a8b86998c9663c614UdO6qSNds2UHbY6D-0.png?alt=media&token=397a6dee-ffe4-44aa-9bc8-0dcd3d4bef2f",
    url:
      "https://aedi--project.web.app/#/graduation/btO5HAYyqKKU1UrtMPsP/project/Mis6ROiCmum7v98vuL52",
  },
  {
    img:
      "https://firebasestorage.googleapis.com/v0/b/aedi--project.appspot.com/o/images%2F17-1.PNG?alt=media&token=232d62d9-3ef4-4f79-8c77-dd68ad1b7804",
    url:
      "https://aedi--project.web.app/#/graduation/btO5HAYyqKKU1UrtMPsP/project/ZUJ5dJULjONvRV0ZnmJ3",
  },
  {
    img:
      "https://firebasestorage.googleapis.com/v0/b/aedi--project.appspot.com/o/images%2Fimg07.jpg?alt=media&token=7fe497a6-64fb-495d-b6d8-741419630c47",
    url:
      "https://aedi--project.web.app/#/graduation/HpYXjdVOqGbJl6CVm2gx/project/QM9qRjfU64tCJjnEFNIT",
  },
  {
    img:
      "https://firebasestorage.googleapis.com/v0/b/aedi--project.appspot.com/o/images%2Fwellmade.png?alt=media&token=e1d81251-428e-48cc-91ac-02b102dbde15",
    url:
      "https://aedi--project.web.app/#/graduation/XUlwn516Tjy3jpkgQVxZ/project/W4uotAkrKlBhsE8HJjWl",
  },
  {
    img:
      "https://firebasestorage.googleapis.com/v0/b/aedi--project.appspot.com/o/images%2Fcoconut.jpg?alt=media&token=c12bd07e-0cbd-4374-9b36-a9acff19dff6",
    url:
      "https://aedi--project.web.app/#/graduation/XUlwn516Tjy3jpkgQVxZ/project/AqFhcJ1AsG5zOMP3QRcy",
  },
]);
</script>
