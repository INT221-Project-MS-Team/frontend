<script setup>
const props = defineProps({
  event: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="flex flex-col justify-between p-4 leading-normal">
    <p class="mb-3 font-normal gap-4 flex flex-col">
      <span
        ><span class="text-clinic-blue-300">Name:</span>
        {{ event.bookingName }}</span
      >
      <span
        ><span class="text-clinic-blue-300">Email:</span>
        {{ event.bookingEmail }}</span
      >
      <span
        ><span class="text-clinic-blue-300">Date:</span>
        {{ new Date(event.eventStartTime).toString() }}
      </span>
      <span
        ><span class="text-clinic-blue-300">Duration:</span>
        {{ event.eventDuration }} Minutes</span
      >
      <span
        ><span class="text-clinic-blue-300">Category Name:</span>
        {{ event.eventCategory.eventCategoryName }}</span
      >
      <span
        ><span class="text-clinic-blue-300">Category Description:</span>
        {{ event.eventCategory.eventCategoryDescription }}</span
      >
      <span
        ><span class="text-clinic-blue-300">Note:</span>
        {{ event.eventNotes ? event.eventNotes : '-' }}</span
      >
    </p>
  </div>
</template>

<style scoped></style>
