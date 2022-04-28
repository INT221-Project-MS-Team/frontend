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
  primary: ['bg-white', 'text-clinic-blue-300', 'hover:bg-slate-100 '],
  secondary: ['bg-transparent', 'text-white', 'hover:bg-white', 'hover:text-clinic-blue-300'],
};
</script>

<template>
  <div>
    <button
      type="button"
      class="font-bold border-2 focus:outline-none rounded-3xl text-xl px-10 py-3 text-center mr-2 mb-2 "
      :class="[btnTypes[btnType]]"
    >
      {{ text }}
    </button>
  </div>
</template>

<style scoped></style>
