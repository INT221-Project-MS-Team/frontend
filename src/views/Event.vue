<script setup>
import NoEvent from '../components/NoEvent.vue';
import SmButton from '../components/SmButton.vue';
import { getDate, getTime } from '../utils';
import { useRoute, useRouter } from 'vue-router';
import { ref } from '@vue/reactivity';
import { computed, onBeforeMount } from '@vue/runtime-core';

const router = useRouter();
const route = useRoute();

const eventId = ref('');
const eventData = ref(null);

const endPointUrl = computed(() => {
  return import.meta.env.VITE_SERVER_URL + `/api/events/${eventId.value}`;
});

const getEventData = async () => {
  const response = await fetch(endPointUrl.value);
  if (response.status == 200) {
    const data = await response.json();
    eventData.value = data;
    console.log(data);
  } else {
    console.log('error');
  }
};

const deleteEvent = async () => {
  if (confirm('Do you want to cancel this event ?')) {
    const response = await fetch(
      import.meta.env.VITE_SERVER_URL + `/api/events/${eventId.value}`,
      {
        method: 'DELETE',
      }
    );
    if (response.status === 200) {
      alert('Event Canceled');
      router.push({ name: 'schedules' });
    } else {
      console.log('error,cannot delete');
    }
  }
};

const gotoHome = () => {
  router.push({ name: 'home' });
};

const gotoschedules = () => {
  router.push({ name: 'schedules' });
};

onBeforeMount(async () => {
  if (!route.query?.id) {
    gotoHome();
  }
  eventId.value = route.query.id;
  await getEventData();
});
</script>

<template>
  <div
    class="bg-schedules w-screen h-screen bg-no-repeat bg-cover bg-center flex flex-wrap flex-col items-center justify-center gap-2"
  >
    <p class="text-xl xs:text-xl sm:text-xl md:text-2xl lg:text-3xl text-white">
      Event Detail
    </p>
    <div class="bg-white rounded-3xl h-2/3 w-7/12 flex shadow-lg">
      <!-- no event -->
      <div v-if="!eventData" class="flex flex-col items-center justify-center">
        <NoEvent />
        <SmButton text="Back" @click="gotoHome" />
      </div>

      <!-- have event -->
      <div v-else class="flex flex-row min-w-full p-5 gap-6">
        <div
          class="min-h-full bg-clinic-blue-50 w-6/12 rounded-lg flex flex-col justify-center items-center p-5 gap-2"
        >
          <img
            class="object-cover w-10/12"
            src="/images/person.png"
            alt="cover"
          />
          <br />
          <p
            class="text-white text-xl xs:text-xl sm:text-xl md:text-2xl lg:text-3xl text-center"
          >
            Event ID : {{ eventData.id }}
          </p>
        </div>
        <div class="flex flex-col overflow-auto w-full mt-5 clinic-scollbar">
          <div class="font-normal gap-5 flex flex-col">
            <span class="text-xl xs:text-xl sm:text-xl md:text-2xl lg:text-2xl"
              ><span class="text-clinic-blue-300">Booking Name:</span>
              {{ eventData.bookingName }}</span
            >
            <hr />
            <span
              ><span class="text-clinic-blue-300">Email:</span>
              {{ eventData.bookingEmail }}</span
            >
            <span
              ><span class="text-clinic-blue-300">Date:</span>
              {{ getDate(eventData.eventStartTime) }}
            </span>
            <span
              ><span class="text-clinic-blue-300">Start Time:</span>
              {{ getTime(eventData.eventStartTime) }}
            </span>
            <span
              ><span class="text-clinic-blue-300">Duration:</span>
              {{ eventData.eventDuration }} Minutes</span
            >
            <span
              ><span class="text-clinic-blue-300">Category Name:</span>
              {{ eventData.eventCategory.eventCategoryName }}</span
            >
            <span
              ><span class="text-clinic-blue-300">Category Description:</span>
              {{ eventData.eventCategory.eventCategoryDescription }}</span
            >
            <span
              ><span class="text-clinic-blue-300">Note: </span>
              <span :class="!eventData.eventNotes ? ['text-gray-300'] : ''">
                {{ eventData.eventNotes || '(blank)' }}
              </span>
            </span>
            <div class="flex gap-2">
              <SmButton text="Back" btnType="events" @click="gotoschedules" />
              <SmButton
                text="Cancel Event"
                btnType="danger"
                @click="deleteEvent"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
