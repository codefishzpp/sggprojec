// 大仓库
import Vue from "vue";
import Vuex from 'vuex'
// 需要使用插件一次
Vue.use(Vuex);
// state:残仓库存储数据
// 引入小仓库
import home from './home'
import search from './search'
import detail from "./detail";
// 对外暴露store类的一个实例
export default new Vuex.Store({
    // 实现vuex仓库模块式开发存储数据,小仓库变成大仓库
    modules:{
        home,
        search,
        detail
    }
})