<script setup>
import CategoryTable from '../components/CategoryTable.vue';
import { onBeforeMount } from '@vue/runtime-core';
import { ref } from 'vue';
import CategoryModal from '../components/CategoryModal.vue';

const categoriesData = ref([]);
const editModalShow = ref(false);
const editCategoryObj = ref({});

const getCategoriesData = async () => {
  const response = await fetch(
    import.meta.env.VITE_SERVER_URL + '/api/events-categories'
  );
  if (response.status === 200) {
    const data = await response.json();
    categoriesData.value = data;
    console.log(data);
  } else {
    console.log('Fetch Category Error');
  }
};

const editCategory = async (category) => {
  editCategoryObj.value = category;
  editModalShow.value = true;
};

const closeModal = () => {
  editModalShow.value = false;
  editCategoryObj.value = {};
};

const forceUpdate = async () => {
  await getCategoriesData();
};

onBeforeMount(async () => {
  await getCategoriesData();
});
</script>

<template>
  <div
    class="bg-schedules w-screen h-screen bg-no-repeat bg-cover bg-center flex flex-wrap flex-col items-center justify-center gap-2 rounded-lg"
  >
    <div
      class="w-10/12 h-5/6 bg-white flex shadow-md rounded-lg clinic-scollbar"
    >
      <div class="text-center md:text-lg flex flex-col lg:text-lg min-w-full">
        <span class="text-gray-600 text-2xl p-3 bg-clinic-blue-25 rounded-t-lg">
          Category List</span
        >
        <CategoryTable
          :categories="categoriesData"
          @editCategory="editCategory"
        />
        <CategoryModal
          :category="editCategoryObj"
          :isShow="editModalShow"
          @closeModal="closeModal"
          @forceUpdate="forceUpdate"
        />
      </div>
    </div>
  </div>
</template>

<style></style>
