import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
import axios from 'axios'
import VueProgressBar from 'vue-progressbar'
import router from './router'
import store from './store'
import VueCarousel from 'vue-carousel';
import config from './config.js'

import Swal from 'sweetalert2'
window.Swal = Swal

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})
window.Toast = Toast

Vue.use(Vuelidate)
Vue.use(VueCarousel)
const options = {
  color: 'rgb(143, 255, 199)',
  failedColor: 'red',
  height: '2px'
}

Vue.use(VueProgressBar, options)

axios.defaults.baseURL = config.DEFAULT_URL.HOST_URL+'/apis/v1/'
axios.defaults.headers.common['source'] = 'api'
axios.defaults.headers.common['from'] = 'hs_app'

axios.interceptors.request.use(function(config) {
  // Do something before request is sent
 // console.log('Start Ajax Call');
  store.commit('setLoading',true)
  return config;
}, function(error) {
  // Do something with request error
  console.log('Error');
  return Promise.reject(error);
});

axios.interceptors.response.use(function(response) {
  // Do something with response data
  store.commit('setLoading',false)
  return response;
}, function(error) {
  // Do something with response error
  console.log('Error fetching the data');
  return Promise.reject(error);
});


new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
