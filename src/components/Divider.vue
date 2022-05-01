<script setup>
const props = defineProps({
  text: {
    type: String,
    default: '',
  },
});
</script>

<template>
  <div class="relative flex py-5 items-center">
    <span class="flex-shrink mx-2 text-gray-800">{{ text }}</span>
    <div class="flex-grow border-t border-gray-400"></div>
  </div>
</template>

<style scoped></style>
