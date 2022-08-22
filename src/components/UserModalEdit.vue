<script setup>
import {
  computed,
  inject,
  onBeforeMount,
  onBeforeUpdate,
  ref,
} from '@vue/runtime-core';
import {
  getDate,
  getTime,
  categoryIdToBadgeColor,
  truncateString,
  categoryIdToStyleColor,
  getInputDate,
  getInputTime,
} from '../utils';
import SmButton from './SmButton.vue';

const swal = inject('$swal');

const emits = defineEmits(['closeModal', 'forceUpdate']);

const userRoles = ref(['ADMIN', 'STUDENT', 'LECTURER']);

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
  isShow: {
    type: Boolean,
    default: false,
  },
});

const isEditing = ref(false);

const editingData = computed(() => ({
  id: props.user.id,
  name: props.user.name,
  email: props.user.email,
  role: props.user.role,
}));

const updateUser = async () => {
  cancleEditing();
  const response = await fetch(
    import.meta.env.VITE_SERVER_URL + '/api/users/' + editingData.value.id,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: editingData.value.name.trim(),
        email: editingData.value.email.trim(),
        role: editingData.value.role,
      }),
    }
  );
  const data = await response.json();
  if (response.status === 200) {
    swal({
      title: 'Success',
      text: 'Updated user',
      icon: 'success',
      button: 'OK',
    });
    emits('forceUpdate');
  } else {
    swal({
      title: 'Update Failed',
      text: data.message,
      icon: 'error',
      button: 'OK',
    });
    console.log('Update User Error');
  }
};

const closeModal = async () => {
  cancleEditing();
  emits('closeModal');
};

const cancleEditing = async () => {
  isEditing.value = false;
};

const resetEditingData = async () =>{
  editingData.value.name = props.user.name;
  editingData.value.email = props.user.email;
  editingData.value.role = props.user.role;
  cancleEditing();
}
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
            <div class="mt-3 text-center text-base">
              {{ isEditing ? 'Edit User' : 'View User' }}
            </div>
          </div>
        </div>
        <form
          @submit.prevent="updateUser"
          class="px-4 pt-5 pb-4 sm:p-6 sm:pb-4 flex-col justify-center gap-1 text-sm"
        >
          <div class="relative z-0 w-full mb-6 group">
            <input
              type="text"
              v-model="editingData.name"
              class="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-gray-100 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              :class="isEditing ? 'text-gray-900 border-b-2' : 'text-gray-500'"
              placeholder=" "
              required=""
              maxlength="100"
              :disabled="!isEditing"
            />
            <label
              for=""
              class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >Fullname</label
            >
          </div>
          <div class="relative z-0 w-full mb-6 group">
            <input
              type="email"
              v-model="editingData.email"
              class="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-gray-100 appearance-none focus:outline-none focus:ring-0  peer"
              :class="isEditing ? 'text-gray-900 border-b-2' : 'text-gray-500'"
              required=""
              :disabled="!isEditing"
            />
            <label
              for=""
              class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >Email</label
            >
          </div>
          <div class="relative z-0 w-full mb-6 group">
            <label
              for=""
              class="mb-10 peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >Role</label
            >
            <select
              id="underline_select"
              required
              v-model="editingData.role"
              class="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-gray-100 appearance-none focus:outline-none focus:ring-0"
              :class="isEditing ? 'text-gray-900 border-b-2' : 'text-gray-500'"
              :disabled="!isEditing"
            >
              <option
                v-for="(value, index) in userRoles"
                :value="value"
                :key="index"
                :selected="editingData.role === value"
              >
                {{ value }}
              </option>
            </select>
          </div>
          <div class="relative z-0 w-full mb-6 group">
            <label for="" class="text-sm text-gray-500">Created Date</label>
            <div class="flex">
              <input
                type="date"
                class="px-0 text-xs text-gray-500 bg-transparent border-0 appearance-none"
                disabled
                readonly
                :value="getInputDate(user.createdOn)"
              /><input
                type="time"
                class="px-0 text-xs text-gray-500 bg-transparent border-0 appearance-none"
                disabled
                readonly
                :value="getInputTime(user.createdOn)"
              />
            </div>
          </div>
          <div class="relative z-0 w-full mb-6 group">
            <label for="" class="text-sm text-gray-500">Modified Date</label>
            <div class="flex">
              <input
                type="date"
                class="px-0 text-xs text-gray-500 bg-transparent border-0 appearance-none"
                disabled
                readonly
                :value="getInputDate(user.updatedOn)"
              /><input
                type="time"
                class="px-0 text-xs text-gray-500 bg-transparent border-0 appearance-none"
                disabled
                readonly
                :value="getInputTime(user.updatedOn)"
              />
            </div>
          </div>
          <div v-if="isEditing" class="flex justify-end gap-2">
            <button type="submit">
              <SmButton text="Save" btnType="events" />
            </button>
            <SmButton btnType="primary" text="Cancle" @click="resetEditingData" />
          </div>
          <div v-else class="flex justify-end gap-2">
            <SmButton
              text="Edit"
              btnType="secondary"
              @click="isEditing = true"
            />
            <SmButton text="Close" btnType="primary" @click="closeModal" />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
