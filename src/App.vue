<script setup>
import Navbar from '@/components/Navbar.vue';
import { onBeforeMount } from '@vue/runtime-core';
import { useStatusStore } from './store/status';
import AuthService from '@/msal';

const storeStatus = useStatusStore();

onBeforeMount(async () => {
  await fetchLoggedInData();
});

const fetchLoggedInData = async () => {
  // if from MSAL
  let msalIdToken = localStorage.getItem('msal.idtoken');
  let access_token = localStorage.getItem('access_token');
  let refresh_token = localStorage.getItem('refresh_token');
  if (msalIdToken) {
    console.log('from msal');
    let instance = new AuthService();
    let user = await instance.getUser();
    console.log('user from app.vue', user);
    let myUser = {
      type: 'msal',
      email: user.idToken.preferred_username,
      id: undefined,
      name: user.idToken.name,
      role: user.idToken?.roles ? user.idToken.roles[0] : 'GUEST',
    };
    storeStatus.setLoggedInUser(myUser);
    storeStatus.setIsLoggedIn(true);
  } else if (access_token && refresh_token) {
    // if not from MSAL
    console.log('from insite');
    try {
      const response = await fetch(
        import.meta.env.VITE_SERVER_URL + `/api/me`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      if (response.status === 200) {
        let data = await response.json();
        console.log(data);
        storeStatus.setIsLoggedIn(true);
        let myUser = {
          type: 'local',
          email: data.email,
          id: data.id,
          name: data.name,
          role: data.role,
        };

        storeStatus.setLoggedInUser(myUser);
      } else {
        console.log('error geting me');
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        storeStatus.setLoggedInUser(null);
      }
    } catch (error) {
      console.log(error);
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      storeStatus.setLoggedInUser(null);
    }
  } else {
    console.log('clear all');
    storeStatus.setLoggedInUser(null);
    storeStatus.setIsLoggedIn(false);
    try {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('msal.idtoken');
    } catch (e) {
      console.log(e);
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
