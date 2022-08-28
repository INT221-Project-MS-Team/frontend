<script setup>
import SmButton from '@/components/SmButton.vue';
</script>
 
<template>
    <div class="bg-home w-screen h-screen bg-no-repeat bg-cover bg-center flex items-center">
        <div class="container mx-auto justify-center items-center px-4">

            <div
                class="flex flex-wrap-reverse justify-center items-center w-10/12 mx-auto gap-3 bg-white/90 rounded-lg border shadow-md md:flex-row md:max-w-fit  dark:border-gray-700 dark:bg-gray-800 ">
                <img class="m-4 mr-10 hidden object-cover 2 sm:w-3/12 lg:w-3/12 md:w-3/12 xs:hidden md:block rounded-lg drop-shadow-2xl"
                    src="/images/logo-color.png" alt="element-home" />

                <div class="m-14 flex flex-col gap-4">
                    <div class="flex flex-col items-center">

                        <div class="flex flex-col pt-10 justify-center items-center">
                            <div class="text-3xl font-bold md:text-4xl lg:text-4xl text-center mb-10 text-gray-900">
                                SIGN IN
                            </div>
                            <!-- <form @submit.prevent="$emit('next', reserverInformation)" class="w-8/12 mt-10"> -->

                            <div class="relative z-0 w-full mb-6 group">
                                <input type="email" name="floating_email"
                                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder=" " required="" />
                                <label for="floating_email"
                                    class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email
                                </label>
                            </div>
                            <div class="relative z-0 w-full group">
                                <input type="text"
                                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder=" " />
                                <label
                                    class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                            </div>
                            <button type="button"
                                class=" mt-5 text-white justify-center w-full text-sm bg-clinic-blue-300 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded  px-5 py-2.5 inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Sign in
                                <svg aria-hidden="true" class="ml-2 w-5 h-5 " fill="currentColor" viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                        clip-rule="evenodd"></path>
                                </svg>
                            </button>
                        </div>
                        <div class="flex gap-2 mt-6 mb-6 w-full justify-center">

                            <div class="text-center text-sm">Don't have an account ?
                                <span class="text-blue-700 underline">
                                    <router-link :to="{ name: 'home' }">
                                        Sign Up</router-link>
                                </span>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>
 
<style>
.ig {
    animation-duration: 2s;
    animation-iteration-count: infinite;
    transform-origin: bottom;
}

.bounce-2 {
    animation-name: bounce-2;
    animation-timing-function: ease;
}

@keyframes bounce-2 {
    0% {
        transform: translateY(0);
    }

    25% {
        transform: translateY(-5);
    }

    50% {
        transform: translateY(-10px);
    }

    75% {
        transform: translateY(-5);
    }

    100% {
        transform: translateY(0);
    }
}
</style>