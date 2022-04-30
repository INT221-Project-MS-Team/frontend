<script setup>
import NoEvent from '../components/NoEvent.vue';
import EventCard from '../components/EventCard.vue';
import SmButton from '../components/SmButton.vue';
import EventDetail from '../components/EventDetail.vue';
import Divider from '../components/Divider.vue';
import LitepieDatepicker from 'litepie-datepicker';

import { ref } from '@vue/reactivity';
import { computed, onBeforeMount } from '@vue/runtime-core';

const schedulesData = ref([]);
const selectedDate = ref(
  new Date().toISOString().substr(0, 10).split('-').reverse().join('/')
);
const sortBy = ref('eventStartTime');
const sortOrder = ref('desc');
const formatter = ref({
  date: 'DD/MM/YYYY',
  month: 'MMM',
});

const endPointUrl = computed(() => {
  return (
    import.meta.env.VITE_SERVER_URI +
    `/api/events?sortBy=${sortBy.value}&sortOrder=${sortOrder.value}`
  );
});

const getSchedulesData = async () => {
  const response = await fetch(endPointUrl.value);
  const data = await response.json();
  if (data?.content) {
    schedulesData.value = data.content;
  }
  console.log(data);
};

onBeforeMount(async () => {
  await getSchedulesData();
});
</script>

<template>
  <div
    class="bg-schedules w-screen h-screen bg-no-repeat bg-cover bg-center flex flex-wrap items-center justify-center gap-2">
    <div class="bg-white rounded-3xl h-2/3 w-7/12 flex shadow-lg">
      <!-- no event -->
      <div v-if="!schedulesData.length" class="flex flex-col items-center justify-center">
        <NoEvent />
      </div>

      <!-- have event -->
      <div v-else class="flex flex-col p-10 min-w-full">
        <p class="text-gray-400 text-sm md:text-lg lg:text-2xl">
          Scheduled Events
        </p>
        <div class="flex flex-col gap-2 overflow-auto min-w-full">
          <EventCard v-for="(event, index) in schedulesData" :event="event" :key="index"  />
        </div>
      </div>
    </div>

    <div class="bg-white rounded-3xl h-2/3 w-3/12 flex shadow-lg">
      <div class="flex flex-col p-10 min-w-full">
        <p class="text-gray-400 text-sm md:text-lg lg:text-2xl">Event Filter</p>
        <Divider text="Date" />
        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Select date</label>
        <litepie-datepicker :formatter="formatter" as-single v-model="selectedDate"></litepie-datepicker>
        <Divider text="Category" />
        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Select category</label>
        <select
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option selected>All</option>
          <option>Front-End</option>
          <option>Backend</option>
          <option>Database</option>
          <option>DevOps/Infra</option>
          <option>Project Managers</option>
        </select>
        <Divider text="Apply" />
        <SmButton text="Apply" btnType="secondary" />
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
