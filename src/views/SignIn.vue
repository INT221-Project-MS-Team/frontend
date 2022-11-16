<script setup>
import SmButton from '@/components/SmButton.vue';
import Divider from '@/components/Divider.vue';
import { ArrowRightIcon, UserAddIcon } from '@heroicons/vue/outline';
import { inject, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStatusStore } from '@/store/status';
import AuthService from '@/msal/index';

const storeStatus = useStatusStore();
const swal = inject('$swal');
const router = useRouter();
const signInData = ref({
  email: '',
  password: '',
});

const loginWithMSAL = async () => {
  const instance = new AuthService();
  let user = await instance.loginPopup();
  if (user) {
    swal({
      title: 'Login Success',
      text: 'Welcome ' + user.idToken.preferred_username,
      icon: 'success',
      timer: 2000,
      showConfirmButton: false,
    });
    router.push({ name: 'home' });
    storeStatus.setIsLoggedIn(true);
    let myUser = {
      type: 'msal',
      email: user.idToken.preferred_username,
      id: undefined,
      name: user.idToken.name,
      role: user.idToken?.roles ? user.idToken.roles[0] : 'GUEST',
    };
    storeStatus.setLoggedInUser(myUser);
  } else {
    swal({
      title: 'Login Failed',
      text: 'Please try again',
      icon: 'error',
      timer: 2000,
      showConfirmButton: false,
    });
  }
};

const checkSignIn = async () => {
  try {
    const response = await fetch(
      import.meta.env.VITE_SERVER_URL + `/api/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signInData.value),
      }
    );
    if (response.status === 200) {
      let data = await response.json();
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);

      storeStatus.setIsLoggedIn(true);
      let myUser = {
        type: 'local',
        email: data.user.email,
        id: data.user.id,
        name: data.user.name,
        role: data.user.role,
      };

      storeStatus.setLoggedInUser(myUser);

      swal({
        title: 'Success',
        text: data.message,
        icon: 'success',
        showConfirmButton: false,
        timer: 1500,
      });
      router.push({ name: 'home' });
    } else {
      let error = await response.json();
      swal('Error', error.message, 'error');
    }
  } catch (err) {
    swal('Error', err.message, 'error');
  }
};
</script>

<template>
  <div
    class="bg-home w-screen h-screen bg-no-repeat bg-cover bg-center flex items-center"
  >
    <div class="container mx-auto justify-center items-center px-4">
      <div
        class="flex flex-wrap-reverse justify-center items-center w-10/12 mx-auto gap-3 bg-white rounded-lg border shadow-md md:flex-row md:max-w-fit"
      >
        <img
          class="m-4 mr-10 hidden object-cover 2 sm:w-3/12 lg:w-3/12 md:w-3/12 xs:hidden md:block rounded-lg drop-shadow-2xl"
          src="/images/sign-cover.png"
          alt="element-home"
        />

        <div class="m-14 flex flex-col gap-4">
          <div class="flex flex-col items-center">
            <div class="flex flex-col pt-10 justify-center items-center">
              <div
                class="text-3xl font-bold md:text-4xl lg:text-4xl text-center mb-8 text-gray-900"
              >
                SIGN IN
              </div>
              <form @submit.prevent="checkSignIn">
                <div class="relative z-0 w-full mb-6 group">
                  <input
                    type="email"
                    name="floating_email"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b border-gray-100 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                    v-model="signInData.email"
                  />
                  <label
                    for="floating_email"
                    class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >Email
                  </label>
                </div>
                <div class="relative z-0 w-full group">
                  <input
                    type="password"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b border-gray-100 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    v-model="signInData.password"
                    required
                  />
                  <label
                    class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >Password</label
                  >
                </div>
                <button
                  type="submit"
                  class="mt-5 text-white justify-center w-full text-sm bg-clinic-blue-300 hover:bg-blue-800 font-medium rounded px-5 py-2.5 inline-flex items-center"
                >
                  Sign In
                  <ArrowRightIcon class="w-5 h-5 ml-2" />
                </button>
              </form>
              <div
                class="text-sm font-bold md:sm lg:text-sm text-center mt-5 mb-5 text-gray-500"
              >
                OR
              </div>
              <a
                @click="loginWithMSAL"
                target="_blank"
                class="flex gap-2 align-middle justify-center hover:underline"
              >
                <img src="/images/msteam.webp" class="w-5 h-5" alt="" />
                <p class="text-xs">Signin with microsoft</p>
              </a>
            </div>

            <div class="flex gap-2 mt-6 w-full justify-center">
              <div class="text-center text-sm">
                Don't have an account ?
                <span class="text-blue-700 underline">
                  <router-link :to="{ name: 'sign-up' }"> Sign Up</router-link>
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
