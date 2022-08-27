<script setup>
import UserTable from '../components/UserTable.vue';
import { onBeforeMount } from '@vue/runtime-core';
import { ref, inject } from 'vue';
import UserModalEdit from '../components/UserModalEdit.vue';
import SmButton from '../components/SmButton.vue';
import { SearchIcon, CalendarIcon, LoginIcon,LogoutIcon  } from '@heroicons/vue/outline';
import UserModalAdd from '../components/UserModalAdd.vue';
import ButtonAddUser from '../components/ButtonAddUser.vue';
import NoUser from '../components/NoUser.vue';

const swal = inject('$swal');
const usersData = ref([]);
const editModalShow = ref(false);
const addModalShow = ref(false);
const editUserObj = ref({});
const addUserObj = ref({});

const getUsersData = async () => {
  const response = await fetch(import.meta.env.VITE_SERVER_URL + '/api/users');
  if (response.status === 200) {
    const data = await response.json();
    usersData.value = data.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
    console.log(usersData.value);
  } else {
    console.log('Fetch User Error');
  }
};

const editUser = async (user) => {
  editUserObj.value = user;
  editModalShow.value = true;
};

const addUser = async (user) => {
  addUserObj.value = user;
  addModalShow.value = true;
};

const closeModal = () => {
  editModalShow.value = false;
  addModalShow.value = false;
  editUserObj.value = {};
  addUserObj.value = {};
};

const deleteUser = async (user) => {
  await swal({
    title: '<p class="text-lg">Are you sure to <b>delete</b> this user ?</p>',
    text: "You won't be able to revert this!",
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#5f72ff',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Confirm',
    cancelButtonText: 'No',
  }).then(async (result) => {
    if (result.isConfirmed) {
      const response = await fetch(
        import.meta.env.VITE_SERVER_URL + `/api/users/${user.id}`,
        {
          method: 'DELETE',
        }
      );
      if (response.status === 200) {
        swal({
          title: '<p class="text-lg">Success</p>',
          text: 'User has been delete',
          icon: 'success',
          confirmButtonColor: '#5f72ff',
        });
        // router.push({ name: 'user' });
        await forceUpdate();
      } else {
        swal({
          title: 'Failure',
          text: 'Something went wrong',
          icon: 'error',
          confirmButtonColor: '#5f72ff',
        });
        console.log('error,cannot delete user');
      }
    }
  });
};

const forceUpdate = async () => {
  await getUsersData();
};

onBeforeMount(async () => {
  await getUsersData();
});


</script>

<template>
  <div
    class="bg-schedules w-screen h-screen bg-no-repeat bg-cover bg-center flex flex-wrap flex-col items-center justify-center gap-2 rounded-xl">
    <div class="w-9/12 h-5/6 bg-white flex shadow-md rounded-xl clinic-scollbar p-2">
      <div class="md:text-lg flex flex-col lg:text-lg min-w-full">
        <div class="flex justify-between flex-wrap items-center align-middle pl-5 pr-5 mt-5 rounded-t-lg mb-5">
          <p class="text-gray-800 text-2xl">User</p>

          <button id="dropdownSmallButton" data-dropdown-toggle="dropdownSmall"
            class="inline-flex items-center py-2 px-3 mr-3 mb-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg md:mb-0 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button">Manage<svg class="ml-2 w-3 h-3" aria-hidden="true" fill="none" stroke="currentColor"
              viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg></button>

          <!-- Dropdown menu -->
          <div id="dropdownSmall"
            class="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
            <div class="py-3 px-4 text-sm text-gray-900 dark:text-white">
              <!-- <div>User Name</div> -->
              <div class="font-medium text-gray-500">No Login</div>
              <!-- <div class="font-medium truncate">user@email</div> -->
              <div class="font-normal text-gray-400">(not sign in)</div>
            </div>
            <ul class="py-1 text-sm dark:text-gray-200" aria-labelledby="dropdownSmallButton">
              <li>
                <ButtonAddUser :users="usersData" @addUser="addUser"
                  class="block py-2 px-4 text-clinic-blue-300 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                  Add User</ButtonAddUser>

              </li>

            </ul>
            <div class="py-1">
              <!-- <a href="#"
                class="flex gap-2 py-2 px-4 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                 <LogoutIcon class="w-5 h-5" />
                Sign out
                </a> -->
               <router-link :to="{ name: 'login' }"
                class="flex gap-2 py-2 px-4 text-sm text-clinic-blue-300 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                <LoginIcon class="w-5 h-5" />
                Sign in
              </router-link>
            </div>
          </div>

          <!-- <ButtonAddUser :users="usersData" @addUser="addUser" /> -->
          <UserModalAdd :user="addUserObj" :isShow="addModalShow" @closeModal="closeModal" @forceUpdate="forceUpdate" />
        </div>
        <div v-if="usersData.length">
          <UserTable :users="usersData" @editUser="editUser" @deleteUser="deleteUser" />
          <UserModalEdit :user="editUserObj" :isShow="editModalShow" @closeModal="closeModal"
            @forceUpdate="forceUpdate" />
        </div>
        <div v-else class="text-center text-gray-800 text-lg align-middle">
          <NoUser />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
</style>
