<script setup>
import UserTable from '../components/UserTable.vue';
import { onBeforeMount } from '@vue/runtime-core';
import { ref, inject } from 'vue';
import UserModalEdit from '../components/UserModalEdit.vue';
import SmButton from '../components/SmButton.vue';
import { SearchIcon, CalendarIcon } from '@heroicons/vue/outline';
import UserModalAdd from '../components/UserModalAdd.vue';
import ButtonAddUser from '../components/ButtonAddUser.vue';

const swal = inject('$swal');
const usersData = ref([]);
const editModalShow = ref(false);
const addModalShow = ref(false);
const editUserObj = ref({});
const addUserObj = ref({});

const getUsersData = async () => {
    const response = await fetch(
        import.meta.env.VITE_SERVER_URL + '/api/users'
    );
    if (response.status === 200) {
        const data = await response.json();
        usersData.value = data.sort((a, b) => {
            return b.id - a.id;
        })
        console.log(data);
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
        await forceUpdate()
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
                    <ButtonAddUser :users="usersData" @addUser="addUser" />
                    <UserModalAdd :user="addUserObj" :isShow="addModalShow" @closeModal="closeModal"
                        @forceUpdate="forceUpdate" />
                </div>
                <UserTable :users="usersData" @editUser="editUser" @deleteUser="deleteUser" />
                <UserModalEdit :user="editUserObj" :isShow="editModalShow" @closeModal="closeModal"
                    @forceUpdate="forceUpdate" />
            </div>
        </div>
    </div>
</template>
 
<style>
</style>