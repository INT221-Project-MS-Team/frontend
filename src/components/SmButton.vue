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
  primary: [
    'bg-white',
    'text-clinic-blue-300',
    'hover:bg-gray-100',
    'border-white',
  ],
  secondary: [
    'bg-clinic-blue-300',
    'text-white',
    'hover:bg-white',
    'hover:text-clinic-blue-300',
    'hover:border-clinic-blue-300',
    'border-white',
  ],
  danger: [
    'bg-white',
    'text-red-600',
    'hover:bg-red-600',
    'hover:text-white',
    'border-red-600',
    'border-2',
  ],
  events: [
    'bg-clinic-blue-200',
    'text-white',
    'hover:bg-clinic-blue-300',
    'border-clinic-blue-200',
    'hover:border-clinic-blue-300',
  ],
  edit: [
    'bg-white',
    'text-clinic-blue-300',
    'hover:bg-clinic-blue-200',
    'hover:text-white',
    'border-clinic-blue-200',
  ],
};
</script>

<template>
  <div>
    <button
      type="button"
      class="font-medium border-2 focus:outline-none rounded-lg text-sm xs:text-xs sm:text-xs md:text-sm lg:text-sm px-1.5 py-1.5 text-center"
      :class="[btnTypes[btnType]]"
    >
      {{ text }}
    </button>
  </div>
</template>

<style scoped></style>
