<script setup>
import NoEvent from '../components/NoEvent.vue';
import SmButton from '../components/SmButton.vue';
import { getDate, getTime, convertDateTimeToISOString } from '../utils';
import { useRoute, useRouter } from 'vue-router';
import { ref } from '@vue/reactivity';
import { computed, inject, onBeforeMount } from '@vue/runtime-core';
import Divider from '../components/Divider.vue';
import { ArrowRightIcon } from '@heroicons/vue/outline';

const swal = inject('$swal');
const router = useRouter();
const route = useRoute();

//refs & computes
const eventId = ref('');
const eventData = ref(null);
const isEditing = ref(false);

const editingEventDate = ref('');
const editingEventTime = ref('');
const editingEventNotes = ref('');

const endPointUrl = computed(() => {
  return import.meta.env.VITE_SERVER_URL + `/api/events/${eventId.value}`;
});

//event methods
const getEventData = async () => {
  const response = await fetch(endPointUrl.value);
  if (response.status == 200) {
    const data = await response.json();
    eventData.value = data;
  } else {
    console.log('error');
  }
};

const deleteEvent = async () => {
  await swal({
    title: '<p class="text-lg">Are you sure to <b>cancel</b> this event ?</p>',
    text: "You won't be able to revert this!",
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

const updateEvent = async () => {
  await swal({
    title: '<p class="text-lg">Are you sure to <b>Update</b> this event ?</p>',
    text: "You won't be able to revert this!",
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#5f72ff',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Confirm',
    cancelButtonText: 'No',
  }).then(async (result) => {
    if (result.isConfirmed) {
      let body = {
        eventStartTime: undefined,
        eventNotes: undefined,
      };

      if (editingEventDate.value !== '') {
        body.eventStartTime = convertDateTimeToISOString(
          editingEventDate.value,
          editingEventTime.value
        );
      }
      if (editingEventNotes.value !== '') {
        body.eventNotes = editingEventNotes.value;
      }
      console.log(body);

      const response = await fetch(endPointUrl.value, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      if (response.status === 200) {
        swal({
          title: 'Success',
          text: 'Event has been updated',
          icon: 'success',
          confirmButtonColor: '#5f72ff',
        });
        cancelEdit();
        getEventData();
      } else {
        swal({
          title: 'Failure',
          text: 'Something went wrong',
          icon: 'error',
          confirmButtonColor: '#5f72ff',
        });
        console.log('error,cannot update');
      }
    }
  });
};

const editEvent = () => {
  isEditing.value = true;
  editingEventNotes.value = eventData.value.eventNotes;
};
const cancelEdit = () => {
  isEditing.value = false;
  editingEventDate.value = '';
  editingEventTime.value = '';
  editingEventNotes.value = '';
};

// route
const gotoHome = () => {
  router.push({ name: 'home' });
};

const gotoschedules = () => {
  router.push({ name: 'schedules' });
};

// hooks
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
    <p
      class="text-xl xs:text-xl sm:text-xl md:text-2xl lg:text-3xl text-white"
      v-if="!isEditing"
    >
      Event Detail
    </p>
    <p
      class="text-xl xs:text-xl sm:text-xl md:text-2xl lg:text-3xl text-white"
      v-else
    >
      Edit Event Detail
    </p>
    <div
      class="bg-white rounded-3xl h-4/6 lg:h-4/6 w-11/12 lg:w-8/12 flex shadow-lg"
    >
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
          <span v-show="isEditing" class="text-clinic-blue-300 text-sm">
            Edit start time, date and note only
          </span>
        </div>
        <div class="flex flex-col overflow-auto w-full mt-5 clinic-scollbar">
          <div class="font-normal gap-5 flex flex-col">
            <span class="text-xl xs:text-xl sm:text-xl md:text-2xl lg:text-2xl"
              ><span class="text-clinic-blue-300">Booking Name: </span>
              <span :class="{ 'text-gray-400': isEditing }">
                {{ eventData.bookingName }}</span
              >
            </span>

            <hr />
            <span
              ><span class="text-clinic-blue-300">Email: </span>
              <span :class="{ 'text-gray-400': isEditing }">
                {{ eventData.bookingEmail }}</span
              >
            </span>

            <div class="flex flex-row items-center gap-x-2">
              <span class="text-clinic-blue-300" >Date: </span>
              <span :class="{ 'text-gray-400': isEditing }"> {{ getDate(eventData.eventStartTime) }}</span>
              <ArrowRightIcon
                class="w-4 h-4 text-clinic-blue-300"
                v-if="isEditing"
              />
              <input
                v-if="isEditing"
                type="date"
                class="block py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-100 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required=""
                v-model="editingEventDate"
              />
            </div>

            <div class="flex flex-row items-center gap-x-2">
              <span class="text-clinic-blue-300" >Start Time: </span>
              <span :class="{ 'text-gray-400': isEditing }"> {{ getTime(eventData.eventStartTime) }}</span>
              <ArrowRightIcon
                class="w-4 h-4 text-clinic-blue-300"
                v-if="isEditing"
              />
              <input
                v-if="isEditing"
                type="time"
                class="block py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-100 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required=""
                v-model="editingEventTime"
              />
            </div>
            <span
              ><span class="text-clinic-blue-300">Duration: </span>
              <span :class="{ 'text-gray-400': isEditing }"
                >{{ eventData.eventDuration }} Minutes</span
              >
            </span>
            <span
              ><span class="text-clinic-blue-300">Category Name: </span>
              <span :class="{ 'text-gray-400': isEditing }">{{
                eventData.eventCategory.eventCategoryName
              }}</span>
            </span>
            <span
              ><span class="text-clinic-blue-300">Category Description:</span>
              <span :class="{ 'text-gray-400': isEditing }">{{
                eventData.eventCategory.eventCategoryDescription
              }}</span>
            </span>
            <span>
              <span class="text-clinic-blue-300">Note: </span>
              <span
                v-if="!isEditing"
                :class="!eventData.eventNotes ? ['text-gray-300'] : ''"
              >
                {{ eventData.eventNotes || '(blank)' }}</span
              >
              <input
                type="text"
                v-model="editingEventNotes"
                class="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-white sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                v-else
              />

              <span class="mt-1" v-if="isEditing">
                <Divider text="Danger Zone" />
                <button
                  class="w-full mb-3 item-center text-white bg-red-600 min-w-fit rounded-lg p-1 hover:bg-red-700"
                  @click="deleteEvent"
                >
                  Cancel event
                </button>
              </span>
            </span>

            <div class="flex gap-2">
              <SmButton
                text="Back"
                btnType="events"
                @click="gotoschedules"
                v-if="!isEditing"
              />
              <SmButton
                text="Save"
                btnType="events"
                @click="updateEvent"
                v-if="isEditing"
              />
              <SmButton
                text="Edit Event"
                btnType="edit"
                @click="editEvent"
                v-if="!isEditing"
              />
              <SmButton
                text="Cancel"
                btnType="edit"
                @click="cancelEdit"
                v-if="isEditing"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
