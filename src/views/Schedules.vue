<script setup>
import NoEvent from '../components/NoEvent.vue';
import EventCard from '../components/EventCard.vue';
import EventDetail from '../components/EventDetail.vue';
import { ref } from '@vue/reactivity';
import { computed, onBeforeMount } from '@vue/runtime-core';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const schedulesData = ref([]);
const selectedDate = ref(new Date().toISOString().substr(0, 10));
const selectedEvent = ref(null);
const sortBy = ref("eventStartTime");
const sortOrder = ref("desc");

const selectEvent = (eventId) => {
  selectedEvent.value = schedulesData.value.find(
    (event) => event.id === eventId
  );
};

const dateCompute = computed(() => {
  return selectedDate.value.split('-').reverse().join('/');
});

const endPointUrl = computed(() => {
  return import.meta.env.VITE_SERVER_URI + `/api/events?sortBy=${sortBy.value}&sortOrder=${sortOrder.value}`;
});

const getSchedulesData = async () => {
  const response = await fetch(endPointUrl.value);
  const data = await response.json();
  if(data?.content){
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
    class="bg-schedules w-screen h-screen bg-no-repeat bg-cover bg-center flex flex-wrap items-center justify-center gap-2"
  >
    <div class="bg-white rounded-3xl h-2/3 w-1/5 flex shadow-lg">
      <div
        v-if="!schedulesData.length"
        class="flex flex-col items-center justify-center"
      >
        <img class="object-cover w-3/5" src="images/girl.png" alt="cover" />
        <p class="text-gray-400 text-sm md:text-lg lg:text-2xl">
          No Scheduled Events
        </p>
      </div>
      <div v-else class="flex flex-col p-5">
        <p class="text-gray-400 text-sm md:text-lg lg:text-2xl">
          Scheduled Events
        </p>
        <div class="flex flex-col gap-2 overflow-auto">
          <EventCard
            v-for="(event, index) in schedulesData"
            :event="event"
            :key="index"
            @selectEvent="selectEvent"
          />
        </div>
      </div>
    </div>
    <div class="bg-white rounded-3xl h-2/3 w-2/5 flex shadow-lg">
      <div
        v-if="!selectedEvent"
        class="flex flex-col items-center justify-center"
      >
        <img class="object-cover w-3/5" src="images/girl.png" alt="cover" />
        <p class="text-gray-400 text-sm md:text-lg lg:text-2xl">
          No Selected Scheduled Events
        </p>
      </div>

      <div v-else class="flex flex-col p-5">
        <p class="text-gray-400 text-sm md:text-lg lg:text-2xl">
          Scheduled Detail
        </p>
        <EventDetail :event="selectedEvent" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
