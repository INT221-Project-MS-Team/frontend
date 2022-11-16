<script setup>
import { inject, onBeforeMount, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStatusStore } from '../store/status';
import AuthService from '@/msal/index';

const storeStatus = useStatusStore();
const swal = inject('$swal');
const router = useRouter();

const logoutWithMSAL = async () => {
  const instance = new AuthService();
  await instance.logout();
};

const localLogout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  storeStatus.setIsLoggedIn(false);
  storeStatus.setLoggedInUser(null);
};

onBeforeMount(async () => {
  if (storeStatus.isLoggedIn) {
    if (storeStatus.loggedInUser?.type === 'msal') {
      await logoutWithMSAL();
      localLogout();
    } else {
      localLogout();
      swal({
        title: 'Logout Success',
        text: 'You have been logged out',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false,
      });
      router.push({ name: 'sign-in' });
    }
  }
  router.push({ name: 'sign-in' });
});
</script>

<template>
  <div>Logging out...</div>
</template>
