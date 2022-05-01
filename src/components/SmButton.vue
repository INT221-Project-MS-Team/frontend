<script setup>
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
  primary: ['bg-white', 'text-clinic-blue-300', 'hover:bg-gray-100'],
  secondary: ['bg-clinic-blue-300', 'text-white', 'hover:bg-white', 'hover:text-clinic-blue-300'],
  danger: ['bg-white','text-red', 'hover:bg-red', 'hover:text-white'],
  events: [ 'bg-clinic-blue-200', 'text-white','hover:bg-clinic-blue-300']
};
</script>

<template>
  <div>
    <button
      type="button"
      class="font-medium border-2 focus:outline-none rounded-xl text-sm px-2 py-2 text-center"
      :class="[btnTypes[btnType]]"
    >
      {{ text }}
    </button>
  </div>
</template>

<style scoped></style>
