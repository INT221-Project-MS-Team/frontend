<script setup>
import { ref } from '@vue/reactivity';
import { computed } from '@vue/runtime-core';
import CategoryButton from './CategoryButton.vue';

const search = ref('');
const emits = defineEmits(['selectCategory']);
const props = defineProps({
  categories: {
    type: Array,
    required: true,
  },
});
const filterCategory = computed(() => {
  // filter categories
  if (search.value.length) {
    return props.categories.filter((category) => {
      return category.eventCategoryName
        .toLowerCase()
        .includes(search.value.toLowerCase());
    });
  }
  return props.categories;
});
</script>

<template>
  <div>
    <div class="text-base md:text-base lg:text-xl text-center text-gray-900">
      Select Category
    </div>

    <form>
      <label
        for="search"
        class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >Search</label
      >
      <div class="relative w-1/3 h-1/6 mx-auto mt-2">
        <div
          class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
        >
          <svg
            aria-hidden="true"
            class="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <input
          type="search"
          class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg"
          placeholder="Search"
          required
          v-model="search"
        />
      </div>
    </form>

    <div class="grid sm:grid-cols-1 md:grid-cols-2 gap-4 p-10">
      <CategoryButton
        :text="category.eventCategoryName"
        v-for="(category, index) in filterCategory"
        :key="index"
        @click="$emit('selectCategory', index)"
      />
    </div>
  </div>
</template>

<style scoped></style>
