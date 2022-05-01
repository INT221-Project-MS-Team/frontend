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
    class="flex flex-col items-center bg-slate-900 rounded-lg border shadow-md md:flex-row md:max-w-xl hover:bg-clinic-blue-50 min-w-full min-h-min p-2 hover:text-white"
  >
    <img
      class="w-2/12 rounded-full object-scale-down"
      src="/images/person.png"
      alt=""
    />
    <div class="flex flex-col justify-between p-1 leading-normal">
      <div class="mb-2 font-normal force-overflow">
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
        <SmButton btnType="events" text="Read More → " />
      </router-link>
    </div>
  </div>
</template>

<style scoped></style>
