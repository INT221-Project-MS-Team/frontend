<script setup>
import Button from '../components/Button.vue';
import { useRouter } from 'vue-router';
const myRouter = useRouter();
const goBack = () => myRouter.go(-1);
</script>
 
<template>
    <div
        class="bg-home w-screen h-screen bg-no-repeat bg-cover bg-center flex flex-wrap flex-col items-center justify-center gap-2">

        <div class="text-base  text-gray-600">

            <div class="container text-center text-5xl uppercase font-black text-white tracking-widest mb-8">
                about</div>
            <div class="mx-auto min-w-full container justify-center items-center ">
                <div class="text-center text-xl text-white font-medium tracking-wider mb-8">
                    We are SY-2 proud to present this project "Booking" which is part of the <br />
                    subject at the school of information technology KMUTT.<br />
                    Let's introduce ourselves. <br />

                </div>
            </div>
            <div class=" flex flex-col grid grid-cols-3 pb-10 gap-4 min-w-full container text-center">
                <div>
                    <img class="mb-3 h-90 rounded-full shadow-lg" src="../../public/images/bew.jpg" alt="bew" />
                    <div class="mt-5 mb-1 text-xl font-medium text-white dark:text-white">Buratsakorn Boonma</div>
                    <div class="text-sm text-gray-200 dark:text-gray-400">63130500074</div>
                    <a href="https://github.com/bewburats">
                        <img src="../../public/images/Github-white.png" alt="" class="justify-center items-center">
                    </a>
                </div>
                <div>
                    <img class="mb-3  rounded-full shadow-lg" src="../../public/images/tan.jpg" alt="bew" />
                    <div class="mt-5 mb-1 text-xl font-medium text-white dark:text-white">Rawis Noiwong</div>
                    <span class="text-sm text-gray-200 dark:text-gray-400">63130500100</span>
                    <a href="https://github.com/siraom15">
                        <img src="../../public/images/Github-white.png" alt="" class="justify-center items-center">
                    </a>

                </div>
                <div>
                    <img class="mb-3  rounded-full shadow-lg" src="../../public/images/aom.jpg" alt="bew" />
                    <div class="mt-5 mb-1 text-xl font-medium text-white dark:text-white">Siriwat Jaiyungyuen</div>
                    <span class="text-sm text-gray-200 dark:text-gray-400">63130500120</span>
                    <a href="https://github.com/Tttangentt">
                        <img src="../../public/images/Github-white.png" alt="" class="justify-center items-center">
                    </a>
                </div>
            </div>
        </div>
        <div class="flex flex-row">
            <Button text="< Go back !" btnType="secondary" @click="goBack" />
        </div>

    </div>

</template>
 
<style>
</style>