<script setup>
import Button from '../components/Button.vue';
</script>

<template>
  <div
    class="bg-home-bg w-screen h-screen bg-no-repeat bg-cover flex items-center"
  >
    <div class="container mx-auto px-4 pt-16">
      <div class="flex flex-wrap-reverse justify-center items-center gap-3">
        <div class="flex flex-col gap-6">
          <p
            class="text-7xl text-white font-extrabold font-prompt uppercase tracking-widest"
          >
            Booking
          </p>
          <p class="text-xl text-white font-prompt uppercase tracking-wider">
            Check for available and <br />
            make your reservation
          </p>
          <div class="flex flex-row">
            <Button text="Check !" btnType="primary" />
            <router-link :to="{ name: 'schedules' }">
              <Button text="Reserve !" btnType="secondary" />
            </router-link>
          </div>
        </div>
        <img class="object-cover w-3/5" src="images/calen-phone.png" alt="" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
