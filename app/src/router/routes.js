// 引入路由组件
import Home from '@/pages/Home/index.vue'
import Login from '@/pages/Login/index.vue'
import Register from '@/pages/Register/index.vue'
import Search from '@/pages/Search/index.vue'
import Detail from '@/pages/Detail'

export default [
    {
        path:'/home',
        component:Home,
        meta:{
            show:true
        } 
    },
    {
        path:'/login',
        component:Login,
        meta:{
            show:false
        }
    }, {
        path:'/register',
        component:Register,
        meta:{
            show:false
        }
    },
    {
        path:'/search/:keyword?',
        component:Search,
        meta:{
            show:true
        },
        name:"search",
        // 路由组件能不能传递props数据
        // 布尔值写法:params参数(只能传这个参数)
        //  props:true,

        // 对象写法,额外给路由组件传递一些props
        // props:{a:1,b:2},
        // 函数写法
        props:($route)=>{
            return {
                keyword:$route.params.keyword,k:$route.query.k
            }
        }
       
    },
    {
        path:'/detail/:skuid',
        component:Detail,
        meta:{
            show:true
        }
    },
    // 重定向：在项目跑起来的时候，访问/立马让他定向到首页
    {
        path:'*',
        redirect:'/home'
    }
   
]