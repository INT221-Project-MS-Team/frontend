import { createApp } from 'vue';
import { createPinia } from 'pinia'

// flowbite
import './index.css';
import 'flowbite';

import App from '@/App.vue';

// vue router
import router from '@/routers';

// sweetalert
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const app = createApp(App);

app.use(createPinia())
app.use(VueSweetalert2);
app.use(router);
app.mount('#app');
