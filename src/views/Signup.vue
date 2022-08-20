<script setup>

</script>
 
<template>
    <div class="bg-home w-screen h-screen bg-no-repeat bg-cover bg-center flex items-center">
        <div class="container mx-auto px-4 pt-16">
            <div class="flex flex-wrap-reverse justify-center items-center gap-3">
                <img class="m-4 mr-10 hidden ig bounce-2 object-cover 2 sm:w-3/12 lg:w-3/12 md:w-3/12  md:block rounded-lg drop-shadow-2xl"
                    src="../../public/images/account.png" alt="element-home" />
                <div class="m-14 flex flex-col gap-4">
                    <p
                        class="text-center text-2xl sm:text-5xl md:text-5xl lg:text-7xl text-gray-800 font-black uppercase tracking-widest">
                        add user
                    </p>


                    <div class="flex flex-col justify-center items-center">
                        <!-- <div class="text-sm md:text-base lg:text-xl text-center text-gray-900">
                            Reserve Information
                        </div> -->
                        <!-- <form @submit.prevent="$emit('next', reserverInformation)" class="w-8/12 mt-10"> -->
                        <div class="relative z-0 w-full mb-6 group">
                            <input type="text"
                                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-100 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" " required="" maxlength="100" />
                            <label for="floating_password"
                                class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
                        </div>
                        <div class="relative z-0 w-full mb-6 group">
                            <input type="email"  name="floating_email"
                                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-100 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" " required="" />
                            <label for="floating_email"
                                class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email
                                address</label>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            </div>
</template>
 
<style>
</style>