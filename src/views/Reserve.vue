<script setup>
import EventCard from '@/components/EventCard.vue';
import ReserveStepBar from '@/components/ReserveStepBar.vue';
import { ref } from '@vue/reactivity';
import { computed, inject, onBeforeMount } from '@vue/runtime-core';
import SelectCategoryForm from '@/components/ReserveCategoryForm.vue';
import ReserveForm from '@/components/ReserveForm.vue';
import ReserveFinish from '@/components/ReserveFinish.vue';
import {
  convertDateTimeToISOString,
  validateFutureTime,
  validateEmail,
  isOverlapTime,
} from '@/utils';
import { useStatusStore } from '../store/status';
import { useRouter } from 'vue-router';

const swal = inject('$swal');
const storeStatus = useStatusStore();
const router = useRouter();

onBeforeMount(() => {
  if (!storeStatus.isLoggedIn) {
    console.log('not sigh in');
    router.push({ name: 'sign-in' });
  }
});

const categoriesData = ref([]);
const schedulesData = ref([]);
const currentStep = ref(1);
const selectedCategoryIndex = ref(-1);
const reserverInformation = ref({});
const createdReserveData = ref({});

const getCategoriesData = async () => {
  const response = await fetch(
    import.meta.env.VITE_SERVER_URL + '/api/events-categories'
  );
  if (response.status === 200) {
    const data = await response.json();
    categoriesData.value = data;
    console.log(data);
  } else {
    console.log('Fetch Category Error');
  }
};

const getSchedulesData = async () => {
  const response = await fetch(import.meta.env.VITE_SERVER_URL + '/api/events');
  if (response.status === 200) {
    const data = await response.json();
    schedulesData.value = data;
    console.log(data);
  } else {
    let error = await response.json();
    console.log('Fetch Scheduled events Error', error);
  }
};

const selectCategory = (index) => {
  selectedCategoryIndex.value = index;
  currentStep.value++;
};

const backToFirstStep = (info) => {
  currentStep.value--;
  reserverInformation.value = {};
  selectedCategoryIndex.value = -1;
  reserverInformation.value = info;
};

const nextToThirdStep = async (info) => {
  reserverInformation.value = info;
  await submitReserve();
};
const submitReserve = async () => {
  console.log(reserverInformation.value);
  let loadingPopup = swal({
    icon: 'info',
    title: 'Pending Transaction',
    text: 'Please wait...',
    showConfirmButton: false,
    closeOnClickOutside: false,
    closeOnEsc: false,
    timer: 30000,
    timerProgressBar: true,
  });
  await getSchedulesData();

  let body = {
    bookingName: reserverInformation.value.name,
    bookingEmail: reserverInformation.value.email,
    eventStartTime: convertDateTimeToISOString(
      reserverInformation.value.date,
      reserverInformation.value.startTime
    ),
    eventNotes: reserverInformation.value.note,
    eventDuration:
      categoriesData.value[selectedCategoryIndex.value].eventDuration,
    eventCategoryId: categoriesData.value[selectedCategoryIndex.value].id,
    fileId: reserverInformation.value.file?.id ?? null,
  };

  if (!validateEmail(body.bookingEmail)) {
    swal('Error', 'Invalid email', 'error');
    return;
  }

  if (!validateFutureTime(body.eventStartTime)) {
    swal('Error', 'Cannot reserve in past time', 'error');
    return;
  }

  console.log(body);

  if (isOverlapTime(body, schedulesData.value)) {
    swal('Error', 'Cannot reserve in overlap time', 'error');
    return;
  }

   let msalIdToken = localStorage.getItem('msal.idtoken');
  let token = localStorage.getItem('access_token');
  let authorization = undefined;
  if (msalIdToken) {
    authorization = 'Bearer ' + msalIdToken;
  } else if (token) {
    authorization = 'Bearer ' + token;
  }

  const response = await fetch(
    import.meta.env.VITE_SERVER_URL + '/api/events',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authorization,
      },
      body: JSON.stringify(body),
    }
  );
  if (response.status === 201) {
    currentStep.value = 3;
    loadingPopup.close();
    createdReserveData.value = await response.json();
  } else {
    loadingPopup.close();
    let error = await response.json();
    console.log('Submit Reserve Error', error);
    swal('Error', error.message, 'error');
  }
};

onBeforeMount(async () => {
  await getCategoriesData();
});
</script>

<template>
  <div
    class="bg-home w-screen h-screen bg-no-repeat bg-cover bg-center flex flex-wrap flex-col items-center justify-center gap-2"
  >
    <div
      class="bg-white rounded-3xl h-5/6 w-10/12 xs:w-8/12 sm:w-8/12 md:w-8/12 lg:w-6/12 flex flex-col shadow-lg p-2"
    >
      <ReserveStepBar :step="currentStep" />
      <div class="overflow-auto clinic-scollbar">
        <SelectCategoryForm
          v-if="currentStep === 1"
          :categories="categoriesData"
          @selectCategory="selectCategory"
        />
        <ReserveForm
          v-else-if="currentStep === 2"
          @back="backToFirstStep"
          @next="nextToThirdStep"
          :info="reserverInformation"
          :category="categoriesData[selectedCategoryIndex]"
        />
        <ReserveFinish
          v-else-if="currentStep === 3"
          :reserveData="createdReserveData"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
