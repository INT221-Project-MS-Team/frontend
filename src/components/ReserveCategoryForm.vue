<script setup>
import CategoryButton from './CategoryButton.vue';

const emits = defineEmits(['selectCategory']);
const props = defineProps({
  categories: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <div>
    <div class="text-sm md:text-base lg:text-xl text-center text-gray-900">
      Select Category
    </div>
    <div class="grid sm:grid-cols-1 md:grid-cols-2 gap-4 mt-10">
        <CategoryButton :text="category.eventCategoryName" v-for="(category, index) in categories" :key="index" @click="$emit('selectCategory', index)" />
    </div>
  </div>
</template>

<style scoped></style>
