// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

//引入静态资源
import './assets/css/reset.css'
//引入ui响应式
import 'element-ui/lib/theme-chalk/display.css';
ElementUI.Dialog.props.lockScroll.default = false;
//引入element-ui库
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);


// 画布
import VueCanvasPoster from "vue-canvas-poster";
// 注册组件库
Vue.use(VueCanvasPoster);

//引入excel导出功能
import JsonExcel from 'vue-json-excel'
Vue.component('downloadExcel', JsonExcel)
//引入axios
import axios from 'axios'
//引入仓库
import store from './store/index'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
axios.interceptors.request.use(
    config => {
  //      console.log(localStorage.getItem('token'))
      if (localStorage.getItem('token')) {
        config.headers.Authorization = localStorage.getItem('token');
      }
  //      console.log(config)
      return config;
    },
    error => {
      return Promise.reject(error);
    });
