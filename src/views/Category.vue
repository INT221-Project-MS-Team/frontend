<script setup>
import CategoryTable from '../components/CategoryTable.vue';
import { onBeforeMount } from '@vue/runtime-core';
import { ref } from 'vue';

const categoriesData = ref([]);

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

onBeforeMount(async () => {
  await getCategoriesData();
});
</script>

<template>
  <div
    class="bg-schedules w-screen h-screen bg-no-repeat bg-cover bg-center flex flex-wrap flex-col items-center justify-center gap-2"
  >
    <div
      class="w-10/12 h-5/6 bg-white flex shadow-md sm:rounded-lg clinic-scollbar"
    >
      <div class="text-center md:text-lg flex flex-col lg:text-lg">
        <span class="text-gray-600 text-2xl p-3 bg-clinic-blue-25">
          Category List</span
        >
        <CategoryTable :categories="categoriesData" />
      </div>
    </div>
  </div>
</template>

<style></style>
