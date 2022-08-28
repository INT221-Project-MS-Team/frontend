<script setup>
import { PlusCircleIcon } from '@heroicons/vue/outline'
const defineEmits= (['AddUser'])
const props = defineProps({
  users: {
    type: Array,
    required: true,
  },
});

</script>
 
<template>
<button class="flex w-full gap-2 align-middle items-center  text-clinic-blue-300 hover:bg-greay-200 font-medium 
         text-sm px-5 py-2.5 text-center" @click="$emit('AddUser', users)">
         <PlusCircleIcon class="w-5 h-5"/>
         Add User</button>
</template>
 
<style>

</style>