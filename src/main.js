import { createApp } from 'vue';
import App from './App.vue';
import router from './routers';
import './index.css';
import 'flowbite';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import LitepieDatepicker from 'litepie-datepicker';

const app = createApp(App);
app.use(VueSweetalert2);
app.use(router);
app.use(LitepieDatepicker)
app.mount('#app');
