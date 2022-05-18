<script setup>
import { MenuIcon } from '@heroicons/vue/outline';
</script>

<template>
  <nav
    class="bg-clinic-blue-200 xs:bg-clinic-blue-200 sm:bg-clinic-blue-200 md:bg-clinic-blue-200 lg:bg-transparent lg:text-white sm:px-4 absolute z-50 w-full rounded-b-2xl p-1"
  >
    <div class="container flex flex-wrap justify-between items-center mx-auto">
      <router-link
        :to="{ name: 'home' }"
        class="w-2/12 md:w-2/12 lg:w-3/12 m-2"
      >
        <img
          src="/images/logo-white-group-1.png"
          class="w-full md:w-10/12 lg:w-5/12 xl:w-4/12 lg:m-2"
        />
      </router-link>
      <button
        data-collapse-toggle="mobile-menu"
        type="button"
        class="inline-flex text-white items-center p-2 text-sm rounded-lg lg:hidden hover:bg-clinic-blue-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
        aria-controls="mobile-menu"
        aria-expanded="false"
      >
        <!-- <span class="sr-only">Open main menu</span> -->
        <MenuIcon class="w-4 h-4" />
        <MenuIcon class="hidden w-4 h-4" />
      </button>
      <div class="hidden w-full min-h-full lg:block lg:w-auto" id="mobile-menu">
        <ul
          class="flex flex-col mt-4 text-xs lg:flex-row lg:space-x-8 lg:mt-0 lg:text-sm lg:font-medium text-white text-center"
        >
          <li>
            <router-link :to="{ name: 'home' }">
              <div
                class="block py-4 pr-2 pl-2 rounded-full lg:p-0 hover:text-clinic-blue-100 hover:bg-white lg:hover:bg-transparent text-sm"
              >
                Home
              </div>
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'schedules' }">
              <a
                class="block py-4 pr-2 pl-2 rounded-full md:hover:bg-white lg:p-0 hover:text-clinic-blue-100 hover:bg-white lg:hover:bg-transparent text-sm"
                >Check</a
              >
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'reserve' }">
              <a
                class="block py-4 pr-2 pl-2 rounded-full md:hover:bg-white lg:p-0 hover:text-clinic-blue-100 hover:bg-white lg:hover:bg-transparent text-sm"
                >Reserve</a
              >
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'category' }">
              <a
                class="block py-4 pr-2 pl-2 rounded-full md:hover:bg-white lg:p-0 hover:text-clinic-blue-100 hover:bg-white lg:hover:bg-transparent text-sm"
                >Category</a
              >
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'about' }">
              <a
                class="block py-4 pr-2 pl-2 rounded-full md:hover:bg-white lg:p-0 hover:text-clinic-blue-100 hover:bg-white lg:hover:bg-transparent text-sm"
                >About</a
              >
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped></style>
