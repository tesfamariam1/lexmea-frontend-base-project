import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import VueQueryPlugin from './plugins/vue-query';

const app = createApp(App);
app.use(VueQueryPlugin);
app.mount('#app');
