<script setup>
import { ArrowNarrowRightIcon } from '@heroicons/vue/outline';
import {
  getDate,
  getTime,
  categoryIdToBadgeColor,
  truncateString,
} from '../utils';
import SmButton from './SmButton.vue';
import Badge from './Badge.vue';
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
    class="flex flex-col items-center rounded-lg border shadow-md md:flex-row md:max-w-xl hover:bg-clinic-blue-25 min-w-full min-h-min p-2"
  >
    <img
      class="w-4/12 md:w-3/12 lg:w-2/12 object-scale-down"
      src="/images/person.png"
      alt=""
    />
    <div class="flex flex-col justify-between p-1 leading-normal">
      <div
        class="mb-2 font-normal overflow-auto force-overflow grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-3 gap-1"
      >
        <span class="truncate"
          ><span class="text-clinic-blue-300">Name:</span>
          {{ truncateString(event.bookingName) }}</span
        >
        <span class="truncate"
          ><span class="text-clinic-blue-300">Date:</span>
          {{ getDate(event.eventStartTime) }}
        </span>

        <span class="truncate"
          ><span class="text-clinic-blue-300">Start Time:</span>
          {{ getTime(event.eventStartTime) }}
        </span>

        <span class="truncate"
          ><span class="text-clinic-blue-300">Duration:</span>
          {{ event.eventDuration }} Minutes</span
        >

        <span class="truncate">
          <span class="text-clinic-blue-300">Category: </span>
          <Badge
            :text="event.eventCategory.eventCategoryName"
            :color="categoryIdToBadgeColor(event.eventCategory.id)"
          />
        </span>
      </div>
      <router-link :to="`/event?id=${event.id}`">
        <SmButton btnType="events" text="Read More → " />
      </router-link>
    </div>
  </div>
</template>

<style scoped></style>
