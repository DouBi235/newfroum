import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import ElementUI from 'element-ui';
import Request from '../axios/api'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.use(Request)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
