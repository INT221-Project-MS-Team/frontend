<script setup>
import { inject, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStatusStore } from '../store/status';

const storeStatus = useStatusStore();
const swal = inject('$swal');
const router = useRouter();

localStorage.removeItem('access_token');
localStorage.removeItem('refresh_token');

swal({
  title: 'Success',
  text: 'You have been logged out',
  icon: 'success',
  showConfirmButton: false,
  timer: 1500,
});

storeStatus.setIsLoggedIn(false);
storeStatus.setLoggedInUser(null);

router.push({ name: 'sign-in' });
</script>

<template>
  <div>Logging out...</div>
</template>
