<script setup>
import Navbar from './components/Navbar.vue';
</script>

<template>
  <div id="allback">
    <Navbar />
    <router-view></router-view>
  </div>
</template>
 
<style>
#allback{
   background-color: #5f72ff;
}
</style>