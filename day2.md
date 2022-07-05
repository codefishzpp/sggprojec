1.编程式路由跳转到当前路由(参数不变),多次执行会抛出NaVIgationDuplicated的警告错误?
    路由跳转两种方式:编程式导航,声明式导航
    声明式导航没这类问题,因为vue-router底层已经处理好了
    1)为何编程式导航进行路由跳转的时候就有警告错误?
        "vue-router":"3.5.3"最新的vue-router引入promise

    2)通过给push方法传递相应的成功.失败的回调函数,可以捕获当前错误,可以解决

    3)通过底部的代码,可以实现解决错误
    this.$router.push({name:"search",params:{keyword:this.keyword},query:{k:this.keyword.toUpperCase()}},()=>{},(error)=>{console.log(error);})
    这个方法治标不治本,将来在别的组件中push|replace,编程式导航还是有类似错误

    4)第十集没看
    this:当前组件实例(search)
    this.router属性:当前这个属性的属性值为VueRouter

2.Home模块组件拆分
    --静态页面完成
    --拆分出静态组件
    --获取服务器的数据展示
    --动态业务
    拆分组件：结构+样式+图片资源

3.三级联动组件完成
    --由于三级联动,在Home,Search,Detail,把三级联动注册为全局组件
    好处:只需注册一次,就可以在项目任何地方使用
    步骤:1)在main.js内注册
            // 三级联动组件--全局组件
            import TypeNav from '@/components/TypeNav';
            // 第一个参数:全局组件的名字;第二个参数:哪一个组件
            Vue.component(TypeNav.name,TypeNav)
        2)在TypeNav的index.vue暴露
            export default {
                name:'TypeNav',}
        3)写组件-不需要引入了
            <TypeNav/>

4.postman接口测试
    --经过测试,接口没问题
    --若服务器返回的cod字段200,代表服务器返回数据成功
    --整个项目,接口前缀都有/api字样

5.axios二次封装
    XMLHttpRequest.fetch,jq,axios
    1)为何二此封装axios
        请求拦截器:发请求之前处理一些业务
        响应拦截器:当服务器数据返回以后可以处理一些事情
    
    2)项目中的api文件夹[axios]
        接口当中:路径都带有/api
        baseURL:'/api'
    
    3)axios可参考git|NPM关于axios文档

6.接口统一管理
    项目很小:完全可以在组件的生命周期函数中发送请求
    项目很大:axios.get('xxx')

7.跨域问题
    什么是跨域:请求协议、域名、端口号不同，称之为跨域
    解决跨域方法:JSONP、CROS、代理(proxy)
    http://localhost:8080/#/home ---前端项目本地服务器
    http://39.98.123.211         ---后台服务器 
    
    proxy:
        1)在vue.config.js添加
            devServer: {
            proxy: {
                '/api': {
                target: 'http://39.98.123.211',
                // pathRewrite: { '^/api': '' },
                },
            },
            },
        2)注意:重启终端,才能生效

8.nprogress进度条的使用
    start:进度条开始
    done:进度条结束
    进度条颜色可以修改nprogress.css

9.vuex状态管理器
    1)vuex是什么
        vuex是官方提供的一个插件,状态管理器,集中式管理项目中组件共用的数据
        切记:并不是全部项目都需要vuex,项目小,完全不需要vuex;项目大,组件很多,数据很多,数据维护费劲vuex
            state
            mutations
            actions
            getters
    2)vuex基本使用

    3)vuex实现模块式开发
        项目过大,组件过多,接口也很多,数据也很多
        模拟state存储数据
        {
            count:1,
            search{a:1},
            detail:{sss},
            pay:{}
        }

10.完成TypeNav三级联动展示数据业务
    仓库使用:
    1)main.js
        // 引入仓库
        import store from './store';

    new Vue({//根组件挂载
        render: h => h(App),
        // 注册仓库:组件实例上会多一个属性$store属性
        store})

    2)TypeNav的index.vue
        import {mapState} from 'vuex'
        // 组件挂在完毕,获取数据存储于仓库中
        mounted(){
            this.$store.dispatch('categoryList')
            },
        computed:{
            ...mapState({
                //   右侧需要的是函数,当使用这个计算属性,右侧函数会立即执行一次
                // 注入一个参数state其实即为大仓库的数据
                categoryList:(state)=> 
                //   console.log(state.home)
                state.home.categoryList
            })
            },
    3)store-hone/index.js填写内容
