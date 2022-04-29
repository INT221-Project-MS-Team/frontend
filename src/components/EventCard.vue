<script setup>
const emits = defineEmits([]);
const props = defineProps({
  event: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div
    class="flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 min-w-full"
  >
    <img class="w-2/12 rounded-full" src="/images/demo-cat.png" alt="">
    <div class="flex flex-col justify-between p-3 leading-normal">
      <p class="mb-3 font-normal">
        <span
          ><span class="text-clinic-blue-300">Name:</span>
          {{ event.bookingName }}</span
        >
        <br />
        <span
          ><span class="text-clinic-blue-300">Date:</span>
          {{ new Date(event.eventStartTime).toString() }}
        </span>
        <br />
        <span
          ><span class="text-clinic-blue-300">Duration:</span>
          {{ event.eventDuration }} Minutes</span
        >
        <br />
        <span
          ><span class="text-clinic-blue-300">Category:</span>
          {{ event.eventCategory.eventCategoryName }}</span
        >
        <br />
      </p>
    </div>
  </div>
</template>

<style scoped></style>
