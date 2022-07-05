1.分页器功能的实现
    电商平台同时展示的数据有很多，采用分页功能
    ElementUI是有相应的分页组件，使用起来超级简单，但是前台项目目前不用【掌握自定义分页功能】

2.分页器展示，需要哪些数据（条件）？
    pageNo：当前页数
    pageSize：每一个需要战术多少数据
    totle：分页连续页码个数
    continues:分页器连续页码的个数5｜7（奇数）对称好看
    举例子：每一页３条数据，一共９１个数据，有３１页

３.父传子
    自定义分页器，开发时先自己传递假数据进行调试，调试成功用服务器数据
    对于分页器而言，很重要的是【算出连续页面起始数字和结束数字】
    当前页是8
    6 7   8   9 10
    
bug:第十页请求404；当前页为14上一页直接跳到1

4.开发某一产品详情页面
    1.静态组件（详情页的组件，还没有注册为路由组件）Detail/index.vue
        当点击商品的图片时，跳转到详情页面，在路由跳转的时候需要带上产品的ID给详情页面--router/routes.js  path:'/detail/:skuid',
        点击时页面在顶部(滚动条)-router/index.js
                scrollBehavior(to, from, savedPosition) {
                     // 始终滚动到顶部,vue3用top:0,vue2用y:0
                     return { y: 0 }
                            },

    2.请求接口，获取商品详情接口，url: /api/item/{ skuId }  api/index.js

    3.vuex-->获取产品详情信息
    vuex需要一个新模块detail,需要到大仓库中进行合并
    detail/indec.js 和Detail/index.vue

