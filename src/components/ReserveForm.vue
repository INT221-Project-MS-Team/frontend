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

const accept_file = ref(null);
const tempFile = ref(null);

const validateFileSize = async () => {
  console.log('bf tempFile', tempFile?.value?.files);
  console.log('bf current accept File', accept_file?.value?.files);
  try {
    const size = tempFile.value.files[0].size;
    if (size > 1024 * 1024 * 10) {
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'File size must be less than 10MB please select another file',
        showConfirmButton: false,
        timer: 3000,
      });
      throw new Error(
        'File size must be less than 10MB please select another file'
      );
    }

    const original = tempFile.value.files[0];
    const clone = new File([original], original.name, {
      type: original.type,
      lastModified: original.lastModified,
    });

    console.log(clone);
    accept_file.value = clone;
  } catch (e) {
    console.log(e);
  }
  console.log('at tempFile', tempFile.value?.files);
  console.log('at current accept File', accept_file.value);
};

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
  formData.append('file', accept_file.value);
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
      showConfirmButton: false,
      timer: 2000,
    });
    reserverInformation.value.file = data;
    return data;
  } else {
    swal.fire({
      title: 'Error!',
      text: 'File Upload Failed',
      icon: 'error',
      showConfirmButton: false,
      timer: 2000,
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
  if (accept_file.value) {
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
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b border-gray-100 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
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
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b border-gray-100 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
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
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b border-gray-100 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
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
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b border-gray-100 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
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
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b border-gray-100 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
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
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b border-gray-100 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
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

      <div id="file-upload">
        <label
          class="block mb-2 text-xs font-medium text-gray-500"
          for="small_size"
          >Upload file</label
        >
        <p class="text-xs text-gray-9000">
          Current file : {{ accept_file?.name || 'No File' }}
        </p>
        <div class="flex justify-center items-center w-full">
          <label
            for="dropzone-file"
            class="flex flex-col justify-center items-center w-full h-32 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div class="flex flex-col justify-center items-center pt-5 pb-6">
              <svg
                aria-hidden="true"
                class="mb-3 w-10 h-10 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                ></path>
              </svg>
              <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span class="font-semibold">Click to upload</span>
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                Any file type (MAX. 10mb)
              </p>
              <hr />
            </div>
            <input
              id="dropzone-file"
              type="file"
              class="hidden"
              @change="validateFileSize"
              ref="tempFile"
            />
          </label>
        </div>
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
