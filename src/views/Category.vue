<script setup>
import CategoryTable from '@/components/CategoryTable.vue';
import { computed, onBeforeMount } from '@vue/runtime-core';
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
const isShowOnlyMyCategory = ref(false);

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

const showData = computed(() => {
  if (isShowOnlyMyCategory.value) {
    return categoriesData.value.filter((category) => {
      return (
        category.users.filter((user) => user.id == storeStatus.loggedInUser?.id)
          .length > 0
      );
    });
  } else {
    return categoriesData.value;
  }
});

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
      class="lg:w-8/12 w-10/12 h-5/6 bg-white flex shadow-md rounded-xl clinic-scollbar"
    >
      <div class="md:text-lg flex flex-col lg:text-lg min-w-full">
        <div
          class="flex justify-between flex-wrap items-center align-middle pl-5 pr-5 mt-5 rounded-t-lg mb-5"
        >
          <p class="text-gray-800 text-2xl">Category</p>

          <!-- button show only -->
          <label
            for="default-toggle"
            class="inline-flex relative items-center cursor-pointer"
          >
            <input
              type="checkbox"
              v-model="isShowOnlyMyCategory"
              value=""
              id="default-toggle"
              class="sr-only peer"
            />
            <div
              class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
            ></div>
            <span
              class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"
              >Show Only My Category</span
            >
          </label>
          <!-- end of button show only -->

          <ButtonAddCategory
            v-if="
              storeStatus.loggedInUser?.role == 'LECTURER' ||
              storeStatus.loggedInUser?.role == 'ADMIN'
            "
            :categories="categoriesData"
            @addCategory="addCategory"
          />
        </div>

        <CategoryTable
          :categories="showData"
          @editCategory="editCategory"
        />

        <CategoryModalAdd
          :category="addCategoryObj"
          :isShow="addModalShow"
          @closeModal="closeModal"
          @forceUpdate="forceUpdate"
        />

        <CategoryModalEdit
          :category="editCategoryObj"
          :isShow="editModalShow"
          @closeModal="closeModal"
          @forceUpdate="forceUpdate"
          :isOnlyView="false"
        />
      </div>
    </div>
  </div>
</template>

<style></style>
