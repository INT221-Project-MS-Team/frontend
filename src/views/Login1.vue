<script setup>
import SmButton from '@/components/SmButton.vue';
</script>
 
<template>
    <div class="bg-home w-screen h-screen bg-no-repeat bg-cover bg-center flex items-center">
        <div class="container mx-auto px-4 pt-16">
            <div class="flex flex-wrap-reverse justify-center items-center gap-3">
                <!-- <img class="m-4 mr-10 hidden ig bounce-2 object-cover 2 sm:w-3/12 lg:w-3/12 md:w-3/12 xs:hidden md:block rounded-lg drop-shadow-2xl"
                    src="@/@/public/images/account.png" alt="element-home" /> -->
                <div class="m-14 flex flex-col gap-4">
                    <!-- <div class="bg-white/50 rounded-3xl h-full w-full lg:min-w-full flex flex-col shadow-lg p-2"> -->
                    <div class="bg-white/50 rounded-3xl h-full  w-screen  flex flex-col shadow-lg p-2">
                        
                        <p
                            class="text-center p-10 text-2xl sm:text-5xl md:text-5xl lg:text-5xl text-gray-800 font-black uppercase tracking-widest">
                            Login
                        </p>


                        <div class="flex flex-col p-10 justify-center items-center">
                            <!-- <div class="text-sm md:text-base lg:text-xl text-center text-gray-900">
                            Reserve Information
                        </div> -->
                            <!-- <form @submit.prevent="$emit('next', reserverInformation)" class="w-8/12 mt-10"> -->

                            <div class="relative z-0 w-full mb-6 group">
                                <input type="email" name="floating_email"
                                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-100 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder=" " required="" />
                                <label for="floating_email"
                                    class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email
                                </label>
                            </div>
                            <div class="relative z-0 w-full group">
                                <input type="text"
                                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-100 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder=" " />
                                <label
                                    class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                            </div>
                        </div>
                        <div class="flex gap-2 mb-6 justify-center">
                            <SmButton type="submit" text="Cancle" />
                            <button type="submit">
                                <SmButton btnType="secondary" text="Login" />
                            </button>
                        </div>
                        <div class="text-center text-sm">Have an account ? ->
                            <span class="text-blue-700 underline">
                                <router-link :to="{ name: 'home' }">
                                    Sign in</router-link>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
 
<style>
</style>