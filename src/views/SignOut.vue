<script setup>
import { inject, ref } from 'vue';
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

const localLogout = async () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
};

if (storeStatus.isLoggedIn) {
  if (storeStatus.loggedInUser.type === 'msal') {
    await logoutWithMSAL();
    storeStatus.setIsLoggedIn(false);
    storeStatus.setLoggedInUser(null);
  } else {
    await localLogout();
    storeStatus.setIsLoggedIn(false);
    storeStatus.setLoggedInUser(null);
    swal({
      title: 'Logout Success',
      text: 'See you again',
      icon: 'success',
      timer: 2000,
      showConfirmButton: false,
    });
    router.push({ name: 'sign-in' });
  }
  
}
</script>

<template>
  <div>Logging out...</div>
</template>
