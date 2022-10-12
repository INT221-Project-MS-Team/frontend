<script setup>
import SmButton from './SmButton.vue';
import { PencilIcon, EyeIcon, XIcon } from '@heroicons/vue/outline';
import { useStatusStore } from '../store/status';

const emits = defineEmits(['editCategory']);
const storeStatus = useStatusStore();
const props = defineProps({
  categories: {
    type: Array,
    required: true,
  },
});

const isMyCategory = (category) => {
  if (storeStatus.loggedInUser?.role == 'ADMIN') return true;

  return (
    category.users.filter((user) => user.id == storeStatus.loggedInUser?.id)
      .length > 0
  );
};
</script>

<template>
  <div
    class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 flex-col rounded-lg clinic-scollbar overflow-auto"
  >
    <table
      class="text-sm xs:text-xs sm:text-xs md:text-sm lg:text-sm h-4/6 sm:rounded-lg text-left text-gray-500 dark:text-gray-400"
    >
      <thead
        class="text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th scope="col" class="px-6 py-3">#</th>
          <th scope="col" class="px-6 py-3">Name</th>
          <th scope="col" class="px-6 py-3">Duration</th>
          <th scope="col" class="px-6 py-3">Description</th>
          <!-- <tsh scope="col" class="px-6 py-3">More</tsh> -->
          <th scope="col" class="px-6 py-3">Edit</th>
        </tr>
      </thead>
      <tbody class="relative overflow-auto">
        <tr v-if="!categories.length" class="flex justify-center">
          <th scope="col" class="col-span-full px-6 py-3">No data</th>
        </tr>
        <tr
          v-else
          v-for="(category, index) in categories"
          :key="index"
          class="bg-white border-b hover:bg-gray-50"
        >
          <th scope="col" class="px-6 py-3">
            {{ index + 1 }}
          </th>
          <th scope="col" class="px-6 py-3">
            {{ category.eventCategoryName }}
          </th>
          <th scope="col" class="px-6 py-3">
            {{ category.eventDuration }}
          </th>
          <th
            class="px-6 py-4"
            :class="!category.eventCategoryDescription ? ['text-gray-300'] : ''"
          >
            {{ category.eventCategoryDescription || 'No Description' }}
          </th>
          <!-- <th class="px-6 py-3 text-clinic-blue-300">
            <EyeIcon
              class="w-5 h-5 cursor-pointer"
              @click="$emit('editCategory', category)"
            />
          </th> -->
          <th class="px-6 py-3 text-clinic-blue-300">
            <PencilIcon
              v-if="isMyCategory(category)"
              class="w-5 h-5 cursor-pointer"
              @click="$emit('editCategory', category)"
            />
            <XIcon v-else class="w-5 h-5 cursor-pointer text-red-600" />
          </th>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped></style>
