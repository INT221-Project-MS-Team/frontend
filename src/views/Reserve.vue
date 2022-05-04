<script setup>
import EventCard from '../components/EventCard.vue';
import ReserveStepBar from '../components/ReserveStepBar.vue';
import { ref } from '@vue/reactivity';
import { computed, onBeforeMount } from '@vue/runtime-core';
import SelectCategoryForm from '../components/ReserveCategoryForm.vue';
import ReserveForm from '../components/ReserveForm.vue';
import ReserveFinish from '../components/ReserveFinish.vue';
import { convertDateTimeToISOString } from '../utils';

const categoriesData = ref([]);
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
  let body = {
    bookingName: reserverInformation.value.name,
    bookingEmail: reserverInformation.value.email,
    eventStartTime: convertDateTimeToISOString(
      reserverInformation.value.date,
      reserverInformation.value.startTime
    ),
    eventDuration: reserverInformation.value.duration,
    eventNotes: reserverInformation.value.note,
    eventCategoryId: categoriesData.value[selectedCategoryIndex.value].id,
  };

  const response = await fetch(
    import.meta.env.VITE_SERVER_URL + '/api/events/',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }
  );
  if (response.status === 201) {
    currentStep.value = 3;
    createdReserveData.value = await response.json();
  } else {
    console.log('Submit Reserve Error');
    alert('Submit Reserve Error');
  }
};

onBeforeMount(async () => {
  await getCategoriesData();
});
</script>

<template>
  <div
    class="bg-schedules w-screen h-screen bg-no-repeat bg-cover bg-center flex flex-wrap flex-col items-center justify-center gap-2"
  >
    <div class="bg-white rounded-3xl h-5/6 w-6/12 flex flex-col shadow-lg p-2">
      <div
        class="text-sm md:text-lg lg:text-2xl text-center text-gray-400 mt-5"
      >
        Reserve
      </div>
      <ReserveStepBar :step="currentStep" />
      <div
        class="flex justify-center items-center overflow-auto clinic-scollbar"
      >
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
        <ReserveFinish v-else-if="currentStep === 3" :reserveData="createdReserveData" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
