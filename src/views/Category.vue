<script setup>
import CategoryList from '../components/CategoryList.vue';
import { onBeforeMount } from '@vue/runtime-core';
import { ref } from 'vue';

const categoriesData = ref([]);
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

onBeforeMount(async () => {
    await getCategoriesData()
})
</script>
 
<template>
    <div
        class="bg-schedules w-screen h-screen bg-no-repeat bg-cover bg-center flex flex-wrap flex-col items-center justify-center gap-2">
        <div class="w-10/12  h-4/6 bg-white overflow-auto flex relative shadow-md sm:rounded-lg clinic-scollbar">
            <div class="text-center md:text-lg flex flex-col lg:text-lg">
                <span class="text-gray-700 text-3xl p-3"> Category </span>
            <div class="flex  overflow-auto force-overflow grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 flex-col sm:rounded-lg overflow-auto clinic-scollbar p-3">
                <table class=" h-4/6 sm:rounded-lg text-sm text-left  text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Duration
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Description
                            </th>
                            <th scope="col" class="px-6 py-3">

                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <CategoryList :categories="categoriesData" />
                    </tbody>
                </table>
            </div>
            </div>


        </div>

    </div>

</template>
 
<style>
</style>
