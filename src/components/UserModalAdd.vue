<script setup>
import { computed, inject, ref } from '@vue/runtime-core';
import { validateEmail } from '@/utils';
import SmButton from './SmButton.vue';
const emits = defineEmits(['closeModal', 'forceUpdate']);
const swal = inject('$swal');

const userRoles = ref(['STUDENT', 'LECTURER', 'ADMIN']);

const props = defineProps({
  isShow: {
    type: Boolean,
    default: false,
  },
});

const newUserData = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  role: userRoles.value[0],
})


const resetData = () => {
  newUserData.value.name = '';
  newUserData.value.email = '';
  newUserData.value.password = '';
  newUserData.value.confirmPassword = '';
  newUserData.value.role = userRoles.value[0];
}

//create
const addUser = async () => {
  // check email
  if (!validateEmail(newUserData.value.email)) {
    swal({
      title: 'Error',
      text: 'Email is invalid',
      icon: 'error',
      button: 'OK',
    });
    return;
  }
  const response = await fetch(
    import.meta.env.VITE_SERVER_URL + '/api/users/',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: newUserData.value.name.trim(),
        email: newUserData.value.email.trim(),
        password: newUserData.value.password,
        role: newUserData.value.role,
      }),
    }
  );
  if (response.status === 201) {
    swal({
      title: 'Success',
      text: 'Add user successfully',
      icon: 'success',
      button: 'OK',
    });
    resetData();
    emits('closeModal');
    emits('forceUpdate');
  } else {
    let error = await response.json();
    console.log('Add User failure');
    swal('Error', error.message, 'error');
  }
};
</script>

<template>
  <div class="fixed inset-0 z-10 overflow-y-auto" role="dialog" v-if="isShow">
    <div class="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity"></div>

      <span class="hidden sm:inline-block sm:h-screen sm:align-middle align-middle">&#8203;</span>
      <div
        class="relative inline-block transform overflow-hidden rounded-lg bg-white py-1 px-4 text-left align-middle shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
        <div class="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="mt-3 text-center text-base">Add New User</div>
          </div>
        </div>
        <form @submit.prevent="addUser" class="px-4 pt-5 pb-4 sm:p-6 sm:pb-4 flex-col justify-center gap-1 text-sm">
          <div class="relative z-0 w-full mb-6 group">
            <input type="text" v-model="newUserData.name"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-100 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" " required="" maxlength="100" />
            <label for=""
              class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Fullname</label>
          </div>
          <div class="relative z-0 w-full mb-6 group">
            <input type="email" v-model="newUserData.email"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-100 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" " required="" />
            <label for=""
              class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
          </div>
          <div class="relative z-0 w-full mb-6 group">
            <input type="password" v-model="newUserData.password"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-100 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" " required minlength="8" maxlength="14" />
            <label for=""
              class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
          </div>
          <div class="relative z-0 w-full mb-6 group">
            <input type="password" v-model="newUserData.confirmPassword"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-100 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" " required="" minlength="8" maxlength="14" />
            <label for=""
              class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm
              Password</label>
          </div>
          <div class="relative z-0 w-full mb-6 group">
            <label for="underline_select" class="sr-only">select</label>
            <label for=""
              class="mb-10 peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Role</label>
            <select id="underline_select" required placeholder="please select user role" v-model="newUserData.role"
              class="block py-2.5 px-0 w-full text-sm text-gray-800 bg-transparent border-0 border-b-2 border-gray-100 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
              <option v-for="(value, index) in userRoles" :value="value" :key="index">
                {{ value }}
              </option>
            </select>
          </div>
          <div class="flex justify-end gap-2">
            <button type="submit">
              <SmButton text="Add" btnType="events" />
            </button>
            <SmButton btnType="edit" text="Cancle" @click="resetData(); $emit('closeModal')" />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style>
</style>
