<script setup>
import { MenuIcon } from '@heroicons/vue/outline';
import { computed } from '@vue/runtime-core';
import { Dropdown, ListGroup, ListGroupItem } from 'flowbite-vue';
import { useStatusStore } from '@/store/status.js';

const storeStatus = useStatusStore();

const isAdmin = computed(() => storeStatus.loggedInUser?.role === 'admin');
const isLecturer = computed(() => storeStatus.loggedInUser?.role === 'lecturer');
const isStudent = computed(() => storeStatus.loggedInUser?.role === 'student');
const isLoggedIn = computed(() => storeStatus.isLoggedIn);

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
      <div
        class="hidden justify-between items-center w-full min-h-full lg:block lg:w-auto"
        id="mobile-menu"
      >
        <ul
          class="flex flex-col mt-4 text-xs lg:flex-row lg:space-x-8 lg:mt-0 lg:text-sm lg:font-medium text-white text-center"
        >
          <li>
            <router-link :to="{ name: 'home' }">
              <div
                class="block mt-2 py-4 pr-2 pl-2 rounded-full lg:p-0 hover:text-clinic-blue-100 hover:bg-white lg:hover:bg-transparent text-sm"
              >
                Home
              </div>
            </router-link>
          </li>

          <li>
            <button
              id="dropdownNavbarLink2"
              data-dropdown-toggle="dropdownNavbar2"
              class="flex justify-between items-center m-2 py-2 pr-4 pl-3 w-full font-medium text-white rounded hover:bg-gray-100 hover:text-clinic-blue-100 md:hover:bg-transparent md:border-0 md:hover:text-clinic-blue-100 md:p-0 md:w-auto"
            >
              Services
              <svg
                class="ml-1 w-5 h-5"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
            <!-- Dropdown menu -->
            <div
              id="dropdownNavbar2"
              class="justify-between items-center hidden z-10 w-44 font-normal bg-white border border-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
            >
              <ul
                class="py-1 text-sm text-gray-700 dark:text-gray-400"
                aria-labelledby="dropdownLargeButton"
              >
                <li v-if="isLoggedIn">
                  <router-link :to="{ name: 'schedules' }">
                    <a
                      class="block py-2 px-4 text-clinic-blue-300 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >Check
                    </a>
                  </router-link>
                </li>
                <li>
                  <router-link :to="{ name: 'reserve' }">
                    <a
                      class="block py-2 px-4 text-clinic-blue-300 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >Reserve
                    </a>
                  </router-link>
                </li>
              </ul>
            </div>
          </li>

          <!-- Manage Navbar -->
          <li v-if="isLoggedIn && (isAdmin || isLecturer)">
            <button
              id="dropdownNavbarLink"
              data-dropdown-toggle="dropdownNavbar"
              class="flex justify-between items-center mt-2 py-2 pr-4 pl-3 w-full font-medium text-white rounded hover:bg-gray-100 hover:text-clinic-blue-100 md:hover:bg-transparent md:border-0 md:hover:text-clinic-blue-100 md:p-0 md:w-auto"
            >
              Manages
              <svg
                class="ml-1 w-5 h-5"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
            <!-- Dropdown menu -->
            <div
              id="dropdownNavbar"
              class="justify-between items-center hidden z-10 w-44 font-normal bg-white border border-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
            >
              <ul
                class="py-1 text-sm text-gray-700 dark:text-gray-400"
                aria-labelledby="dropdownLargeButton"
              >
                <li v-if="isLoggedIn && (isAdmin || isLecturer)">
                  <router-link :to="{ name: 'category' }">
                    <a
                      class="block py-2 px-4 text-clinic-blue-300 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >Category
                    </a>
                  </router-link>
                </li>
                <li v-if="isLoggedIn && isAdmin">
                  <router-link :to="{ name: 'user' }">
                    <a
                      class="block py-2 px-4 text-clinic-blue-300 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >User
                    </a>
                  </router-link>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <router-link :to="{ name: 'about' }">
              <a
                class="block mt-2 py-4 pr-2 pl-2 rounded-full md:hover:bg-white lg:p-0 hover:text-clinic-blue-100 hover:bg-white lg:hover:bg-transparent text-sm"
                >About</a
              >
            </router-link>
          </li>
          <li v-if="!isLoggedIn">
            <router-link :to="{ name: 'sign-in' }">
              <button
                type="button"
                class="py-2 px-3 text-xs font-medium text-center text-white bg-clinic-blue-300 rounded-2xl focus:ring-4 focus:outline-none border border-white focus:ring-blue-300 hover:bg-white hover:text-clinic-blue-300"
              >
                Sign In
              </button>
            </router-link>
          </li>
          <li v-else class="flex items-center align-middle gap-2">
            <p>
              {{ storeStatus.loggedInUser?.email }} |
              {{ storeStatus.loggedInUser?.role }}
            </p>
            <router-link :to="{ name: 'sign-out' }">
              <button
                type="button"
                class="py-2 px-3 text-xs font-medium text-center text-clinic-blue-300 bg-white rounded-2xl hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300"
              >
                Sign Out
              </button>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped></style>
