import Vue from "vue";
import VueRouter from "vue-router";

import appIndex from './views/index/index'
import Goodsdetails from './views/goodsdetails/index'

import Person from './views/person/index.vue'




import User from './views/navbar/user-admin/index.vue'
import Adv from './views/navbar/advs-admin/index.vue'
import Order from './views/navbar/order-admin/index.vue'
import Goods from './views/navbar/goods-admin/index.vue'
import GoodsAdd from './views/navbar/goods-admin/add.vue'
import GoodsModifly from './views/navbar/goods-admin/modifly.vue'


Vue.use(VueRouter);

const routes = [{
        path:"/",
        component: appIndex
    },{
        path:"/user-admin",                            // 用户管理
        component: User
    },{
        path:"/advs-admin",                            // 广告管理
        component: Adv
    },{
        path:"/goods-admin",                           // 商品管理
        component: Goods
    },,{
        path:"/goods-admin/add",                       // 商品管理 - 商品添加
        component: GoodsAdd
    },{
        path:"/goods-admin/modifly",                   // 商品管理 - 商品修改
        component: GoodsModifly
    },,{
        path:"/order-admin",                     // 订单管理
        component: Order
    },
    
    
    
    
    
    {
        path:"/goodsdetails",
        component: Goodsdetails
    },{
        path:"/person",
        component: Person
    },{
        path:"/order",
        component: Order,
    }
]

var router =  new VueRouter({
    routes
})
export default router;