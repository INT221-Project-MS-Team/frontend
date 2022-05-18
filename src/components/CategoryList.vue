<script setup>
import SmButton from '../components/SmButton.vue';
const props = defineProps({
    categories: {
        type: Array,
        required: true,
    },
});
</script>
 
<template>

    <tr v-for="(category, index) in categories" :key="index"
        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <th scope="col" class="px-6 py-3">
            {{ category.eventCategoryName }}
        </th>
        <th scope="col" class="px-6 py-3">
            {{ category.eventDuration }}

        </th>
        <th class="px-6 py-4" :class="!category.eventCategoryDescription ? ['text-gray-300'] : ''">
            {{ category.eventCategoryDescription || 'No Description' }}
        </th>
        <th class="px-6 py-3 text-clinic-blue-300">
            <SmButton text="Edit" btnType="edit"  />
        </th>
    </tr>
</template>
 
<style>
</style>
