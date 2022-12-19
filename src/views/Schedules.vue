<script setup>
import NoEvent from '@/components/NoEvent.vue';
import EventCard from '@/components/EventCard.vue';
import SmButton from '@/components/SmButton.vue';
import Divider from '@/components/Divider.vue';
import { getCurrentDateTime, getInputDate } from '@/utils';
import { SearchIcon, CalendarIcon } from '@heroicons/vue/outline';
import { ref } from '@vue/reactivity';
import { computed, inject, onBeforeMount } from '@vue/runtime-core';
import { useRouter } from 'vue-router';
import { useStatusStore } from '../store/status';

const swal = inject('$swal');
const router = useRouter();
const storeStatus = useStatusStore();

const schedulesData = ref([]);
const categoriesData = ref([]);
const selectedEventCategoryName = ref('All');
const selectedDate = ref('');
const allEventStatus = ref(['All', 'Upcoming/Ongoing', 'Past']);
const selectedEventStatus = ref('All');
const filterBookingNameEmail = ref('');
const sortBy = ref('eventStartTime');
const sortOrder = ref('desc');

const dateInputFormatter = ref({
  date: 'DD/MM/YYYY',
  month: 'MMM',
});

const filteredSchedules = computed(() => {
  const schedules = schedulesData.value;
  let result = schedules;
  const categoryName =
    selectedEventCategoryName.value === 'All'
      ? null
      : selectedEventCategoryName.value;
  const date = selectedDate.value === '' ? null : selectedDate.value;
  const bookingNameEmail = filterBookingNameEmail.value;
  const eventStatus =
    selectedEventStatus.value === 'All' ? null : selectedEventStatus.value;

  // filter categoryName
  if (categoryName) {
    result = result.filter((schedule) => {
      return schedule.eventCategory.eventCategoryName === categoryName;
    });
  }

  // filter bookingNameEmail
  if (bookingNameEmail) {
    result = result.filter((schedule) => {
      return (
        schedule.bookingName
          .toLowerCase()
          .includes(bookingNameEmail.toLowerCase()) ||
        schedule.bookingEmail
          .toLowerCase()
          .includes(bookingNameEmail.toLowerCase())
      );
    });
  }

  //filter eventStatus
  if (eventStatus) {
    if (eventStatus === 'Upcoming/Ongoing') {
      result = result
        .filter((schedule) => {
          let date = new Date(schedule.eventStartTime);
          date = date.setMinutes(date.getMinutes() + schedule.eventDuration);
          return date >= getCurrentDateTime();
        })
        .sort(
          (a, b) => new Date(a.eventStartTime) - new Date(b.eventStartTime)
        );
    } else {
      result = result
        .filter((schedule) => {
          let date = new Date(schedule.eventStartTime);
          date = date.setMinutes(date.getMinutes() + schedule.eventDuration);
          return date < getCurrentDateTime();
        })
        .sort(
          (a, b) => new Date(b.eventStartTime) - new Date(a.eventStartTime)
        );
    }
  }

  // filter date
  if (date) {
    result = result.filter((schedule) => {
      let scduleDate = getInputDate(schedule.eventStartTime);
      return scduleDate.includes(date);
    });
    result = result.sort(
      (a, b) => new Date(a.eventStartTime) - new Date(b.eventStartTime)
    );
  }

  return result;
});

const resetFilter = () => {
  selectedEventCategoryName.value = 'All';
  selectedDate.value = '';
  filterBookingNameEmail.value = '';
  selectedEventStatus.value = 'All';
};

const getSchedulesData = async () => {
  let url = '';
  if (!storeStatus.isLoggedIn || storeStatus.loggedInUser.role === 'GUEST') {
    url = `/api/events/blind?sortBy=${sortBy.value}&sortOrder=${sortOrder.value}`;
  } else {
    url = `/api/events/me?sortBy=${sortBy.value}&sortOrder=${sortOrder.value}`;
  }

  let msalIdToken = localStorage.getItem('msal.idtoken');
  let token = localStorage.getItem('access_token');
  let authorization = undefined;
  if (msalIdToken) {
    authorization = 'Bearer ' + msalIdToken;
  } else if (token) {
    authorization = 'Bearer ' + token;
  } else {
  }

  const response = await fetch(import.meta.env.VITE_SERVER_URL + url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authorization,
    },
  });
  if (response.status === 200) {
    const data = await response.json();
    schedulesData.value = data;
    console.log(data);
  } else if (response.status === 401) {
    swal.fire({
      title: 'Error!',
      text: 'You are not Signed in',
      icon: 'error',
      showConfirmButton: false,
      timer: 1500,
    });
    router.push({ name: 'sign-in' });
  } else if (response.status === 403) {
    swal
      .fire({
        title: 'Error!',
        text: 'Access Denied',
        icon: 'error',
        confirmButtonText: 'OK',
      })
      .then((result) => {
        if (result.isConfirmed) {
          router.push(-1);
        }
      });
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
  // if (!storeStatus.isLoggedIn) {
  //   router.push({ name: 'sign-in' });
  //   return;
  // }
  await getSchedulesData();
  await getCategoriesData();
});
</script>

<template>
  <div
    class="bg-schedules w-screen h-screen bg-no-repeat bg-cover bg-center flex flex-wrap items-center justify-center gap-2"
  >
    <!-- bg-gradient-to-bl from-clinic-blue-30 to-clinic-blue-25 -->
    <div
      class="bg-white rounded-3xl h-5/6 w-8/12 md:w-7/12 lg:w-7/12 mt-14 md:mt-0 flex shadow-lg"
    >
      <!-- no event -->
      <div
        v-if="!filteredSchedules.length"
        class="flex flex-col items-center justify-center"
      >
        <NoEvent />
      </div>

      <!-- have event -->
      <div v-else class="flex flex-col p-10 min-w-full">
        <div class="text-sm md:text-lg lg:text-lg flex justify-between">
          <span class="text-gray-400"> Scheduled Events </span>
          <span class="text-gray-300 text-xs md:text-base lg:text-base">
            {{ filteredSchedules.length }} events
          </span>
        </div>

        <div
          class="flex flex-col gap-2 overflow-auto min-w-full clinic-scollbar mt-5"
        >
          <EventCard
            v-for="(event, index) in filteredSchedules"
            :event="event"
            :key="index"
          />
        </div>
      </div>
    </div>

    <div
      class="bg-white rounded-3xl h-5/6 w-8/12 md:w-3/12 lg:w-3/12 flex shadow-lg px-2.5"
    >
      <div
        class="flex flex-col p-5 lg:p-10 min-w-full z-10 overflow-auto clinic-scollbar"
      >
        <p class="text-gray-400 text-sm md:text-lg lg:text-lg">Event Filter</p>

        <Divider text="Search" />
        <form>
          <label
            class="mb-2 font-medium text-gray-900 sr-only text-xs xs:text-xs sm:text-sm md:text-base lg:text-base"
            >Search</label
          >
          <div class="relative">
            <div
              class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
            >
              <SearchIcon class="w-5 h-5 text-gray-500" />
            </div>
            <input
              type="text"
              v-model="filterBookingNameEmail"
              class="block p-4 pl-10 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search Name, Email..."
              required
            />
          </div>
        </form>
        <Divider text="Select Date" />
        <form>
          <div class="relative">
            <div
              class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
            >
              <CalendarIcon class="w-5 h-5 text-gray-500" />
            </div>
            <input
              type="date"
              v-model="selectedDate"
              class="block p-4 pl-10 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
        </form>

        <Divider text="Select Category" />
        <select
          v-model="selectedEventCategoryName"
          class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        >
          <option selected>All</option>
          <option v-for="(value, index) in categoriesData" :key="index">
            {{ value.eventCategoryName }}
          </option>
        </select>

        <Divider text="Event Status" />
        <select
          v-model="selectedEventStatus"
          class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        >
          <option v-for="(value, index) in allEventStatus" :key="index">
            {{ value }}
          </option>
        </select>

        <Divider text="Reset" />
        <SmButton text="Reset" btnType="danger" @click="resetFilter" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
