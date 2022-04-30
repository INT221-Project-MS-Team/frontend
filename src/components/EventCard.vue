<script setup>
import { ArrowNarrowRightIcon } from '@heroicons/vue/outline';
import { getDate, getTime } from '../utils';
import SmButton from './SmButton.vue';
const emits = defineEmits([]);
const props = defineProps({
  event: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div
    class="flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 min-w-full p-2"
  >
    <img
      class="w-2/12 rounded-full object-scale-down"
      src="/images/person.png"
      alt=""
    />
    <div class="flex flex-col justify-between p-3 leading-normal">
      <div class="mb-3 font-normal">
        <span
          ><span class="text-clinic-blue-300">Name:</span>
          {{ event.bookingName }}</span
        >
        <br />
        <span
          ><span class="text-clinic-blue-300">Date:</span>
          {{ getDate(event.eventStartTime) }}
        </span>
        <br />
        <span
          ><span class="text-clinic-blue-300">Start Time:</span>
          {{ getTime(event.eventStartTime) }}
        </span>
        <br />
        <span
          ><span class="text-clinic-blue-300">Duration:</span>
          {{ event.eventDuration }} Minutes</span
        >
        <br />
        <span
          ><span class="text-clinic-blue-300">Category:</span>
          {{ event.eventCategory.eventCategoryName }}</span
        >
        <br />
      </div>
      <router-link :to="`/event?id=${event.id}`">
        <SmButton text="Read more detail" />
      </router-link>
    </div>
  </div>
</template>

<style scoped></style>
