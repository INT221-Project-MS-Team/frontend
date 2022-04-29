<script setup></script>

<template>
  <nav
    class="bg-transparent border-gray-200 px-2 sm:px-4 py-2.5 rounded absolute w-full "
  >
    <div class="container flex flex-wrap justify-between items-center mx-auto">
      <router-link :to="{ name: 'home' }">
        <a class="flex items-center">
          <img src="/images/logo-white.png" class="mr-3 h-16" />
        </a>
      </router-link>
      <div class="w-full md:block md:w-auto text-white">
        <ul
          class="flex flex-wrap md:space-x-8 md:mt-0 md:text-base md:font-medium"
        >
          <li>
            <router-link :to="{ name: 'home' }">
              <a class="block py-2 pr-4 pl-3 rounded md:p-0 hover:text-clinic-blue-100">Home</a>
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'schedules' }">
              <a class="block py-2 pr-4 pl-3 rounded md:p-0 hover:text-clinic-blue-100">Check</a>
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'home' }">
              <a class="block py-2 pr-4 pl-3 rounded md:p-0 hover:text-clinic-blue-100">Reserve</a>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped></style>
