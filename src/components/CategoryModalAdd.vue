<script setup>
import { computed, inject, ref } from '@vue/runtime-core';
import SmButton from './SmButton.vue';
const emits = defineEmits(['closeModal', 'forceUpdate']);
const swal = inject('$swal');
const props = defineProps({
  category: {
    type: Object,
    required: true,
  },
  isShow: {
    type: Boolean,
    default: false,
  },
});

const newCategoryData = computed(() => ({
  id: props.category.id,
  eventCategoryName: props.category.eventCategoryName,
  eventDuration: props.category.eventDuration,
  eventCategoryDescription: props.category.eventCategoryDescription,
}));

//create
const addCategory = async () => {
  const response = await fetch(
    import.meta.env.VITE_SERVER_URL + '/api/events-categories/',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access_token') ?? '',
      },
      body: JSON.stringify({
        eventCategoryName: newCategoryData.value.eventCategoryName.trim(),
        eventDuration: newCategoryData.value.eventDuration,
        eventCategoryDescription:
          newCategoryData.value.eventCategoryDescription,
      }),
    }
  );
  if (response.status === 201) {
    swal({
      title: 'Success',
      text: 'Add category successfully',
      icon: 'success',
      showConfirmButton: false,
      timer: 1500,
    });
    emits('closeModal');
    emits('forceUpdate');
  } else {
    let error = await response.json();
    console.log('Add Category Error');
    swal('Error', error.message, 'error');
  }
};
</script>

<template>
  <div class="fixed inset-0 z-10 overflow-y-auto" role="dialog" v-if="isShow">
    <div
      class="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0"
    >
      <div
        class="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity"
      ></div>

      <span
        class="hidden sm:inline-block sm:h-screen sm:align-middle align-middle"
        >&#8203;</span
      >

      <div
        class="relative inline-block transform overflow-hidden rounded-lg bg-white py-1 px-4 text-left align-middle shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle"
      >
        <div class="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="mt-3 text-center text-base">Add New Category</div>
          </div>
        </div>
        <form
          @submit.prevent="addCategory"
          class="px-4 pt-5 pb-4 sm:p-6 sm:pb-4 flex-col justify-center gap-1 text-sm"
        >
          <div class="relative z-0 w-full mb-6 group">
            <input
              type="text"
              v-model="newCategoryData.eventCategoryName"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b border-gray-100 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required=""
              maxlength="100"
            />
            <label
              for=""
              class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >Category Name</label
            >
          </div>
          <div class="relative z-0 w-full mb-6 group">
            <input
              type="number"
              v-model="newCategoryData.eventDuration"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b border-gray-100 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required=""
              min="1"
              max="480"
            />
            <label
              for=""
              class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >Duration</label
            >
          </div>
          <div class="relative z-0 w-full mb-6 group">
            <textarea
              type="text"
              v-model="newCategoryData.eventCategoryDescription"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b border-gray-100 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              maxlength="500"
              rows="4"
            />
            <label
              for=""
              class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >Description</label
            >
          </div>
          <div class="flex justify-end gap-2">
            <button type="submit">
              <SmButton text="Add" btnType="events" />
            </button>
            <SmButton
              btnType="edit"
              text="Cancle"
              @click="$emit('closeModal')"
            />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style></style>
