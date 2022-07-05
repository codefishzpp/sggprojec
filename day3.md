1.完成一级分类动态添加背景颜色
    1)方法一:采用样式完成
    2)JS控制二三级商品分类的显示和隐藏
        最开始控制style的display
    3)演示卡顿现象
        正常:事件触发频繁,而且每一次的触发,回调都要去执行(若时间很短,回调函数内部有计算,可能出现浏览器卡顿)
        节流:规定间隔时间内不会触发回调,把频繁触发变为少量触发,--技能冷却
        防抖:所有触发都被取消,最后一次执行在规定时间之后才会触发,连续快速触发,只会执行一会--回城

        lodash插件:里面封装函数的防抖节流业务[闭包+延时器]
        lodash函数库对外暴露_函数
        防抖:_.debounce
            input.onput=_.debounce(function(){
                conlog.log('ajax请求')
            },1000)
        节流:_.throttle       -------闭包+延时器
    
2.三级联动节流操作
    // 引入lodash节流 import _ from 'lodash'
    // 最好引入方式按需加载
        import {throttle} from "lodash"

    // 不用箭头函数,会出现this的问题
        changeIndex:throttle(function(index){
            this.currentIndex=index
        },50),

3.三级联动组件的路由跳转与传递参数
    三级联动可以点击一级分类,二级分类,三级分类
    Home跳转Search模块,一级会把用户选中的产品(产品的名字/产品Id),在路由跳转的时候,进行传递
    路由跳转:
        声明式导航:router-link 会出现卡顿
        编程式导航:push|replace

    具体步骤index.vue--- goSearch(event)内
    this.$router.push({name:'sesarch',query:{categoryName:'xxx',category1Id:'xxx'}})

4.Search模块中是typenav商品分类菜单的过度动画
    过度动画前提:组件/元素务必要有v-for/v-show指令才可过度动画
    <transtion name='sort'>
        <div></div>
    </transtion>
        <!-- 动画开始 -->
        .sort-enter{}
        <!-- 动画结束 -->
        .soet-enter-to{}
        <!-- 动画时长 -->
        .sort-enter- active{}

5.优化商品分类三级列表
    在app中发请求[根组件mounted]执行一次

6.合并params与query参数--菜单和搜索内容结合
    <!-- header-index.vue -->
    if(this.$route.query){
        let location={name:"search",params:{keyword:this.keyword||undefined}}
        location.query=this.$route.query;
        this.$router.push(location)
    }
    <!-- TypeNav-index.vue -->
    if(this.$route.params){
        location.params=this.$route.params
       // 整理完参数
        location.query=query;
        this.$router.push(location)
    }

7.Home中的ListContainer和Footer组件
    服务器返回的接口只有商品菜单,对L和F数据服务器并没有提供
    mock数据(模拟):用mock.js
        使用步骤:1)scr下创建mock文件夹
                2)准备json数据--格式化一下,别留有空格,不然项目跑不起来(右击--格式化文档)
                3)mock需要的图片放置public中[public文件夹在打包的时候,会把相应的资源原封不动的放到dist文价夹中]
                4)创建mockServe.js通过mockjs插件实现模拟数据
                5)mockServe.js文件在入口文件(mian.js)中引入(至少执行一次,才能模拟数据)
                    import '@/mock/mockServe'


8.ListContainer 组件开发重点?
    安装Swiper插件：最新版本6，安装的是版本5
    cnpm i --save swiper@5
    轮播图：
        1）引包（Js|css)
            import Swiper from 'swiper '
                // 引入swiper样式
            import "swiper/css/swiper.css"
        2)页面中结构务必要有
        3）new Swiper实例（轮播图添加动态效果）
        
        