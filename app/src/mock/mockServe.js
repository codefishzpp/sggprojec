// 先引入mockjs模块
import Mock from 'mockjs'
// 引json数据格式[json数据格式根本没对外暴露]
// webpack默认对外暴露:图片,json数据格式
import banner from './banner'
import floor from './floor'

// mock数据:第一个参数:'请求地址' 第二个参数:请求数据
Mock.mock('/mock/banner',{code:200,data:banner})//模拟首页大的轮播图的数据
Mock.mock('/mock/floor',{code:200,data:floor})