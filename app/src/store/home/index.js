// 完成TypeNav三级联动展示数据业务
import { reqCategoryList, reqGetBannerList,reqGetFloorList } from "@/api";
// home模块的小仓库
const state={
    // state中数据默认初始值别瞎写,服务器返回对象,服务器返回数组[根据接口返回值初始化]
    categoryList:[],
    bannerList:[],
    floorList:[],
};

// mutation:修改state的唯一手段
const mutations={
        CATEGORYLIST(state,categoryList){
            state.categoryList=categoryList
        },
        GETBANNERLIST(state,getBannerList){
            state.bannerList=getBannerList
            // console.log('4.修改仓库中banner的数据');
        },
        GETFLOORLIST(state,getFloorList){
            state.floorList=getFloorList
        }
};
// action:处理action.可以书写自己业务逻辑,也可异步
const actions={
    async categoryList({commit}){
        let res= await reqCategoryList();
            if(res.code==200){
                // 书写业务逻辑.但是不能修改state
                commit('CATEGORYLIST',res.data)
            } 
            // 设置数组长度
            state.categoryList.length=16
    },
// mock-banner
    async getBannerList({commit}){
        // console.log('2.向服务器发起Ajax请求 获取轮播图的数据');
        let resb=await reqGetBannerList();
        if(resb.code==200){
            commit('GETBANNERLIST',resb.data)
        } 
    },
    // mock-floor
    async getFloorList({commit}){
        let resf=await reqGetFloorList();
        if(resf.code==200){
            commit('GETFLOORLIST',resf.data)
        } 
    }
};
// getters:理解为计算属性,用于简化仓库数据,让组件获取仓库的数据更加方便
const getters={};

export default {
    state,
    mutations,
    actions,
    getters
}