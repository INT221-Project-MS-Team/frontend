<script setup>
import NoEvent from '../components/NoEvent.vue';
import EventCard from '../components/EventCard.vue';
import SmButton from '../components/SmButton.vue';
import Divider from '../components/Divider.vue';
import LitepieDatepicker from 'litepie-datepicker';
import { getCurrentDateTime, convertToISO } from '../utils';

import { ref } from '@vue/reactivity';
import { computed, onBeforeMount } from '@vue/runtime-core';

const schedulesData = ref([]);
const categoriesData = ref([]);
const selectedEventCategoryName = ref('All');
const selectedDate = ref('');
const sortBy = ref('eventStartTime');
const sortOrder = ref('desc');
const formatter = ref({
  date: 'DD/MM/YYYY',
  month: 'MMM',
});

const endPointUrl = computed(() => {
  return (
    import.meta.env.VITE_SERVER_URL +
    `/api/events?sortBy=${sortBy.value}&sortOrder=${sortOrder.value}`
  );
});

const filteredSchedules = computed(() => {
  const schedules = schedulesData.value;
  const categoryName =
    selectedEventCategoryName.value === 'All'
      ? null
      : selectedEventCategoryName.value;
  const dateTemp = selectedDate.value === '' ? null : selectedDate.value;

  if (categoryName && dateTemp) {
    return schedules.filter(
      (schedule) =>
        schedule.eventCategory.eventCategoryName === categoryName &&
        schedule.eventStartTime.includes(convertToISO(dateTemp))
    );
  }

  if (categoryName) {
    return schedules.filter(
      (schedule) => schedule.eventCategory.eventCategoryName === categoryName
    );
  }

  if (dateTemp) {
    return schedules.filter((schedule) =>
      schedule.eventStartTime.includes(convertToISO(dateTemp))
    );
  }

  return schedules;
});

const resetFilter = () => {
  selectedEventCategoryName.value = 'All';
  selectedDate.value = '';
};

const getSchedulesData = async () => {
  const response = await fetch(endPointUrl.value);
  if (response.status === 200) {
    const data = await response.json();
    if (data?.content) {
      schedulesData.value = data.content;
    }
    console.log(data);
  } else {
    console.log('Fetch Scheduled events Error');
  }
};

const getCategoriesData = async () => {
  const response = await fetch(
    import.meta.env.VITE_SERVER_URL + '/api/events-categories'
  );
  if (response.status === 200) {
    const data = await response.json();
    categoriesData.value = data;
  } else {
    console.log('Fetch Category Error');
  }
};

onBeforeMount(async () => {
  await getSchedulesData();
  await getCategoriesData();
});
</script>

<template>
  <div
    class="bg-schedules  w-screen h-screen bg-no-repeat bg-cover bg-center flex flex-wrap items-center justify-center gap-2">
    <div class="bg-white dark:bg-black rounded-3xl h-2/3 w-7/12 flex shadow-lg">
      <!-- no event -->
      <div v-if="!filteredSchedules.length" class="flex flex-col items-center justify-center">
        <NoEvent />
      </div>

      <!-- have event -->
      <div v-else class="flex flex-col p-10 min-w-full">
        <div class="text-sm md:text-lg lg:text-2xl flex justify-between">
          <span class="text-gray-400"> Scheduled Events </span>
          <span class="text-gray-300 text-xs md:text-base lg:text-xl">
            {{ filteredSchedules.length }} events
          </span>
        </div>

        <div id="style-7" class="flex flex-col gap-2 overflow-auto min-w-full scrollbar">
          <EventCard v-for="(event, index) in filteredSchedules" :event="event" :key="index" />
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
        <select v-model="selectedEventCategoryName"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option selected>All</option>
          <option v-for="(value, index) in categoriesData" :key="index">
            {{ value.eventCategoryName }}
          </option>
        </select>
        <br>
        <!-- <Divider text="Reset" /> -->
        <SmButton text="Reset" btnType="danger" @click="resetFilter" />
      </div>
    </div>
  </div>
</template>

<style scoped>

#style-7::-webkit-scrollbar-track
{
	/* -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); */
	background-color: #B7C2FF; 
 border-radius: 10px; 
 } 

#style-7::-webkit-scrollbar
{
	width: 10px;


}

#style-7::-webkit-scrollbar-thumb
{

	border-radius: 10px;

	background-image: -webkit-gradient(linear,
									   left bottom,
									   left top,
									   color-stop(0.44, #8da1ff),
									   color-stop(0.72, #677eff));
}
</style>
'clinic-blue-300': '#5f72ff',
        'clinic-blue-200': '#677eff',
        'clinic-blue-100': '#8da1ff',