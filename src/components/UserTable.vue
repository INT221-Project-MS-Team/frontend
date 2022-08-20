<script setup>
import { PencilIcon, TrashIcon } from '@heroicons/vue/outline';
const emits = defineEmits(['editUser', 'deleteUser']);

const props = defineProps({
    users: {
        type: Array,
        required: true,
    },
});
</script>
 
<template>

    <div
        class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 flex-col rounded-lg clinic-scollbar overflow-auto">
        <table
            class="text-sm xs:text-xs sm:text-xs md:text-sm lg:text-sm h-4/6 sm:rounded-lg text-left text-gray-500 dark:text-gray-400">
            <thead class="text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">#</th>
                    <th scope="col" class="px-6 py-3">Name</th>
                    <th scope="col" class="px-6 py-3">Created Date</th>
                    <th scope="col" class="px-6 py-3">Modified Date</th>
                    <th scope="col" colspan="2" class="px-6 py-3">Action</th>
                </tr>
            </thead>
            <tbody class="relative overflow-auto">
                <tr v-for="(user, index) in users" :key="index" class="bg-white border-b hover:bg-gray-50">
                    <th scope="col" class="px-6 py-3">
                        {{ index + 1 }}
                    </th>
                    <th scope="row" class="flex items-center py-4 px-6 text-gray-900 whitespace-nowrap dark:text-white">
                        <img class="w-10 h-10 rounded-full" src="../../public/images/bew.jpg" alt="Jese image">
                        <div class="pl-3">
                            <div class="text-base font-semibold"> {{ user.name }}</div>
                            <div class="font-normal text-gray-500">{{ user.email }}</div>
                        </div>
                    </th>

                    <th scope="col" class="px-6 py-3">
                        {{ user.createdOn }}
                    </th>
                    <th scope="col" class="px-6 py-3">
                        {{ user.updatedOn }}
                    </th>
                    <th class="px-6 py-3 text-clinic-blue-300">
                        <PencilIcon class="w-5 h-5 cursor-pointer" @click="$emit('editUser', user)" />
                    </th>
                    <th class="px-6 py-3 text-clinic-blue-300">
                        <TrashIcon class="w-5 h-5 cursor-pointer" @click="$emit('deleteUser', user)" />
                    </th>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<style>
</style>