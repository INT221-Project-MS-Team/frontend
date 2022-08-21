<script setup>

</script>
 
<template>
    <nav
        class="bg-clinic-blue-200 xs:bg-clinic-blue-200 sm:bg-clinic-blue-200 md:bg-clinic-blue-200 lg:bg-transparent lg:text-white px-2 sm:px-4 py-2.5 dark:bg-gray-900 fixed w-full z-20 top-0 left-0  dark:border-gray-600">
        <div class="container flex flex-wrap justify-between items-center mx-auto">
            <router-link :to="{ name: 'home' }" class="flex items-center">
                <img src="/images/logo-white-group-1.png" class="mr-3 h-6 sm:h-9" alt="Flowbite Logo">

            </router-link>
            <div class="flex md:order-2">
                <!-- <button type="button"
                    class="py-2 px-3 m-1 text-xs font-medium text-center text-white bg-clinic-blue-300 rounded-2xl focus:ring-4 
            focus:outline-none border border-white focus:ring-blue-300 hover:bg-white hover:text-clinic-blue-300">Login</button> -->
            <router-link :to="{ name: 'login' }">
                <button disabled type="button" class=" m-1 py-2 px-3 text-sm font-medium text-center text-clinic-blue-300 bg-white rounded-2xl hover:bg-gray-100  focus:ring-4 
            focus:outline-none  focus:ring-blue-300">Login</button></router-link>

                <button data-collapse-toggle="navbar-sticky" type="button"
                    class="inline-flex items-center p-2 text-sm text-white rounded-lg md:hidden hover:bg-transparent focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    aria-controls="navbar-sticky" aria-expanded="false">
                    <span class="sr-only">Open main menu</span>
                    <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                            clip-rule="evenodd"></path>
                    </svg>
                </button>
            </div>
            <div class="hidden justify-between items-center w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                <ul
                    class="flex flex-col p-4 mt-4 rounded-lg border   md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 bg-clinic-blue-200 xs:bg-clinic-blue-200 sm:bg-clinic-blue-200 md:bg-clinic-blue-200 lg:bg-transparent lg:text-white">

                    <li>
                        <router-link :to="{ name: 'home' }">
                            <div class="block py-2 pr-4 pl-3 text-white hover:text-clinic-blue-100 rounded md:bg-transparent md:p-0 dark:text-white"
                                aria-current="page">
                                Home
                            </div>
                        </router-link>
                    </li>

                    <li>
                        <button id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar" class="flex justify-between items-center py-2 pr-4 pl-3 w-full  text-white rounded hover:bg-gray-100 hover:text-clinic-blue-100 md:hover:bg-transparent 
              md:border-0 md:hover:text-clinic-blue-100 md:p-0 md:w-auto">Services
                            <svg class="ml-1 w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clip-rule="evenodd"></path>
                            </svg></button>
                        <!-- Dropdown menu -->
                        <div id="dropdownNavbar"
                            class="justify-between items-center  hidden z-10 w-44 font-normal bg-white border border-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                            <ul class="py-1 text-sm text-gray-700 dark:text-gray-400"
                                aria-labelledby="dropdownLargeButton">
                                <li>
                                    <router-link :to="{ name: 'schedules' }">
                                        <a
                                            class="block py-2 px-4 text-clinic-blue-300 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Check
                                        </a>
                                    </router-link>
                                </li>
                                <li>
                                    <router-link :to="{ name: 'reserve' }">
                                        <a
                                            class="block py-2 px-4 text-clinic-blue-300 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Reserve
                                        </a>
                                    </router-link>
                                </li>
                            </ul>
                        </div>
                    </li>

                    <li>
                        <button id="dropdownNavbarLink2" data-dropdown-toggle="dropdownNavbar2" class="flex justify-between items-center py-2 pr-4 pl-3 w-full  text-white rounded hover:bg-gray-100 hover:text-clinic-blue-100 md:hover:bg-transparent 
              md:border-0 md:hover:text-clinic-blue-100 md:p-0 md:w-auto">Manage
                            <svg class="ml-1 w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clip-rule="evenodd"></path>
                            </svg></button>
                    
                        <div id="dropdownNavbar2"
                            class="justify-between items-center  hidden z-10 w-44 font-normal bg-white border border-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                            <ul class="py-1 text-sm text-gray-700 dark:text-gray-400"
                                aria-labelledby="dropdownLargeButton">
                                <li>
                                    <router-link :to="{ name: 'category' }">
                                        <a
                                            class="block py-2 px-4 text-clinic-blue-300 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Category
                                        </a>
                                    </router-link>
                                </li>
                                <li>
                                    <router-link :to="{ name: 'user' }">
                                        <a
                                            class="block py-2 px-4 text-clinic-blue-300 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">User
                                        </a>
                                    </router-link>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <router-link :to="{ name: 'about' }">
                            <a
                                class="block  py-2 pr-4 pl-3 rounded-full text-white hover:text-clinic-blue-100  md:bg-transparent md:p-0 dark:text-white lg:hover:bg-transparent text-sm">About</a>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>
 
<style>
</style>