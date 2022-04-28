<script setup>
import { ref } from '@vue/reactivity';
import { onBeforeMount } from '@vue/runtime-core';

const schedules = ref([]);

const getSchedules = async () => {
  const response = await fetch(
    import.meta.env.VITE_SERVER_URI + '/api/events'
  );
  const data = await response.json();
  schedules.value = data;
  console.log(data);
};
onBeforeMount(async () => {
  await getSchedules();
});
</script>

<template>
  <div class="bg-schedules-bg w-screen h-screen bg-no-repeat bg-cover">
    <div></div>
  </div>
</template>

<style scoped></style>
