import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)



// 引入组件
import Login from "../components/login/Login.vue"
import Store from "../components/store/Store.vue"
//引入store子组件
import Goodsdetail from "../components/store/goods/Detail.vue"
import Goodslist from "../components/store/goods/List.vue"
import Shopcart from "../components/store/shopcart/Shopcart.vue"
import Ordercommit from "../components/store/order/Commit.vue"
import Orderpay from "../components/store/order/Pay.vue"



var router=new Router({
  routes:[
    {name:"login",path:"/login",component:Login},
    {path:"/",component:Store,children:[
      {name:"goodsList",path:"goodsList",component:Goodslist},
      {name:"goodsDetail",path:"goodsDetail/:id",component:Goodsdetail},
      {name:"shopCart",path:"shopCart",component:Shopcart},
      {name:"orderCommit",path:"orderCommit/:ids",component:Ordercommit},
      {name:"orderPay",path:"orderPay",component:Orderpay},
    ]}
  ]
})

//引入路由守卫
import beforeE from "./beforeEach";
router.beforeEach(beforeE);


export default router;
