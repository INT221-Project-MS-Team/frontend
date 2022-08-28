<script setup>
import UserTable from '@/components/UserTable.vue';
import { onBeforeMount } from '@vue/runtime-core';
import { ref, inject } from 'vue';
import UserModalEdit from '@/components/UserModalEdit.vue';
import SmButton from '@/components/SmButton.vue';
import { SearchIcon, CalendarIcon, LoginIcon, LogoutIcon, UserAddIcon } from '@heroicons/vue/outline';
import UserModalAdd from '@/components/UserModalAdd.vue';
import NoUser from '@/components/NoUser.vue';
import { Dropdown, ListGroup, ListGroupItem } from 'flowbite-vue'

const swal = inject('$swal');
const usersData = ref([]);
const isEditUserModalShow = ref(false);
const isAddUserModalShow = ref(false);
const editUserObj = ref({});

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
  isEditUserModalShow.value = true;
};

const openAddUserModal = async () => {
  isAddUserModalShow.value = true;
};

const closeModal = () => {
  isEditUserModalShow.value = false;
  isAddUserModalShow.value = false;
  editUserObj.value = {};
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
          <!-- Dropdown menu  -->
          <dropdown text="Manage">
            <list-group>
              <list-group-item>
                <button class="flex gap-2" @click="openAddUserModal">
                  <UserAddIcon class="w-5 h-5" />
                  Add User
                </button>
              </list-group-item>
              <list-group-item>
                <router-link :to="{ name: 'sign-in' }" class="flex gap-2">
                  <LoginIcon class="w-5 h-5" />
                  Sign In
                </router-link>
              </list-group-item>
            </list-group>
          </dropdown>
          <UserModalAdd :isShow="isAddUserModalShow" @closeModal="closeModal" @forceUpdate="forceUpdate" />
        </div>
        <div class="overflow-auto min-w-full clinic-scollbar" v-if="usersData.length">
          <UserTable :users="usersData" @editUser="editUser" @deleteUser="deleteUser" />
          <UserModalEdit :user="editUserObj" :isShow="isEditUserModalShow" @closeModal="closeModal"
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
