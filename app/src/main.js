import Vue from 'vue'
import App from './App.vue'
// 三级联动组件--全局组件
import TypeNav from '@/components/TypeNav';
import Carousel from '@/components/Carousel';
import Pagination from '@/components/Pagination';
// 第一个参数:全局组件的名字;第二个参数:哪一个组件
Vue.component(TypeNav.name,TypeNav)
Vue.component(Carousel.name,Carousel)
Vue.component(Pagination.name,Pagination)
// 引入路由 
import router from '@/router'
Vue.config.productionTip = false

// 测试
import {reqCategoryList}from '@/api'
reqCategoryList()

// 引入仓库
import store from './store';

// 引入mockServe.js--mock数据
import '@/mock/mockServe'

// 引入swiper样式
import "swiper/css/swiper.css"


new Vue({//根组件挂载
  render: h => h(App),
  // 注册路由信息，这里书写router的时候，附件身上都拥有$route,$router属性
  router,
  // 注册仓库:组件实例上会多一个属性$store属性
  store,
 
  // 配置全局事件总线$bus
beforeCreate(){
  Vue.prototype.$bus=this;
}
   
}).$mount('#app')
