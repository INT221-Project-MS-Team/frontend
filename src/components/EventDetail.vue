<script setup>
import SmButton from './SmButton.vue';

const emits = defineEmits(['clearSelectedEvent']);
const props = defineProps({
  event: {
    type: Object,
    required: true,
  },
});
const test = () =>{console.log('test');}
</script>

<template>
  <div class="flex flex-col justify-between leading-normal">
    <div class="flex justify-between items-center">
      <p class="text-gray-400 text-sm md:text-lg lg:text-2xl">
        Event Detail
      </p>
      <SmButton text="close" @click="$emit('clearSelectedEvent', event.id)" />
    </div>
    <img class="object-cover w-2/6 mx-auto" src="/images/time.png" alt="cover" />
    <div class="p-5">
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
  </div>
</template>

<style scoped></style>
