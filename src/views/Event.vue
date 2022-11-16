<script setup>
import NoEvent from '@/components/NoEvent.vue';
import SmButton from '@/components/SmButton.vue';
import {
  getDate,
  getTime,
  convertDateTimeToISOString,
  validateFutureTime,
  isOverlapTime,
  getInputDate,
  getInputTime,
} from '@/utils';
import { useRoute, useRouter } from 'vue-router';
import { ref } from '@vue/reactivity';
import { computed, inject, onBeforeMount } from '@vue/runtime-core';
import Divider from '@/components/Divider.vue';
import Button from '@/components/Button.vue';
import {
  ArrowRightIcon,
  PencilIcon,
  PaperClipIcon,
} from '@heroicons/vue/outline';
import { useStatusStore } from '../store/status';

const swal = inject('$swal');
const router = useRouter();
const route = useRoute();
const storeStatus = useStatusStore();

// config
const dateInputFormatter = ref({
  date: 'DD/MM/YYYY',
  month: 'MMM',
});

//refs & computes
const eventId = ref('');
const eventData = ref(null);
const isEditing = ref(false);
const schedulesData = ref([]);

const editingEventDate = ref('');
const editingEventTime = ref('');
const editingEventNotes = ref('');
const accept_file = ref(null);
const tempFile = ref(null);
const isEditingFile = ref(false);
const fileResponse = ref(null);

const isAdmin = computed(() => storeStatus.loggedInUser?.role === 'ADMIN');
const isLecturer = computed(
  () => storeStatus.loggedInUser?.role === 'LECTURER'
);
const isStudent = computed(() => storeStatus.loggedInUser?.role === 'STUDENT');
const isLoggedIn = computed(() => storeStatus.isLoggedIn);

const getDownloadUrl = (downloadUrl) => {
  return (
    import.meta.env.VITE_SERVER_URL + `/api/upload-file/files/${downloadUrl}`
  );
};

//event methods
const getEventData = async () => {
  const response = await fetch(
    import.meta.env.VITE_SERVER_URL + `/api/events/${eventId.value}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
      },
    }
  );
  if (response.status == 200) {
    const data = await response.json();
    eventData.value = data;
    editingEventDate.value = getInputDate(data.eventStartTime);
    editingEventTime.value = getInputTime(data.eventStartTime);
    console.log(eventData.value);
  } else if (response.status === 401) {
    swal.fire({
      title: 'Error!',
      text: 'You are not Signed in',
      icon: 'error',
      showConfirmButton: false,
      timer: 1500,
    });
    router.push({ name: 'sign-in' });
  } else if (response.status === 403) {
    swal.fire({
      title: 'Error!',
      text: 'Access Denied',
      icon: 'error',
      confirmButtonText: 'OK',
    });
    router.push({ name: 'home' });
  } else {
    console.log('error');
  }
};

const deleteEvent = async () => {
  await swal({
    title: '<p class="text-lg">Are you sure to <b>cancel</b> this event ?</p>',
    text: "You won't be able to revert this!",
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#5f72ff',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Confirm',
    cancelButtonText: 'No',
  }).then(async (result) => {
    if (result.isConfirmed) {
      const response = await fetch(
        import.meta.env.VITE_SERVER_URL + `/api/events/${eventId.value}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('access_token'),
          },
        }
      );
      if (response.status === 200) {
        swal({
          title: '<p class="text-lg">Success</p>',
          text: 'Event has been canceled',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
        });
        router.push({ name: 'schedules' });
      } else if (response.status === 401) {
        swal.fire({
          title: 'Error!',
          text: 'You are not Signed in',
          icon: 'error',
          showConfirmButton: false,
          timer: 1500,
        });
        router.push({ name: 'sign-in' });
      } else if (response.status === 403) {
        swal.fire({
          title: 'Error!',
          text: 'Access Denied',
          icon: 'error',
          confirmButtonText: 'OK',
        });
        router.push({ name: 'home' });
      } else {
        swal({
          title: 'Failure',
          text: 'Something went wrong',
          icon: 'error',
          showConfirmButton: false,
          timer: 1500,
        });
        console.log('error,cannot delete');
      }
    }
  });
};

const updateEvent = async () => {
  await swal({
    title: '<p class="text-lg">Are you sure to <b>Update</b> this event ?</p>',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#5f72ff',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Confirm',
    cancelButtonText: 'No',
  }).then(async (result) => {
    if (result.isConfirmed) {
      await getSchedulesData();

      // upload file if file is not null
      await uploadFile();

      let body = {
        id: eventId.value,
        eventStartTime: undefined,
        eventNotes: undefined,
        eventDuration: eventData.value.eventDuration,
        eventCategoryId: eventData.value.eventCategory.id,
        fileId: fileResponse.value?.id,
      };

      if (editingEventDate.value != '' && editingEventTime.value != '') {
        body.eventStartTime = convertDateTimeToISOString(
          editingEventDate.value,
          editingEventTime.value
        );
        if (!validateFutureTime(body.eventStartTime)) {
          swal('Error', 'Cannot reserve in past time', 'error');
          return;
        }
      }

      if (editingEventNotes.value !== '') {
        body.eventNotes = editingEventNotes.value;
      }

      if (isOverlapTime(body, schedulesData.value)) {
        swal(
          'Error',
          'Cannot reserve time that overlaps with other events',
          'error'
        );
        return;
      }

      // remove all un using field
      body.eventCategoryId = undefined;
      body.eventDuration = undefined;
      body.id = undefined;

      console.log(body);

      const response = await fetch(
        import.meta.env.VITE_SERVER_URL + `/api/events/${eventId.value}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('access_token'),
          },
          body: JSON.stringify(body),
        }
      );
      if (response.status === 200) {
        swal({
          title: 'Success',
          text: 'Event has been updated',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
        });
        cancelEdit();
        getEventData();
      } else if (response.status === 401) {
        swal.fire({
          title: 'Error!',
          text: 'You are not Signed in',
          icon: 'error',
          showConfirmButton: false,
          timer: 1500,
        });
        router.push({ name: 'sign-in' });
      } else if (response.status === 403) {
        swal
          .fire({
            title: 'Error!',
            text: 'Access Denied',
            icon: 'error',
            confirmButtonText: 'OK',
          })
          .then((result) => {
            if (result.isConfirmed) {
              router.push(-1);
            }
          });
      } else {
        swal({
          title: 'Failure',
          text: 'Something went wrong',
          icon: 'error',
          showConfirmButton: false,
          timer: 1500,
        });
        console.log('error,cannot update');
      }
    }
  });
};

const editEvent = () => {
  isEditing.value = true;
  editingEventNotes.value = eventData.value.eventNotes;
};

const cancelEdit = () => {
  isEditing.value = false;
  isEditingFile.value = false;
  editingEventDate.value = '';
  editingEventTime.value = '';
  editingEventNotes.value = '';
  accept_file.value = null;
  tempFile.value = null;
  fileResponse.value = null;
};

const getSchedulesData = async () => {
  const response = await fetch(
    import.meta.env.VITE_SERVER_URL + `/api/events`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
      },
    }
  );
  console.log(response.status);
  if (response.status === 200) {
    const data = await response.json();
    schedulesData.value = data;
    console.log(data);
  } else if (response.status === 401) {
    swal.fire({
      title: 'Error!',
      text: 'You are not Signed in',
      icon: 'error',
      showConfirmButton: false,
      timer: 1500,
    });
    router.push({ name: 'sign-in' });
  } else if (response.status === 403) {
    swal
      .fire({
        title: 'Error!',
        text: 'Access Denied',
        icon: 'error',
        confirmButtonText: 'OK',
      })
      .then((result) => {
        if (result.isConfirmed) {
          router.push(-1);
        }
      });
  } else {
    console.log('Fetch Scheduled events Error');
  }
};

const validateFileSize = async () => {
  console.log('bf tempFile', tempFile?.value?.files);
  console.log('bf current accept File', accept_file?.value?.files);
  try {
    const size = tempFile.value.files[0].size;
    if (size > 1024 * 1024 * 10) {
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'File size must be less than 10MB please select another file',
      });
      throw new Error(
        'File size must be less than 10MB please select another file'
      );
    }

    const original = tempFile.value.files[0];
    const clone = new File([original], original.name, {
      type: original.type,
      lastModified: original.lastModified,
    });

    console.log(clone);
    accept_file.value = clone;
  } catch (e) {
    console.log(e);
  }
  console.log('at tempFile', tempFile.value?.files);
  console.log('at current accept File', accept_file.value);
};

const uploadFile = async () => {
  if (!accept_file.value) return;
  //Upload to server
  const formData = new FormData();
  formData.append('file', accept_file.value);
  const response = await fetch(
    import.meta.env.VITE_SERVER_URL + '/api/upload-file',
    {
      method: 'POST',
      body: formData,
    }
  );
  if (response.status === 201) {
    const data = await response.json();
    fileResponse.value = data;
    return data;
  } else {
    swal.fire({
      title: 'Error!',
      text: 'File Upload Failed',
      icon: 'error',
      confirmButtonText: 'Confirm',
    });
    fileResponse.value = null;
    console.log('Upload file error');
    return null;
  }
};

const deleteFile = async () => {
  await swal({
    title:
      '<p class="text-lg">Are you sure to <b>delete file</b> from this event ?</p>',
    text: "Your file will permanently deleted from server and can't be recovered",
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#5f72ff',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Confirm',
    cancelButtonText: 'No',
  }).then(async (result) => {
    if (result.isConfirmed) {
      const response = await fetch(
        import.meta.env.VITE_SERVER_URL + `/api/events/${eventId.value}/file`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('access_token'),
          },
        }
      );
      if (response.status === 200) {
        swal({
          title: 'Success',
          text: 'Event has been updated',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
        });
        cancelEdit();
        getEventData();
      } else if (response.status === 401) {
        swal.fire({
          title: 'Error!',
          text: 'You are not Signed in',
          icon: 'error',
          showConfirmButton: false,
          timer: 1500,
        });
        router.push({ name: 'sign-in' });
      } else if (response.status === 403) {
        swal
          .fire({
            title: 'Error!',
            text: 'Access Denied',
            icon: 'error',
            confirmButtonText: 'OK',
          })
          .then((result) => {
            if (result.isConfirmed) {
              router.push(-1);
            }
          });
      } else {
        swal({
          title: 'Failure',
          text: 'Something went wrong',
          icon: 'error',
          showConfirmButton: false,
          timer: 1500,
        });
        console.log('error,cannot update');
      }
    }
  });
};

// route
const gotoHome = () => {
  router.push({ name: 'home' });
};

const gotoschedules = () => {
  router.push({ name: 'schedules' });
};

// hooks
onBeforeMount(async () => {
  if (!route.query?.id) {
    gotoHome();
  }
  eventId.value = route.query.id;
  await getEventData();
});
</script>

<template>
  <div
    class="bg-schedules w-screen h-screen bg-no-repeat bg-cover bg-center flex flex-wrap flex-col items-center justify-center gap-2"
  >
    <!-- <p class="text-xl xs:text-xl sm:text-xl md:text-2xl lg:text-3xl text-white">
      {{ isEditing ? 'Edit Event Detail' : 'Event Detail' }}
    </p> -->
    <div
      class="bg-white rounded-3xl h-5/6 lg:h-5/6 w-11/12 lg:w-8/12 flex shadow-lg"
    >
      <!-- no event -->
      <div v-if="!eventData" class="flex flex-col items-center justify-center">
        <NoEvent />
        <SmButton text="Back" @click="gotoHome" />
      </div>

      <!-- have event -->
      <div v-else class="flex flex-row min-w-full p-5 gap-6">
        <div
          class="min-h-full bg-clinic-blue-50 w-6/12 rounded-lg flex flex-col justify-center items-center p-5 gap-2"
        >
          <p
            class="text-white text-xl xs:text-xl sm:text-xl md:text-2xl lg:text-3xl text-center uppercase"
          >
            {{ !isEditing ? 'Booking Detail' : 'Editing Detail' }}
          </p>
          <img
            class="object-cover w-10/12"
            src="/images/person.png"
            alt="cover"
          />
          <br />
          <p
            class="text-white text-xl xs:text-xl sm:text-xl md:text-2xl lg:text-3xl text-center"
          >
            Event ID : {{ eventData.id }}
          </p>
          <span v-show="isEditing" class="text-red-700 text-sm">
            Edit start time, date and note only
          </span>
        </div>
        <div class="flex flex-col overflow-auto w-full clinic-scollbar">
          <form
            @submit.prevent="updateEvent"
            class="font-normal gap-2 flex flex-col"
          >
            <!-- <div class="flex items-center justify-end">
              <PencilIcon class="w-5 h-5" />
            </div> -->
            <!-- <span
              class="text-xl xs:text-xl sm:text-xl md:text-2xl lg:text-2xl text-clinic-blue-300 mx-auto uppercase"
              >{{ !isEditing ? 'Booking Detail' : 'Editing Booking detail' }}
            </span> -->

            <Divider text="Information" />

            <span
              ><span class="text-clinic-blue-300">Booking Name: </span>
              <span :class="{ 'text-gray-400': isEditing }">
                {{ eventData.bookingName }}</span
              >
            </span>
            <span
              ><span class="text-clinic-blue-300">Email: </span>
              <span :class="{ 'text-gray-400': isEditing }">
                {{ eventData.bookingEmail }}</span
              >
            </span>

            <div class="flex flex-row items-center gap-x-2">
              <span class="text-clinic-blue-300">Date: </span>
              <span :class="{ 'text-gray-400': isEditing }">
                <!-- {{ getDate(eventData.eventStartTime) }} -->
                <input
                  type="date"
                  class="border-0 p-0"
                  placeholder=" "
                  :value="getInputDate(eventData.eventStartTime)"
                  disabled
                />
              </span>
              <ArrowRightIcon
                class="w-4 h-4 text-clinic-blue-300"
                v-if="isEditing"
              />
              <input
                v-if="isEditing"
                type="date"
                class="block py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b border-gray-100 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                :min="getInputDate(eventData.eventStartTime)"
                v-model="editingEventDate"
                :required="editingEventTime.length"
              />
            </div>

            <div class="flex flex-row items-center gap-x-2">
              <span class="text-clinic-blue-300">Start Time: </span>
              <span :class="{ 'text-gray-400': isEditing }">
                <input
                  type="time"
                  class="border-0 p-0"
                  placeholder=" "
                  :value="getTime(eventData.eventStartTime)"
                  disabled
                />
                <!-- {{ getTime(eventData.eventStartTime) }} (24-hr) -->
              </span>
              <ArrowRightIcon
                class="w-4 h-4 text-clinic-blue-300"
                v-if="isEditing"
              />
              <input
                v-if="isEditing"
                type="time"
                class="block py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b border-gray-100 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                v-model="editingEventTime"
                :required="editingEventDate.length"
              />
            </div>
            <span
              ><span class="text-clinic-blue-300">Duration: </span>
              <span :class="{ 'text-gray-400': isEditing }"
                >{{ eventData.eventDuration }} Minutes</span
              >
            </span>
            <span
              ><span class="text-clinic-blue-300">Category Name: </span>
              <span :class="{ 'text-gray-400': isEditing }">{{
                eventData.eventCategory.eventCategoryName
              }}</span>
            </span>
            <span>
              <span class="text-clinic-blue-300">Category Description: </span>
              <span :class="{ 'text-gray-400': isEditing }"
                >{{ eventData.eventCategory.eventCategoryDescription }}
              </span>
            </span>

            <span>
              <span class="text-clinic-blue-300">Note: </span>
              <span
                v-if="!isEditing"
                :class="!eventData.eventNotes ? ['text-gray-300'] : ''"
              >
                {{ eventData.eventNotes || '(blank)' }}</span
              >
              <textarea
                v-model="editingEventNotes"
                class="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-white sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                v-else
                maxlength="500"
                rows="2"
              ></textarea>
            </span>

            <!-- file -->
            <Divider text="Attachment" />
            <div id="file-section">
              <!-- show file name -->
              <span class="flex gap-2">
                <div v-if="eventData.file">
                  Current File
                  <a
                    :href="getDownloadUrl(eventData.file.fileName)"
                    class="text-blue-600 underline flex gap-2"
                  >
                    <PaperClipIcon class="w-5 h-5" />
                    {{ eventData.file.fileName }}
                  </a>
                  <div class="mt-5" v-if="isEditing">
                    <SmButton
                      text="Delete File"
                      btnType="danger"
                      @click="deleteFile"
                    />
                    <p class="text-xs text-gray-400 mt-2">
                      ** To change file: delete old file and upload new one
                    </p>
                  </div>
                </div>
                <div v-if="!eventData.file && !isEditing">
                  <p class="text-gray-300">No Attach File</p>
                </div>
              </span>

              <!-- if not have file show upload -->
              <div v-if="!eventData.file">
                <div id="file-upload" v-if="isEditing">
                  <span class="text-sm text-gray-900">
                    Current update file :
                    <span class="text-clinic-blue-200">{{
                      accept_file?.name || 'No input file'
                    }}</span>
                  </span>
                  <div class="flex justify-center items-center w-full">
                    <label
                      for="dropzone-file"
                      class="flex flex-col justify-center items-center w-full h-32 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                      <div
                        class="flex flex-col justify-center items-center pt-5 pb-6"
                      >
                        <svg
                          aria-hidden="true"
                          class="mb-3 w-10 h-10 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          ></path>
                        </svg>
                        <p
                          class="mb-2 text-sm text-gray-500 dark:text-gray-400"
                        >
                          <span class="font-semibold">Click to upload</span>
                        </p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">
                          Any file type (MAX. 10mb)
                        </p>
                        <hr />
                      </div>
                      <input
                        id="dropzone-file"
                        type="file"
                        class="hidden"
                        @change="validateFileSize"
                        ref="tempFile"
                      />
                    </label>
                  </div>
                  <p class="text-xs text-gray-400 mt-2">
                    ** To complete upload: click on save event button
                  </p>
                </div>
              </div>

              <div id="file-upload" v-if="isEditing && isEditingFile">
                <label
                  class="block mb-2 text-xs font-medium text-gray-500"
                  for="small_size"
                  >Upload/Update file</label
                >
                <p class="text-xs text-gray-9000">
                  Current update file : {{ accept_file?.name || 'No File' }}
                </p>
                <div class="flex justify-center items-center w-full">
                  <label
                    for="dropzone-file"
                    class="flex flex-col justify-center items-center w-full h-32 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <div
                      class="flex flex-col justify-center items-center pt-5 pb-6"
                    >
                      <svg
                        aria-hidden="true"
                        class="mb-3 w-10 h-10 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        ></path>
                      </svg>
                      <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span class="font-semibold">Click to upload</span>
                      </p>
                      <p class="text-xs text-gray-500 dark:text-gray-400">
                        Any file type (MAX. 10mb)
                      </p>
                      <hr />
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      class="hidden"
                      @change="validateFileSize"
                      ref="tempFile"
                    />
                  </label>
                </div>
              </div>
            </div>

            <!-- event delete -->
            <div v-if="isEditing">
              <Divider text="Danger Zone" />
              <SmButton
                text="Cancel Event"
                btnType="danger"
                @click="deleteEvent"
              />
              <!-- <div
                class="w-full mb-3 text-center item-center text-white bg-red-600 min-w-fit rounded-lg p-1 hover:bg-red-700"
                @click="deleteEvent"
              >
                Cancel Event
              </div> -->
            </div>

            <!-- page control -->
            <div>
              <Divider text="Action" />
              <div class="flex gap-2" v-if="!isEditing">
                <SmButton
                  text="← Back"
                  btnType="events"
                  @click="gotoschedules"
                />
                <SmButton
                  text="Edit Event"
                  btnType="edit"
                  @click="editEvent"
                  v-if="isLoggedIn && !isLecturer"
                />
              </div>
              <div class="flex gap-2" v-else>
                <button type="submit">
                  <SmButton text="Save" btnType="events" />
                </button>
                <SmButton text="Cancel" btnType="edit" @click="cancelEdit" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
