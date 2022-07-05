// 当前这个模块:api进行统一接管
import requests from "./request";
import mockRequests from './mockAjax'

// 三级联动接口
// /api/product/getBaseCategoryList get无参数

export const reqCategoryList=()=>requests({
    url:'product/getBaseCategoryList',
    method:'get'
});

export const reqGetBannerList=()=>mockRequests.get('/banner')
export const reqGetFloorList=()=>mockRequests.get('/floor')

// 获取搜索模块数据，地址：/api/list 请求方式：post 参数：需要带参数
/*
{
  "category3Id": "61",
  "categoryName": "手机",
  "keyword": "小米",
  "order": "1:desc",
  "pageNo": 1,
  "pageSize": 10,
  "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
  "trademark": "4:小米"
}*/
export const reqGetSearchInfo=(params)=>requests({url:'/list',method:'post',data:params});

// 获取产品详情数据信息，地址：    2.请求接口，获取商品详情接口，url: /api/item/{ skuId }  api/index.js 请求方式：get 

export const reqGoodsInfo=(skuId)=>requests({url:`/item/${skuId}`,method:'get'});