<script setup>
import Button from '../components/Button.vue';
import { useRouter } from 'vue-router';
const router = useRouter();

const goHome = () => {
  router.push({ name: 'home' });
};
</script>

<template>
  <div
    class="bg-home w-screen h-screen bg-no-repeat bg-cover bg-center flex items-center"
  >
    <div class="container mx-auto px-4 pt-16">
      <div class="flex flex-wrap-reverse justify-center items-center gap-3">
        <div class="flex flex-col gap-6">
          <p class="text-5xl text-white font-black uppercase tracking-widest">
            404 PAGE NOT FOUND
          </p>
          <p class="text-xl text-white font-medium tracking-wider">
            It's an error .<br />
            The request url was not found on this.
          </p>
          <div class="flex flex-row">
            <Button text="Go Home" btnType="secondary" @click="goHome" />
          </div>
        </div>
        <img
          class="calender bounce-2 object-cover w-5/12"
          src="/images/cover-model-404.png"
          alt="404"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
