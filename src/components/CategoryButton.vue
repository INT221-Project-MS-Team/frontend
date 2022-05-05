<script setup>
import { DesktopComputerIcon } from '@heroicons/vue/outline';
const props = defineProps({
  text: {
    type: String,
    default: '',
  },
  btnType: {
    type: String,
    default: 'primary',
  },
});
const btnTypes = {
  primary: [
    'bg-white',
    'text-clinic-blue-300',
    'hover:bg-clinic-blue-300',
    'hover:text-white',
  ],
  secondary: [
    'bg-clinic-blue-300',
    'text-white',
    'hover:bg-white',
    'hover:text-clinic-blue-300',
  ],
  danger: ['bg-white', 'text-red-600', 'hover:bg-red-600', 'hover:text-white'],
  events: ['bg-clinic-blue-200', 'text-white', 'hover:bg-clinic-blue-300'],
};
</script>

<template>
  <button
    type="button"
    class="font-medium rounded-lg w-full text-sm px-5 py-5 text-center shadow-xl"
    :class="[btnTypes[btnType]]"
  >
    <span class="flex items-center justify-between gap-3">
      <span>{{ text }}</span>
      <DesktopComputerIcon class="w-6 h-6 mr-2" />
    </span>
  </button>
</template>

<style scoped></style>
