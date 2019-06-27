import 'es6-promise/auto';
import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import App from './App.vue'
import store from './store/index'

Vue.config.productionTip = false;

Vue.use(Vuetify);

new Vue({
  store,
  render: h => h(App),
}).$mount('#app');
