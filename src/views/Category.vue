<script setup>
import CategoryTable from '@/components/CategoryTable.vue';
import { onBeforeMount } from '@vue/runtime-core';
import { ref } from 'vue';
import CategoryModalEdit from '@/components/CategoryModalEdit.vue';
import SmButton from '@/components/SmButton.vue';
import { SearchIcon, CalendarIcon } from '@heroicons/vue/outline';
import ButtonAddCategory from '@/components/ButtonAddCategory.vue';
import CategoryModalAdd from '@/components/CategoryModalAdd.vue';
import { useStatusStore } from '../store/status';

const storeStatus = useStatusStore();
const categoriesData = ref([]);
const editModalShow = ref(false);
const addModalShow = ref(false);
const editCategoryObj = ref({});
const addCategoryObj = ref({});

const getCategoriesData = async () => {
  const response = await fetch(
    import.meta.env.VITE_SERVER_URL + '/api/events-categories',
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access_token') ?? '',
      },
    }
  );
  if (response.status === 200) {
    const data = await response.json();
    categoriesData.value = data.sort((a, b) => {
      return b.id - a.id;
    });
    console.log(data);
  } else {
    console.log('Fetch Category Error');
  }
};

const editCategory = async (category) => {
  editCategoryObj.value = category;
  editModalShow.value = true;
};

const addCategory = async (category) => {
  addCategoryObj.value = category;
  addModalShow.value = true;
};

const closeModal = () => {
  editModalShow.value = false;
  addModalShow.value = false;
  editCategoryObj.value = {};
  addCategoryObj.value = {};
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
    class="bg-schedules w-screen h-screen bg-no-repeat bg-cover bg-center flex flex-wrap flex-col items-center justify-center gap-2 rounded-xl"
  >
    <div
      class="w-7/12 h-5/6 bg-white flex shadow-md rounded-xl clinic-scollbar"
    >
      <div class="md:text-lg flex flex-col lg:text-lg min-w-full">
        <div
          class="flex justify-between flex-wrap items-center align-middle pl-5 pr-5 mt-5 rounded-t-lg mb-5"
        >
          <p class="text-gray-800 text-2xl">Category</p>
          <ButtonAddCategory
            v-if="
              storeStatus.loggedInUser?.role == 'LECTURER' ||
              storeStatus.loggedInUser?.role == 'ADMIN'
            "
            :categories="categoriesData"
            @addCategory="addCategory"
          />
          <CategoryModalAdd
            :category="addCategoryObj"
            :isShow="addModalShow"
            @closeModal="closeModal"
            @forceUpdate="forceUpdate"
          />
        </div>

        <CategoryTable
          :categories="categoriesData"
          @editCategory="editCategory"
        />
        <CategoryModalEdit
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
