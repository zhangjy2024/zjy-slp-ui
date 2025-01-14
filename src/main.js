import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { Container, Aside, Main } from 'element-ui';

import './permission'

Vue.component(Container.name, Container);
Vue.component('el-aside', Aside);    // 自定义组件名
Vue.component(Main.name, Main);

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  render: h => h(App),
})