<script setup>
import { CheckCircleIcon } from '@heroicons/vue/outline';
import Button from './Button.vue';
import SmButton from './SmButton.vue';
const props = defineProps({
  reserveData: {
    type: Object,
    default: {},
  },
});
</script>

<template>
  <div class="flex flex-col justify-center items-center gap-2 mt-16">
    <CheckCircleIcon class="h-2/6 w-2/6 text-green-500" />
    <p class="text-lg">Reserve Successfully</p>
    <router-link :to="`/event?id=${reserveData.id}`">
    <SmButton text="View" />

    </router-link>
  </div>
</template>

<style scoped></style>
