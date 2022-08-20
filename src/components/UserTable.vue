<script setup>
import { PencilIcon, PlusCircleIcon } from '@heroicons/vue/outline';
const emits = defineEmits(['editUser']);

const props = defineProps({
  categories: {
    type: Array,
    required: true,
  },
});
</script>
 
<template>
    <div
        class="bg-schedules  w-screen h-screen bg-no-repeat bg-cover bg-center flex flex-wrap flex-col items-center justify-center gap-2 rounded-xl">

        <div class="w-7/12 h-5/6 rounded-lg clinic-scollbar overflow-auto bg-white relative shadow-md sm:rounded-xl">
            <div class="flex justify-between items-center dark:bg-gray-900">
                <div class="p-5 text-2xl">User
                </div>
                <div class="relative pr-5">
                    <!-- <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor"
                            viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                clip-rule="evenodd"></path>
                        </svg>
                    </div>
                    <input type="text" id="table-search-users"
                        class="block p-2 pl-10 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search for users"> -->

                    <button class="flex  gap-2 align-middle items-center text-white bg-gradient-to-r from-blue-500 via-clinic-blue-500  
         to-clinic-blue-300 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-clinic-blue-500 
         dark:focus:ring-clinic-blue-200  dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg 
         text-sm px-5 py-2.5 text-center">
                        <PlusCircleIcon class="w-5 h-5" />
                        Add User
                    </button>
                </div>
            </div>
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="p-4">
                            #
                        </th>
                        <th scope="col" class="py-3 px-6">
                            Name
                        </th>
                        <th scope="col" class="py-3 px-6">
                            Date created
                        </th>
                        <th scope="col" class="py-3 px-6">
                            Role
                        </th>
                        <th scope="col" class="py-3 px-6">
                        </th>

                    </tr>
                </thead>
                <tbody>
                    <tr
                        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td class="p-4 w-4">
                            <div class="flex items-center">
                                1
                            </div>
                        </td>
                        <th scope="row"
                            class="flex items-center py-4 px-6 text-gray-900 whitespace-nowrap dark:text-white">
                            <img class="w-10 h-10 rounded-full" src="../../public/images/bew.jpg" alt="Jese image">
                            <div class="pl-3">
                                <div class="text-base font-semibold">Bew Burats</div>
                                <div class="font-normal text-gray-500">bew@gmail.com</div>
                            </div>
                        </th>
                        <td class="py-4 px-6">
                            8/20/2022 
                        </td>
                        <td class="py-4 px-6">
                            <div class="flex items-center">
                                Admin
                            </div>
                        </td>
                        <td class="py-4 px-6">
                          
                            <PencilIcon class="w-5 h-5 text-blue-600 cursor-pointer"  @click="$emit('editUser', user)" />
                        </td>
                    </tr>

                </tbody>
            </table>
        </div>
    </div>
    <!-- </div> -->
</template>
 
<style>
</style>