<script setup>
import SmButton from '@/components/SmButton.vue';
import { inject, ref } from 'vue';
import { validateEmail } from '@/utils';
import { useRoute, useRouter } from 'vue-router';
import { computed } from '@vue/reactivity';
import { Swal } from 'sweetalert2/dist/sweetalert2';

const swal = inject('$swal');

const userRoles = ref(['STUDENT', 'LECTURER', 'ADMIN']);

const router = useRouter();

const signUpData = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  role: userRoles.value[0],
});

const resetData = () => {
  signUpData.value.name = '';
  signUpData.value.email = '';
  signUpData.value.password = '';
  signUpData.value.confirmPassword = '';
  signUpData.value.role = userRoles.value[0];
};

const isPasswordMatch = computed(() => {
  if (
    signUpData.value.password === signUpData.value.confirmPassword &&
    signUpData.value.password !== ''
  ) {
    return true;
  }
  return false;
});

//create
const signup = async () => {
  // check email
  if (!validateEmail(signUpData.value.email)) {
    swal({
      title: 'Error',
      text: 'Email is invalid',
      icon: 'error',
      button: 'OK',
    });
    return;
  }
  // check password match
  if (!isPasswordMatch.value) {
    swal({
      title: 'Error',
      text: 'Password does not match',
      icon: 'error',
      button: 'OK',
    });
    return;
  }
  try {
    const response = await fetch(
      import.meta.env.VITE_SERVER_URL + '/api/users/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: signUpData.value.name.trim(),
          email: signUpData.value.email.trim(),
          password: signUpData.value.password,
          role: signUpData.value.role,
        }),
      }
    );
    if (response.status === 201) {
      swal({
        title: 'Success',
        text: 'Sign Up successfully',
        icon: 'success',
        showConfirmButton: false,
        timer: 2000,
      });
      resetData();
      router.push({ name: 'sign-in' });
    } else {
      let error = await response.json();
      console.log('Sign Up failure');
      swal('Error', error.message, 'error');
    }
  } catch (error) {
    swal('Error', error.message, 'error');
  }
};
</script>

<template>
  <div
    class="bg-home w-screen h-screen bg-no-repeat bg-cover bg-center flex items-center"
  >
    <div class="container mx-auto justify-center items-center px-4">
      <div
        class="flex flex-wrap-reverse justify-center items-center w-10/12 mx-auto gap-3 bg-white/90 rounded-lg border shadow-md md:flex-row md:max-w-fit"
      >
        <img
          class="m-4 mr-10 hidden object-cover 2 sm:w-3/12 lg:w-3/12 md:w-3/12 xs:hidden md:block rounded-lg drop-shadow-2xl"
          src="/images/calen-phone-girl.png"
          alt="element-home"
        />
        <div class="xl:mt-5 xl:mb-5 flex flex-col gap-4">
          <div class="items-center">
            <div class="xl:pl-10 pt-10 justify-center items-center">
              <div
                class="text-3xl font-bold md:text-4xl lg:text-4xl text-center mb-10 text-gray-900"
              >
                SIGN UP
              </div>
              <form @submit.prevent="signup">
                <div class="relative z-0 w-full mb-6 group">
                  <input
                    type="text"
                    name="floating_email"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                    v-model="signUpData.name"
                    autocomplete="off"
                    maxlength="100"
                  />
                  <label
                    for="floating_email"
                    class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Name
                  </label>
                </div>
                <div class="relative z-0 w-full mb-6 group">
                  <input
                    type="email"
                    name="floating_email"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                    v-model="signUpData.email"
                    autocomplete="off"
                    maxlength="50"
                  />
                  <label
                    for="floating_email"
                    class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Email
                  </label>
                </div>
                <div class="relative z-0 w-full mb-6 group">
                  <input
                    type="password"
                    name="floating_email"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                    v-model="signUpData.password"
                    autocomplete="off"
                    minlength="8"
                    maxlength="14"
                  />
                  <label
                    for="floating_email"
                    class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Password
                  </label>
                </div>
                <div class="relative z-0 w-full mb-6 group">
                  <input
                    type="password"
                    name="floating_email"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                    v-model="signUpData.confirmPassword"
                    autocomplete="off"
                    minlength="8"
                    maxlength="14"
                  />
                  <label
                    for="floating_email"
                    class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Confirm Password
                  </label>
                  <p
                    class="text-red-500 text-sm"
                    v-if="
                      !isPasswordMatch &&
                      signUpData.confirmPassword &&
                      signUpData.password
                    "
                  >
                    Password NOT Match
                  </p>
                </div>

                <div class="relative z-0 w-full mb-6 group">
                  <label for="underline_select" class="sr-only">select</label>
                  <label
                    for=""
                    class="mb-10 peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Role</label
                  >
                  <select
                    id="underline_select"
                    required
                    placeholder="please select user role"
                    v-model="signUpData.role"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  >
                    <option
                      v-for="(value, index) in userRoles"
                      :value="value"
                      :key="index"
                    >
                      {{ value }}
                    </option>
                  </select>
                </div>

                <button
                  type="submit"
                  class="mt-5 text-white justify-center w-full text-sm bg-clinic-blue-300 hover:bg-blue-800 font-medium rounded px-5 py-2.5 inline-flex items-center"
                >
                  Sign Up
                </button>
              </form>
            </div>
            <div class="flex xl:pl-10 gap-2 mt-6 mb-6 w-full justify-center">
              <div class="text-center text-sm">
                Do you have an account ?
                <span class="text-blue-700 underline">
                  <router-link :to="{ name: 'sign-in' }"> Sign In</router-link>
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
