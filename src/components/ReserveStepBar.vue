<script setup>
import { CollectionIcon } from '@heroicons/vue/outline';
const props = defineProps({
  step: {
    type: Number,
    default: 1,
  },
});
</script>

<template>
  <div class="min-w-full py-6">
    <div class="flex">
      <div class="w-1/3">
        <div class="relative mb-2">
          <div
            class="w-10 h-10 mx-auto bg-clinic-blue-300 rounded-full text-lg flex items-center"
            :class="
              step >= 1
                ? ['bg-clinic-blue-300', ' text-white']
                : ['border-2', 'bg-white', 'text-gray-300']
            "
          >
            <span class="text-center w-full">
              <CollectionIcon class="w-6/12 mx-auto" />
            </span>
          </div>
        </div>

        <div
          class="text-xs text-center md:text-base"
          :class="step === 1 ? [' text-gray-500'] : ['text-gray-300']"
        >
          Select Category
        </div>
      </div>

      <div class="w-1/3">
        <div class="relative mb-2">
          <div
            class="absolute flex align-center items-center align-middle content-center"
            style="
              width: calc(100% - 2.5rem - 1rem);
              top: 50%;
              transform: translate(-50%, -50%);
            "
          >
            <div
              class="w-full bg-gray-200 rounded items-center align-middle align-center flex-1"
            >
              <div
                class="w-0 bg-clinic-blue-300 py-1 rounded"
                :style="step >= 2 ? 'width: 100%' : 'width: 0%'"
              ></div>
            </div>
          </div>

          <div
            class="w-10 h-10 mx-auto rounded-full text-lg flex items-center"
            :class="
              step >= 2
                ? ['bg-clinic-blue-300', ' text-white']
                : ['border-2', 'bg-white', 'text-gray-300']
            "
          >
            <span class="text-center w-full">
              <svg
                class="w-full fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path
                  class="heroicon-ui"
                  d="M19 10h2a1 1 0 0 1 0 2h-2v2a1 1 0 0 1-2 0v-2h-2a1 1 0 0 1 0-2h2V8a1 1 0 0 1 2 0v2zM9 12A5 5 0 1 1 9 2a5 5 0 0 1 0 10zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm8 11a1 1 0 0 1-2 0v-2a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3v2a1 1 0 0 1-2 0v-2a5 5 0 0 1 5-5h5a5 5 0 0 1 5 5v2z"
                />
              </svg>
            </span>
          </div>
        </div>

        <div
          class="text-xs text-center md:text-base"
          :class="step == 2 ? [' text-gray-500'] : ['text-gray-300']"
        >
          Fill Form
        </div>
      </div>

      <div class="w-1/3">
        <div class="relative mb-2">
          <div
            class="absolute flex align-center items-center align-middle content-center"
            style="
              width: calc(100% - 2.5rem - 1rem);
              top: 50%;
              transform: translate(-50%, -50%);
            "
          >
            <div
              class="w-full bg-gray-200 rounded items-center align-middle align-center flex-1"
            >
              <div
                class="w-0 bg-clinic-blue-300 py-1 rounded"
                :style="step >= 3 ? 'width: 100%' : 'width: 0%'"
              ></div>
            </div>
          </div>

          <div
            class="w-10 h-10 mx-auto rounded-full text-lg flex items-center"
            :class="
              step >= 3
                ? ['bg-clinic-blue-300', ' text-white']
                : ['border-2', 'bg-white', 'text-gray-300']
            "
          >
            <span class="text-center w-full">
              <svg
                class="w-full fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path
                  class="heroicon-ui"
                  d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-2.3-8.7l1.3 1.29 3.3-3.3a1 1 0 0 1 1.4 1.42l-4 4a1 1 0 0 1-1.4 0l-2-2a1 1 0 0 1 1.4-1.42z"
                />
              </svg>
            </span>
          </div>
        </div>

        <div
          class="text-xs text-center md:text-base"
          :class="step == 3 ? [' text-gray-500'] : ['text-gray-300']"
        >
          Finished
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
