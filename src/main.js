import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import store from '@/store';
import 'element-ui/lib/theme-chalk/index.css';
import './style/iconfont/iconfont.css'
import '@wangeditor/editor/dist/css/style.css'

import './permission'

Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
})