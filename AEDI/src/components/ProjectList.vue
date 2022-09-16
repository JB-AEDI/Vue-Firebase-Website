<template>
  <div>
    <div class="grid grid-cols-12 gap-2 mt-8">
      <div
        v-for="i in 12"
        class="col-span-3 bg-gray-500 rounded-md h-96 text-white"
      >
        {{ i }}
      </div>
    </div>
  </div>
</template>

<script setup></script>
