<template>
  <Carousel :itemsToShow="itemsToShow" :wrapAround="true">
    <Slide v-for="slide in projects" :key="slide">
      <div
        class="carousel__item w-5/6 h-full pb-[133%] bg-white shadow-md bg-cover"
        :style="{ backgroundImage: `url(${slide.img})` }"
        @dblclick="goUrl(slide.url)"
      ></div>
    </Slide>

    <template #addons>
      <Navigation />
      <Pagination />
    </template>
  </Carousel>
</template>

<script>
import { defineComponent } from "vue";
import { Carousel, Pagination, Slide, Navigation } from "vue3-carousel";

import "vue3-carousel/dist/carousel.css";

export default defineComponent({
  name: "Autoplay",
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
  props: {
    projects: Array,
    itemsToShow: Number,
  },
  methods: {
    goUrl(url) {
      window.open(url, "_self");
    },
  },
});
</script>

<style>
.carousel__item {
  display: flex;
  justify-content: center;
  align-items: center;
}
.carousel__slide > .carousel__item {
  transform: scale(1);
  opacity: 0.5;
  transition: 0.5s;
}
.carousel__slide--visible > .carousel__item {
  opacity: 1;
  transform: rotateY(0);
}
.carousel__slide--next > .carousel__item {
  transform: scale(0.9) translate(-10px);
}
.carousel__slide--prev > .carousel__item {
  transform: scale(0.9) translate(10px);
}
.carousel__slide--active > .carousel__item {
  transform: scale(1.1);
}
.carousel__prev,
.carousel__next {
  background-color: rgb(59, 168, 204);
}

.carousel__pagination-button--active {
  background-color: blue !important;
}
.carousel__pagination-button {
  background-color: lightblue;
}
</style>
