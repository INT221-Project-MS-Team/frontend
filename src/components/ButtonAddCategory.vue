<script setup>
import { PlusCircleIcon } from '@heroicons/vue/outline'
const defineEmits= (['AddCategory'])
const props = defineProps({
  categories: {
    type: Array,
    required: true,
  },
});

</script>
 
<template>
 <button class="flex gap-2 align-middle items-center text-white bg-gradient-to-r from-blue-500 via-clinic-blue-500  
         to-clinic-blue-300 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-clinic-blue-500 
         dark:focus:ring-clinic-blue-200  dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg 
         text-sm px-5 py-2.5 text-center" @click="$emit('AddCategory', categories)">
         <PlusCircleIcon class="w-5 h-5"/>
         Add Category</button>
</template>
 
<style>

</style>