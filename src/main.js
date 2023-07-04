import './assets/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import axios from 'axios'
import VueAxios from 'vue-axios'

import App from './App.vue'
import router from './router'

import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

axios.defaults.baseURL = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange'

const app = createApp(App)

app.use(VueAxios, axios)
app.use(createPinia())
app.use(router)
app.component('VueDatePicker', VueDatePicker);

app.mount('#app')
