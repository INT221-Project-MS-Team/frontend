<script setup>
const props = defineProps({
  text: {
    type: String,
    default: '',
  },
});
</script>

<template>
  <div class="relative flex p-5 pl-0 items-center">
    <span class="flex-shrink mr-2 ml-0 text-gray-800">{{ text }}</span>
    <div class="flex-grow border-t border-clinic-blue-25"></div>
  </div>
</template>

<style scoped></style>
