<script setup>
import SmButton from '../components/SmButton.vue';
import Button from '../components/Button.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const goBack = () => {
  router.go(-1);
};
</script>

<template>
  <div
    class="bg-home w-screen h-screen bg-no-repeat bg-cover bg-center flex flex-wrap flex-col items-center justify-center gap-2"
  >
    <div>
      <div
        class="container mt-6 text-center text-xl sm:text-xl md:text-xl lg:text-xl xl:text-2xl uppercase font-black text-white tracking-widest mb-8"
      >
        about
      </div>
      <div class="mx-auto min-w-full container justify-center items-center">
        <div
          class="text-center text-xs sm:text-xs md:text-xs lg:text-xs xl:text-xl text-white tracking-wider mb-8"
        >
          We are SY-2 (advisor: Siam Yamsaengsung) proud to present this project
          "Booking" <br />
          which is part of the INT221 subject at the school of information
          technology KMUTT.<br />
          Let's introduce ourselves.
        </div>
      </div>
      <div class="grid grid-cols-3 pb-10 min-w-full container text-center">
        <div>
          <img
            class="mb-3 h-90 rounded-full shadow-lg w-6/12 mx-auto"
            src="/images/bew.jpg"
            alt="bew"
          />
          <div class="mt-5 mb-1 text-xl font-medium text-white">
            Buratsakorn Boonma
          </div>
          <div class="text-sm text-gray-200">63130500074</div>
          <a href="https://github.com/bewburats">
            <img
              src="/images/Github-white.png"
              class="mx-auto object-scale-down"
            />
          </a>
        </div>
        <div>
          <img
            class="mb-3 rounded-full shadow-lg w-6/12 mx-auto"
            src="/images/tan.jpg"
          />
          <div class="mt-5 mb-1 text-xl font-medium text-white">
            Rawis Noiwong
          </div>
          <span class="text-sm text-gray-200">63130500100</span>
          <a href="https://github.com/Tttangentt">
            <img src="/images/Github-white.png" class="mx-auto" />
          </a>
        </div>
        <div>
          <img
            class="mb-3 rounded-full shadow-lg w-6/12 mx-auto"
            src="/images/aom.jpg"
          />
          <div class="mt-5 mb-1 text-xl font-medium text-white">
            Siriwat Jaiyungyuen
          </div>
          <span class="text-sm text-gray-200">63130500120</span>
          <a href="https://github.com/siraom15">
            <img src="/images/Github-white.png" class="mx-auto" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
