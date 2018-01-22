// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
// 引入自己的模块
import App from './App'
import router from './router'
// 引入vue相关的插件
import vuex from "vuex"
import elementUI from "element-ui"
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(elementUI)
Vue.use(vuex);





//引入vue无关的插件
import axios from "axios"
Vue.prototype.$http=axios;
import api from "./js/api-config"
Vue.prototype.$api=api
//配置后所有的请求都会使用这个域名
axios.defaults.baseURL = 'http://localhost:8899'

//浏览器有个安全机制，如果是跨域请求，是不会把本地cookie带过去的
axios.defaults.withCredentials = true

//倒入自己的过滤器插件
import MyFilter from "./filter";
Vue.use(MyFilter);




//引入自己的全局样式
import '../css/style.css'
import "./less/index.less"
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store:new vuex.Store({
    state: {
      shopping:JSON.parse(localStorage.getItem("total")) || {},
    },
    getters: {
      total(state){
        return Object.values(state.shopping).reduce((sum,v)=>sum+v,0)
      },
      getShoppingID(state){
        return Object.keys(state.shopping).join(",");
      }
    },
    mutations:{
      updateNum(state,{id,count}){
        Vue.set(state.shopping,id,count);
        localStorage.setItem("total",JSON.stringify(state.shopping))
      },
      //删除商品
      delProduct(state,id){
        Vue.delete(state.shopping,id);
        localStorage.setItem("total",JSON.stringify(state.shopping))
      }
    }
  })
})
