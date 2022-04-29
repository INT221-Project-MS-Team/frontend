import { createApp } from 'vue';
import App from './App.vue';
import router from './routers';
import './index.css';
import 'flowbite';
import LitepieDatepicker from 'litepie-datepicker';

const app = createApp(App);
app.use(LitepieDatepicker)
app.use(router);
app.mount('#app');
