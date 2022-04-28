<script setup>
import Button from '../components/Button.vue';
</script>

<template>
  <div class="bg-home-bg w-screen h-screen bg-no-repeat bg-cover flex items-center">
    <div class="container mx-auto px-4 pt-16">
      <div class="flex flex-wrap-reverse justify-center items-center gap-3">
        <div class="flex flex-col gap-6">
          <p class="text-7xl text-white font-black font-prompt uppercase tracking-widest">
            Booking
          </p>
          <p class="text-2xl text-white font-prompt font-medium  tracking-wider">
            Check for available and <br />
            make your reservation
          </p>
          <div class="flex flex-row">
            <router-link :to="{ name: 'schedules' }">
              <Button text="Check !" btnType="primary" />
            </router-link>
            <Button text="Reserve !" btnType="secondary" />
          </div>
        </div>
        <img class="calender bounce-2 object-cover w-3/5" src="images/calen-phone-new.png" alt="cover" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.calender {
  align-self: flex-end;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  transform-origin: bottom;
  filter: drop-shadow(.5rem .5rem 1rem #8da1ff);
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

.bg-home-bg {
  background-image: url('/images/home-bg-new-1.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-color: #5f72ff;
}
</style>
