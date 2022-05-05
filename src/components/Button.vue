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
  primary: ['bg-white', 'text-clinic-blue-300', 'hover:bg-gray-100', 'border-white'],
  secondary: ['bg-transparent', 'text-white', 'hover:bg-white', 'hover:text-clinic-blue-300'],
};
</script>

<template>
  <div>
    <button
      type="button"
      class="font-bold border-2 focus:outline-none rounded-3xl text-base xs:text-base sm:text-base md:text-xl lg:text-xl px-10 py-3 text-center mr-2 mb-2 "
      :class="[btnTypes[btnType]]"
    >
      {{ text }}
    </button>
  </div>
</template>

<style scoped></style>
