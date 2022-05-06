<script setup></script>

<template>
  <nav
    class="bg-white xs:bg-white sm:bg-white md:bg-white lg:bg-transparent lg:text-white sm:px-4 absolute z-50 w-full rounded-b-3xl shadow-sm"
  >
    <div class="container flex flex-wrap justify-between items-center mx-auto">
      <router-link :to="{ name: 'home' }">
        <a class="flex items-center">
          <img src="/images/logo-white.png" class=" w-2/12" />
        </a>
      </router-link>
      <button
        data-collapse-toggle="mobile-menu"
        type="button"
        class="inline-flex items-center p-2 ml-3 text-sm text-clinic-blue-300 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
        aria-controls="mobile-menu"
        aria-expanded="false"
      >
        <span class="sr-only">Open main menu</span>
        <svg
          class="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clip-rule="evenodd"
          ></path>
        </svg>
        <svg
          class="hidden w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
      <div class="hidden w-full min-h-full lg:block lg:w-auto" id="mobile-menu">
        <ul
          class="flex flex-col mt-4 lg:flex-row lg:space-x-8 lg:mt-0 lg:text-sm lg:font-medium text-center"
        >
          <li>
            <router-link :to="{ name: 'home' }">
              <div
                class="block py-2 pr-4 pl-3 rounded lg:p-0 hover:text-clinic-blue-100"
              >
                Home
              </div>
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'schedules' }">
              <a
                class="block py-2 pr-4 pl-3 rounded lg:p-0 hover:text-clinic-blue-100"
                >Check</a
              >
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'reserve' }">
              <a
                class="block py-2 pr-4 pl-3 rounded lg:p-0 hover:text-clinic-blue-100"
                >Reserve</a
              >
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'about' }">
              <a
                class="block py-2 pr-4 pl-3 rounded lg:p-0 hover:text-clinic-blue-100"
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
