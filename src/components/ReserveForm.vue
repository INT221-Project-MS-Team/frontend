<script setup>
import Divider from '@/components/Divider.vue';
import { ref } from '@vue/reactivity';
import { getDate, getTime, getInputDate } from '@/utils/index';
import SmButton from './SmButton.vue';
import { computed, inject } from '@vue/runtime-core';
import { useStatusStore } from '../store/status';

const swal = inject('$swal');
const storeStatus = useStatusStore();
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

const file = ref(null);

const uploadFile = async () => {
  let loadingPopup = swal({
    icon: 'info',
    title: 'Uploading File',
    text: 'Please wait...',
    showConfirmButton: false,
    closeOnClickOutside: false,
    closeOnEsc: false,
    timerProgressBar: true,
  });
  //Upload to server
  const formData = new FormData();
  formData.append('file', file.value.files[0]);
  const response = await fetch(
    import.meta.env.VITE_SERVER_URL + '/api/upload-file',
    {
      method: 'POST',
      body: formData,
    }
  );
  if (response.status === 201) {
    const data = await response.json();
    loadingPopup.close();
    swal.fire({
      title: 'Success!',
      text: 'File Uploaded',
      icon: 'success',
      confirmButtonText: 'Confirm',
    });
    reserverInformation.value.file = data;
    return data;
  } else {
    swal.fire({
      title: 'Error!',
      text: 'File Upload Failed',
      icon: 'error',
      confirmButtonText: 'Confirm',
    });
    reserverInformation.value.file = null;
    console.log('Upload file error');
    return null;
  }
};

const reserverInformation = computed(() => ({
  name: storeStatus.loggedInUser?.name ?? props.info.name,
  email: storeStatus.loggedInUser?.email ?? props.info.email,
  date: props.info.date,
  startTime: props.info.startTime,
  note: props.info.note,
  file: props.info.file,
}));

const next = async () => {
  if (file.value.files[0]) {
    await uploadFile();
  }
  await emits('next', reserverInformation.value);
};
</script>

<template>
  <div class="flex flex-col justify-center items-center">
    <div class="text-sm md:text-base lg:text-xl text-center text-gray-900">
      Reserve Information
    </div>
    <form @submit.prevent="next" class="w-8/12 mt-10">
      <div class="relative z-0 w-full mb-6 group">
        <input
          type="text"
          v-model="reserverInformation.name"
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-100 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required=""
          maxlength="100"
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
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-100 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required=""
        />
        <label
          for="floating_email"
          class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >Email address</label
        >
      </div>
      <div class="grid xl:grid-cols-2 xl:gap-6">
        <div class="relative z-0 w-full mb-6 group">
          <input
            type="date"
            v-model="reserverInformation.date"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-100 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required=""
            :min="getInputDate(new Date())"
          />
          <label
            class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >Date</label
          >
        </div>
        <div class="relative z-0 w-full mb-6 group">
          <input
            type="time"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-100 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
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
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-100 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
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
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-100 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            disabled
            max="480"
            :value="category.eventDuration"
          />
          <label
            for="floating_last_name"
            class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >Duration</label
          >
        </div>
      </div>

      <div>
        <label
          class="block mb-2 text-xs font-medium text-gray-500 dark:text-gray-300"
          for="small_size"
          >Upload file</label
        >
        <input
          class="text-sm text-grey-500 file:mr-5 file:py-3 file:px-10 file:rounded-full file:border-0 file:text-md file:font-semibold file:text-white file:bg-gradient-to-r file:from-blue-600 file:to-amber-600 hover:file:cursor-pointer hover:file:opacity-80"
          aria-describedby="file_input_help"
          id="file_input"
          type="file"
          ref="file"
        />
        <p
          class="mt-1 mb-2 text-xs text-gray-500 dark:text-gray-300"
          id="file_input_help"
        >
          (MAX file size 10mb).
        </p>
      </div>

      <div class="relative z-0 w-full mb-6 group">
        <label class="block mb-2 text-xs font-medium text-gray-500">Note</label>
        <textarea
          rows="4"
          v-model="reserverInformation.note"
          class="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-100 focus:ring-blue-500 focus:border-blue-500"
          maxlength="500"
        ></textarea>
      </div>
      <div class="flex gap-2 justify-center">
        <SmButton
          @click="$emit('back', reserverInformation)"
          type="submit"
          text="Back"
        />
        <button type="submit">
          <SmButton btnType="secondary" text="Submit" />
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped></style>
