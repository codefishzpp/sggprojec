import { reqGoodsInfo } from "@/api"

const state={
    goodInfo:{},
};
const mutations={
    GETGOODINFO(state,goodInfo){
        state.goodInfo=goodInfo
    }
};
const actions={

    // 获取产品信息的action
   async getGoodInfo({commit},skuId){
         let resu =await reqGoodsInfo(skuId);
         if(resu.code==200){
             commit('GETGOODINFO',resu.data)
         }
    }
};
const getters={
    categoryView(state){
        return state.goodInfo.categoryView||{};
    },
    skuInfo(state){
        return state.goodInfo.skuInfo||{};
    }, 
    skuImageList(state){
        return state.goodInfo.skuInfo.skuImageList||{};
    }, 
    // 产品售卖属性的简化
    spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList||{};
    }, 
};
export default{
    state,mutations,actions,getters
}
