import Vue from 'vue';
import App from './App.vue';
import './plugins/element.ts';
import router from './router';
import '@/framework/api';

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
