<script setup>
import { ArrowNarrowRightIcon } from '@heroicons/vue/outline';
import {
  getDate,
  getTime,
  categoryIdToBadgeColor,
  truncateString,
  categoryIdToStyleColor,
  getInputDate,
  getInputTime
} from '@/utils';
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
  <router-link
    :to="`/event?id=${event.id}`"
    class="flex flex-col items-center rounded-lg border shadow-md md:flex-row md:max-w-xl hover:bg-clinic-blue-25 min-w-full min-h-min"
  >
    <img
      class="w-4/12 md:w-3/12 lg:w-2/12 xl:w-1/12"
      src="/images/person.png"
      alt=""
    />
    <div class="flex flex-col justify-between p-5 leading-normal w-full">
      <div
        class="mb-2 font-normal overflow-auto force-overflow grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-3 gap-1"
      >
        <span class="truncate"
          ><span class="text-clinic-blue-300">Name:</span>
          {{ truncateString(event.bookingName) }}</span
        >
        <span class="truncate"
          ><span class="text-clinic-blue-300">Date:</span>
          <!-- {{ getDate(event.eventStartTime) }} -->
          <input
            type="date"
            class="border-0 p-0 mx-auto bg-transparent"
            placeholder=" "
            :value="getInputDate(event.eventStartTime)"
            disabled
          />
        </span>

        <span class="truncate"
          ><span class="text-clinic-blue-300">Start Time:</span>
          <!-- {{ getTime(event.eventStartTime) }} -->
          <input
            type="time"
            class="border-0 p-0 mx-auto bg-transparent"
            placeholder=" "
            :value="getInputTime(event.eventStartTime)"
            disabled
          />
        </span>

        <span class="truncate"
          ><span class="text-clinic-blue-300">Duration:</span>
          {{ event.eventDuration }} Minutes</span
        >

        <span class="truncate xl:col-span-2">
          <span class="text-clinic-blue-300">Category: </span>
          <Badge
            :text="event.eventCategory.eventCategoryName"
            :color="categoryIdToBadgeColor(event.eventCategory.id)"
          />
        </span>
      </div>
      <!-- <div class="w-full flex justify-end">
        <router-link :to="`/event?id=${event.id}`">
          <SmButton btnType="events" text="Read More → " />
        </router-link>
      </div> -->
    </div>
    <div
      class="hidden md:flex md:w-3/12 lg:w-2/12 xl:w-1/12 h-full rounded-lg rounded-l-none items-center"
      :class="categoryIdToStyleColor(event.eventCategory.id)"
    >
      <!-- <p class="rotate-90 text-xs text-center items-center">
        {{ event.eventCategory.eventCategoryName }}
      </p> -->
    </div>
  </router-link>
</template>

<style scoped></style>
