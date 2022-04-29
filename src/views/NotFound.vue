<script setup>
import Button from '../components/Button.vue';
import { useRouter } from 'vue-router';
const myRouter = useRouter();
const goBack=()=>myRouter.go(-1);
</script>

<template>
  <div
    class="bg-home w-screen h-screen bg-no-repeat bg-cover bg-center flex items-center"
  >
    <div class="container mx-auto px-4 pt-16">
      <div class="flex flex-wrap-reverse justify-center items-center gap-3">
        <div class="flex flex-col gap-6">
          <p class="text-7xl text-white font-black uppercase tracking-widest">
            404 PAGE NOT FOUND
          </p>
          <p class="text-2xl text-white font-medium tracking-wider">
            It's an error .<br />
             The request url was not found on this.
          </p>
          <div class="flex flex-row">
            <router-link :to="{ name: 'NotFound' }">
              <Button  text="Go back !" btnType="secondary"  @click="goBack" />
            </router-link>
            
          </div>
        </div>
        <img
          class="calender bounce-2 object-cover w-3/5"
          src="/images/cover-model-404.png"
          alt="404"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>


</style>