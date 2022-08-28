<script setup>
import NoEvent from '@/components/NoEvent.vue';
import SmButton from '@/components/SmButton.vue';
import {
  getDate,
  getTime,
  convertDateTimeToISOString,
  validateFutureTime,
  isOverlapTime,
  getInputDate,
  getInputTime,
} from '@/utils';
import { useRoute, useRouter } from 'vue-router';
import { ref } from '@vue/reactivity';
import { computed, inject, onBeforeMount } from '@vue/runtime-core';
import Divider from '@/components/Divider.vue';
import { ArrowRightIcon, PencilIcon } from '@heroicons/vue/outline';

const swal = inject('$swal');
const router = useRouter();
const route = useRoute();

// config
const dateInputFormatter = ref({
  date: 'DD/MM/YYYY',
  month: 'MMM',
});

//refs & computes
const eventId = ref('');
const eventData = ref(null);
const isEditing = ref(false);
const schedulesData = ref([]);

const editingEventDate = ref('');
const editingEventTime = ref('');
const editingEventNotes = ref('');

//event methods
const getEventData = async () => {
  const response = await fetch(
    import.meta.env.VITE_SERVER_URL + `/api/events/${eventId.value}`
  );
  if (response.status == 200) {
    const data = await response.json();
    eventData.value = data;
    editingEventDate.value = getInputDate(data.eventStartTime);
    editingEventTime.value = getInputTime(data.eventStartTime);
    console.log(eventData.value);
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
      await getSchedulesData();

      let body = {
        id: eventId.value,
        eventStartTime: undefined,
        eventNotes: undefined,
        eventDuration: eventData.value.eventDuration,
        eventCategoryId: eventData.value.eventCategory.id,
      };

      if (editingEventDate.value != '' && editingEventTime.value != '') {
        body.eventStartTime = convertDateTimeToISOString(
          editingEventDate.value,
          editingEventTime.value
        );
        if (!validateFutureTime(body.eventStartTime)) {
          swal('Error', 'Cannot reserve in past time', 'error');
          return;
        }
      }

      if (editingEventNotes.value !== '') {
        body.eventNotes = editingEventNotes.value;
      }

      if (isOverlapTime(body, schedulesData.value)) {
        swal(
          'Error',
          'Cannot reserve time that overlaps with other events',
          'error'
        );
        return;
      }

      // remove all un using field
      body.eventCategoryId = undefined;
      body.eventDuration = undefined;
      body.id = undefined;

      console.log(body);

      const response = await fetch(
        import.meta.env.VITE_SERVER_URL + `/api/events/${eventId.value}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        }
      );
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

const getSchedulesData = async () => {
  const response = await fetch(import.meta.env.VITE_SERVER_URL + `/api/events`);
  if (response.status === 200) {
    const data = await response.json();
    schedulesData.value = data;
    console.log(data);
  } else {
    console.log('Fetch Scheduled events Error');
  }
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
    <p class="text-xl xs:text-xl sm:text-xl md:text-2xl lg:text-3xl text-white">
      {{ isEditing ? 'Edit Event Detail' : 'Event Detail' }}
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
          <span v-show="isEditing" class="text-red-700 text-sm">
            Edit start time, date and note only
          </span>
        </div>
        <div class="flex flex-col overflow-auto w-full mt-5 clinic-scollbar">
          <form
            @submit.prevent="updateEvent"
            class="font-normal gap-5 flex flex-col"
          >
            <!-- <div class="flex items-center justify-end">
              <PencilIcon class="w-5 h-5" />
            </div> -->
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
              <span class="text-clinic-blue-300">Date: </span>
              <span :class="{ 'text-gray-400': isEditing }">
                <!-- {{ getDate(eventData.eventStartTime) }} -->
                <input
                type="date"
                class="border-0 p-0"
                placeholder=" "
                :value="getInputDate(eventData.eventStartTime)"
                disabled
              />
              </span>
              <ArrowRightIcon
                class="w-4 h-4 text-clinic-blue-300"
                v-if="isEditing"
              />
              <input
                v-if="isEditing"
                type="date"
                class="block py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-100 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                :min="getInputDate(eventData.eventStartTime)"
                v-model="editingEventDate"
                :required="editingEventTime.length"
              />
            </div>

            <div class="flex flex-row items-center gap-x-2">
              <span class="text-clinic-blue-300">Start Time: </span>
              <span :class="{ 'text-gray-400': isEditing }">
              <input
                type="time"
                class="border-0 p-0"
                placeholder=" "
                :value="getTime(eventData.eventStartTime)"
                disabled
              />
                <!-- {{ getTime(eventData.eventStartTime) }} (24-hr) -->
              </span>
              <ArrowRightIcon
                class="w-4 h-4 text-clinic-blue-300"
                v-if="isEditing"
              />
              <input
                v-if="isEditing"
                type="time"
                class="block py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-100 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                v-model="editingEventTime"
                :required="editingEventDate.length"
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
            <span>
              <span class="text-clinic-blue-300">Category Description:</span>
              <span :class="{ 'text-gray-400': isEditing }"
                >{{ eventData.eventCategory.eventCategoryDescription }}
              </span>
            </span>
            <span>
              <span class="text-clinic-blue-300">Note: </span>
              <span
                v-if="!isEditing"
                :class="!eventData.eventNotes ? ['text-gray-300'] : ''"
              >
                {{ eventData.eventNotes || '(blank)' }}</span
              >
              <textarea
                v-model="editingEventNotes"
                class="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-white sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                v-else
                maxlength="500"
                rows="2"
              ></textarea>

              <div class="mt-5" v-if="isEditing">
                <div
                  class="w-full mb-3 text-center item-center text-white bg-red-600 min-w-fit rounded-lg p-1 hover:bg-red-700"
                  @click="deleteEvent"
                >
                  Cancel event
                </div>
              </div>
            </span>
            <div>
              <div class="flex gap-2" v-if="!isEditing">
                <SmButton
                  text="← Back"
                  btnType="events"
                  @click="gotoschedules"
                />
                <SmButton text="Edit Event" btnType="edit" @click="editEvent" />
              </div>
              <div class="flex gap-2" v-else>
                <button type="submit">
                  <SmButton text="Save" btnType="events" />
                </button>
                <SmButton
                  text="Cancel"
                  btnType="edit"
                  @click="cancelEdit"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
