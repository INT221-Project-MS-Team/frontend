<script setup>
import SmButton from './SmButton.vue';
const props = defineProps({
  categories: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <div
    class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 flex-col rounded-lg clinic-scollbar overflow-auto"
  >
    <table
      class="h-4/6 sm:rounded-lg text-sm text-left text-gray-500 dark:text-gray-400 "
    >
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th scope="col" class="px-6 py-3">#</th>
          <th scope="col" class="px-6 py-3">Name</th>
          <th scope="col" class="px-6 py-3">Duration</th>
          <th scope="col" class="px-6 py-3">Description</th>
          <th scope="col" class="px-6 py-3"></th>
        </tr>
      </thead>
      <tbody class="relative overflow-auto">
        <tr
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
          <th class="px-6 py-3 text-clinic-blue-300">
            <SmButton text="Edit" btnType="edit" />
          </th>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped></style>
