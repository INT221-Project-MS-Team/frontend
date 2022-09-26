<script setup>
import Navbar from '@/components/Navbar.vue';
import { onBeforeMount } from '@vue/runtime-core';
import { useStatusStore } from './store/status';

const storeStatus = useStatusStore();

onBeforeMount(async () => {
  await fetchLoggedInData();
});

const fetchLoggedInData = async () => {
  let access_token = localStorage.getItem('access_token');
  let refresh_token = localStorage.getItem('refresh_token');
  if (access_token && refresh_token) {
    const response = await fetch(import.meta.env.VITE_SERVER_URL + `/api/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
      },
    });
    if (response.status === 200) {
      let data = await response.json();
      storeStatus.setIsLoggedIn(true);
      storeStatus.setLoggedInUser({...data});
    } else {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    }
  }
};
</script>

<template>
  <div class="bg-clinic-blue-300">
    <Navbar />
    <router-view></router-view>
  </div>
</template>
