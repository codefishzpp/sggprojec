import { reqGetSearchInfo } from '@/api'
// search仓库
const state = {
    searchList: {}
};
// mutation:修改state的唯一手段
const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList;
    }
};
// action:处理action.可以书写自己业务逻辑,也可异步
const actions = {
    // 获取search模块数据
    async getSearchList({ commit }, params = {}) {
        // 当前reqGetSearchInfo这个函数调用获取服务器数据的时候，至少传递一个参数（空对象）
        // params参数：是当用户派发action的时候，第二个参数传递过来的，至少是一个空对象
        let result = await reqGetSearchInfo(params);
        if (result.code == 200) {
            commit('GETSEARCHLIST', result.data)
            // console.log(result);
        }
    }
};
// getters:理解为计算属性,用于简化仓库数据,让组件获取仓库的数据更加方便
const getters = {
    // 当前形参state，不等于大仓内的state
    goodsList(state){
        return state.searchList.goodsList;
    },
    attrsList(state){
        return state.searchList.attrsList;
    },
    trademarkList(state){
        return state.searchList.trademarkList;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}