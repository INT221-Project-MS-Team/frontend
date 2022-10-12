<script setup>
import {
  computed,
  inject,
  onBeforeMount,
  onBeforeUpdate,
  onMounted,
  reactive,
  ref,
} from '@vue/runtime-core';
import SmButton from './SmButton.vue';
import Divider from './Divider.vue';

const swal = inject('$swal');

const emits = defineEmits(['closeModal', 'forceUpdate']);

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
const usersData = ref([]);
const owners = computed(() => props.category.users?.map((user) => user.id));

const selectedOwner = ref([]);

onBeforeMount(() => {
  getUsersData();
});

const getUsersData = async () => {
  const response = await fetch(import.meta.env.VITE_SERVER_URL + '/api/users', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('access_token') ?? '',
    },
  });
  console.log(response);
  if (response.status === 200) {
    const data = await response.json();
    usersData.value = data.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
  } else if (response.status === 401) {
    swal.fire({
      title: 'Error!',
      text: 'You are not Signed in',
      icon: 'error',
      confirmButtonText: 'Confirm',
    });
    router.push({ name: 'sign-in' });
  } else if (response.status === 403) {
    swal.fire({
      title: 'Error!',
      text: 'Access Denied',
      icon: 'error',
      confirmButtonText: 'OK',
    });
    router.push({ name: 'home' });
  } else {
    console.log('Fetch User Error');
  }
};

const editingData = computed(() => ({
  id: props.category.id,
  eventCategoryName: props.category.eventCategoryName,
  eventDuration: props.category.eventDuration,
  eventCategoryDescription: props.category.eventCategoryDescription,
}));

const updateCategory = async () => {
  const response = await fetch(
    import.meta.env.VITE_SERVER_URL +
      '/api/events-categories/' +
      editingData.value.id,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access_token') ?? '',
      },
      body: JSON.stringify({
        eventCategoryName: editingData.value.eventCategoryName.trim(),
        eventDuration: editingData.value.eventDuration,
        eventCategoryDescription: editingData.value.eventCategoryDescription,
        ownerUserIds: [...owners.value, ...selectedOwner.value],
      }),
    }
  );
  const data = await response.json();
  if (response.status === 200) {
    swal({
      title: 'Success',
      text: 'Category Updated',
      icon: 'success',
      button: 'OK',
    });
    selectedOwner.value = [];
    emits('forceUpdate');
    emits('closeModal');
  } else {
    selectedOwner.value = [];
    swal({
      title: 'Update Failed',
      text: data.message,
      icon: 'error',
      button: 'OK',
    });
    console.log('Update Category Error');
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
            <div class="mt-3 text-center text-base">Edit Category</div>
          </div>
        </div>
        <form
          @submit.prevent="updateCategory"
          class="px-4 pt-5 pb-4 sm:p-6 sm:pb-4 flex-col justify-center gap-1 text-sm"
        >
          <div class="relative z-0 w-full mb-6 group">
            <input
              type="text"
              v-model="editingData.eventCategoryName"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-100 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
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
              v-model="editingData.eventDuration"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-100 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
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
              v-model="editingData.eventCategoryDescription"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-100 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
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

          <Divider text="Owner Section" />

          <div class="relative z-0 w-full mb-6 group">
            <h3 class="mb-4 text-gray-500 text-sm">Owner</h3>
            <ul
              class="w-auto text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <li
                v-for="user in usersData"
                :key="user.id"
                class="w-full rounded-t-lg"
              >
                <div class="flex items-center pl-3">
                  <label
                    v-if="owners.includes(user.id)"
                    class="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
                    >{{ user.email }}</label
                  >
                </div>
              </li>
            </ul>
          </div>
          <div class="relative z-0 w-full mb-6 group">
            <h3 class="mb-4 text-gray-500 text-sm">Add Owner</h3>
            <ul
              class="w-auto text-sm font-medium text-gray-900 bg-white rounded-lg border"
            >
              <li
                v-for="user in usersData"
                :key="user.id"
                class="w-full rounded-t-lg"
              >
                <div
                  class="flex items-center pl-3"
                  v-if="!owners.includes(user.id) && user.role == 'LECTURER'"
                >
                  <input
                    :id="`vue-checkbox-${user.id}`"
                    type="checkbox"
                    :value="user.id"
                    v-model="selectedOwner"
                    class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-2"
                  />
                  <label
                    :for="`vue-checkbox-${user.id}`"
                    class="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
                    >{{ user.email }}</label
                  >
                </div>
              </li>
            </ul>
          </div>
          <div class="flex justify-end gap-2">
            <button type="submit">
              <SmButton text="Save" btnType="events" />
            </button>
            <SmButton
              btnType="edit"
              text="Cancel"
              @click="
                $emit('closeModal');
                selectedOwner = [];
              "
            />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
