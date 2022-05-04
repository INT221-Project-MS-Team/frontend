<script setup>
import Divider from '../components/Divider.vue';
import LitepieDatepicker from 'litepie-datepicker';
import { ref } from '@vue/reactivity';
import SmButton from './SmButton.vue';
import { computed } from '@vue/runtime-core';
const emits = defineEmits(['back', 'next']);
const props = defineProps({
  category: {
    type: Object,
    required: true,
  },
  info: {
    type: Object,
    default: {},
  },
});
const reserverInformation = computed(() => ({
  name: props.info.name,
  email: props.info.email,
  date: props.info.date,
  startTime: props.info.startTime,
  duration: props.info.duration,
  note: props.info.note,
}));

</script>

<template>
  <div class="w-8/12">
    <div class="text-sm md:text-base lg:text-xl text-center text-gray-900">
      Reserve Information
    </div>
    <form @submit.prevent="$emit('next', reserverInformation)">
      <div class="relative z-0 w-full mb-6 group">
        <input
          type="text"
          v-model="reserverInformation.name"
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required=""
        />
        <label
          for="floating_password"
          class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >Name</label
        >
      </div>
      <div class="relative z-0 w-full mb-6 group">
        <input
          type="email"
          v-model="reserverInformation.email"
          name="floating_email"
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required=""
        />
        <label
          for="floating_email"
          class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >Email address</label
        >
      </div>

      <!-- <div class="relative z-5 w-full mb-6 group">
        <input
          type="date"
          v-model="reserverInformation.date"
          name="floating_email"
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required=""
        />
        <label
          for="floating_email"
          class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >Date</label
        >
      </div> -->
      <div class="grid xl:grid-cols-2 xl:gap-6">
        <div class="relative z-0 w-full mb-6 group">
          <input
            type="date"
            v-model="reserverInformation.date"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required=""
          />
          <label
            class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >Date</label
          >
        </div>
        <div class="relative z-0 w-full mb-6 group">
          <input
            type="time"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required=""
            v-model="reserverInformation.startTime"
          />
          <label
            for="floating_last_name"
            class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >Start Time</label
          >
        </div>
      </div>
      <div class="grid xl:grid-cols-2 xl:gap-6">
        <div class="relative z-0 w-full mb-6 group">
          <input
            type="text"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            disabled
            :value="category.eventCategoryName"
          />
          <label
            class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >Category</label
          >
        </div>
        <div class="relative z-0 w-full mb-6 group">
          <input
            type="number"
            min="1"
            max="40"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required=""
            v-model="reserverInformation.duration"
          />
          <label
            for="floating_last_name"
            class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >Duration</label
          >
        </div>
      </div>
      <div class="relative z-0 w-full mb-6 group">
        <label class="block mb-2 text-xs font-medium text-gray-500">Note</label>
        <textarea
          rows="4"
          v-model="reserverInformation.note"
          class="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        ></textarea>
      </div>
      <div class="flex gap-2 justify-center">
       
        <SmButton @click="$emit('back',reserverInformation)" type="submit" text="back" />
        <button type="submit">
          <SmButton btnType="secondary" text="submit" />
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped></style>
