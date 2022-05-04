<script setup>
import Button from '../components/Button.vue';
</script>

<template>
  <div
    class="bg-home w-screen h-screen bg-no-repeat bg-cover bg-center flex items-center"
  >
    <div class="container mx-auto px-4 pt-16">
      <div class="flex flex-wrap-reverse justify-center items-center gap-3">
        <div class="flex flex-col gap-6">
          <p class="text-7xl text-white font-black uppercase tracking-widest">
            Booking
          </p>
          <p class="text-2xl text-white font-medium tracking-wider">
            Check for available and <br />
            make your reservation
          </p>
          <div class="flex flex-row">
            <router-link :to="{ name: 'schedules' }">
              <Button text="Check !" btnType="primary" />
            </router-link>
            <router-link :to="{ name: 'reserve' }">
              <Button text="Reserve !" btnType="secondary" />
            </router-link>
          </div>
        </div>
        <img
          class="calender bounce-2 object-cover w-3/5"
          src="/images/calen-phone-new.png"
          alt="cover"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.calender {
  animation-duration: 2s;
  animation-iteration-count: infinite;
  transform-origin: bottom;
  filter: drop-shadow(0.5rem 0.5rem 1rem #8da1ff);
}

.bounce-2 {
  animation-name: bounce-2;
  animation-timing-function: ease;
}

@keyframes bounce-2 {
  0% {
    transform: translateY(0);
  }

  25% {
    transform: translateY(-5);
  }

  50% {
    transform: translateY(-10px);
  }

  75% {
    transform: translateY(-5);
  }

  100% {
    transform: translateY(0);
  }
}
</style>
