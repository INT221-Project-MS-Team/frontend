<script setup>
const props = defineProps({
  text: {
    type: String,
    default: '',
  },
  color: {
    type: String,
    default: 'primary',
  },
});

const colors = {
  primary: ['bg-blue-100', 'text-blue-800'],
  dark: ['bg-gray-100 ', 'text-gray-800'],
  red: ['bg-red-100 ', 'text-red-800'],
  green: ['bg-green-100 ', 'text-green-800'],
  yellow: ['bg-yellow-100 ', 'text-yellow-800'],
  indego: ['bg-indigo-100 ', 'text-indigo-800'],
  purple: ['bg-purple-100 ', 'text-purple-800'],
  pink: ['bg-pink-100 ', 'text-pink-800'],
};
</script>

<template>
  <span
    class="text-xs font-semibold mr-2 px-2.5 py-0.5 rounded"
    :class="colors[color]"
    >{{ text }}</span
  >
</template>

<style scoped></style>
