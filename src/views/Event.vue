<script setup>
import NoEvent from '../components/NoEvent.vue';
import SmButton from '../components/SmButton.vue';
import { getDate, getTime } from '../utils';
import { useRoute, useRouter } from 'vue-router';
import { ref } from '@vue/reactivity';
import { computed, inject, onBeforeMount } from '@vue/runtime-core';
import Divider from '../components/Divider.vue';

const swal = inject('$swal');
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
  await swal({
    title: '<p class="text-lg">Are you sure to <b>cancel</b> this event ?</p>',
    text: 'You won\'t be able to revert this!',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#5f72ff',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Confirm',
    cancelButtonText: 'No',
  }).then(async (result) => {
    if (result.isConfirmed) {
      const response = await fetch(
        import.meta.env.VITE_SERVER_URL + `/api/events/${eventId.value}`,
        {
          method: 'DELETE',
        }
      );
      if (response.status === 200) {
        swal({
          title: '<p class="text-lg">Success</p>',
          text: 'Event has been canceled',
          icon: 'success',
          confirmButtonColor: '#5f72ff',
        });
        router.push({ name: 'schedules' });
      } else {
        swal({
          title: 'Failure',
          text: 'Something went wrong',
          icon: 'error',
          confirmButtonColor: '#5f72ff',
        });
        console.log('error,cannot delete');
      }
    }
  });
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
const isShow = ref(true);
// const timeEvent = getTime(eventData.eventStartTime);
const editEvent = () => {
  isShow.value = false;
}
</script>

<template>
  <div
    class="bg-schedules w-screen h-screen bg-no-repeat bg-cover bg-center flex flex-wrap flex-col items-center justify-center gap-2">
    <p class="text-xl xs:text-xl sm:text-xl md:text-2xl lg:text-3xl text-white">
      Event Detail
    </p>
    <div class="bg-white rounded-3xl h-4/6 lg:h-4/6 w-11/12 lg:w-8/12 flex shadow-lg">
      <!-- no event -->
      <div v-if="!eventData" class="flex flex-col items-center justify-center">
        <NoEvent />
        <SmButton text="Back" @click="gotoHome" />
      </div>

      <!-- have event -->
      <div v-else class="flex flex-row min-w-full p-5 gap-6">
        <div class="min-h-full bg-clinic-blue-50 w-6/12 rounded-lg flex flex-col justify-center items-center p-5 gap-2">
          <img class="object-cover w-10/12" src="/images/person.png" alt="cover" />
          <br />
          <p class="text-white text-xl xs:text-xl sm:text-xl md:text-2xl lg:text-3xl text-center">
            Event ID : {{ eventData.id }}
          </p>
          <span v-show="!isShow" class="text-clinic-blue-300 text-sm">
            edit start time and note only
          </span>
        </div>
        <div class="flex flex-col overflow-auto w-full mt-5 clinic-scollbar">
          <div class="font-normal gap-5 flex flex-col">
            <span class="text-xl xs:text-xl sm:text-xl md:text-2xl lg:text-2xl"><span
                class="text-clinic-blue-300">Booking Name:</span>
              <span v-show="isShow"> {{ eventData.bookingName }}</span>
              <span v-show="!isShow" class="text-gray-400"> {{ eventData.bookingName }}</span>
            </span>

            <hr />
            <span><span class="text-clinic-blue-300">Email:</span>
              <span v-show="isShow"> {{ eventData.bookingEmail }}</span>
               <span v-show="!isShow" class="text-gray-400"> {{ eventData.bookingEmail }}</span>
              <!-- <input type="email" v-model="eventData.bookingEmail"
                class="bg-gray-50 border border-gray-300 text-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                v-show="!isShow" disabled> -->
            </span>

            <span><span class="text-clinic-blue-300">Date:</span>
              <span v-show="isShow"> {{ getDate(eventData.eventStartTime) }}</span>
              <span v-show="!isShow" class="text-gray-400"> {{ getDate(eventData.eventStartTime) }}</span>
            </span>
            <span><span class="text-clinic-blue-300">Start Time:</span>
              <span v-show="isShow"> {{ getTime(eventData.eventStartTime) }}</span>
              <input type="time"
                class="block py-2.5 px-0  text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-100 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" " required="" v-show="!isShow" />
            </span>
            <span><span class="text-clinic-blue-300">Duration:</span>
              <span v-show="isShow"> {{ eventData.eventDuration }}Minutes</span>
              <span v-show="!isShow" class="text-gray-400">{{ eventData.eventDuration }}Minutes</span>
              <!-- <input type="text" v-model="eventData.eventDuration"
                class="block text-wrap p-3 text-gray-400 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                v-show="!isShow" disabled> -->
            </span>
            <span><span class="text-clinic-blue-300">Category Name:</span>
              <span v-show="isShow"> {{ eventData.eventCategory.eventCategoryName }}</span>
              <span v-show="!isShow" class="text-gray-400">{{ eventData.eventCategory.eventCategoryName }}</span>
              <!-- <input type="text" v-model="eventData.eventCategory.eventCategoryName"
                class="block p-3 text-gray-400 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                v-show="!isShow" disabled> -->
            </span>
            <span><span class="text-clinic-blue-300">Category Description:</span>
              <span v-show="isShow">{{ eventData.eventCategory.eventCategoryDescription }}</span>
              <span v-show="!isShow" class="text-gray-400">{{ eventData.eventCategory.eventCategoryDescription }}</span>
              <!-- <textarea v-show="!isShow" id="message" rows="4"
                class="block p-2.5 w-full text-sm text-gray-400 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="" disabled> {{ eventData.eventCategory.eventCategoryDescription }}
                </textarea> -->
            </span>
            <span>
              <span class="text-clinic-blue-300">Note: </span>
              <span v-show="isShow" :class="!eventData.eventNotes ? ['text-gray-300'] : ''">
                {{ eventData.eventNotes || '(blank)' }}</span>
              <span>
                <input type="text" v-model="eventData.eventNotes"
                  class="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  v-show="!isShow">
              </span>
              <span class="mt-1" v-show="!isShow">
                <Divider text="Danger Zone" />
                <button class="w-11/12 mb-3 item-center text-white bg-red-600 min-w-fit rounded-lg p-1 hover:bg-red-700"
                  @click="deleteEvent" v-show="!isShow">cancel event</button>
              </span>
            </span>

            <div class="flex gap-2">
              <SmButton text="Back" btnType="events" @click="gotoschedules" v-show="isShow" />
              <SmButton text="Save" btnType="events" v-show="!isShow" />
              <SmButton text="Edit Event" btnType="edit" @click="editEvent" v-show="isShow" />
              <SmButton text="Cancel" btnType="edit" @click="isShow=true" v-show="!isShow" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
