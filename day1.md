1.vue-cli脚手架初始化项目
    node+webpack+淘宝镜像
        node_modules文件夹：项目依赖文件夹

        public文件夹：一般放置一些静态资源（图片),注意:放在public文件夹的静态资源，webpack进行的打包的时候，会原封不动的打包到dist文件夹中

        src文件夹（程序员源代码文件夹）：
            assets文件夹：一般也是放置静态资源（一般放置多个组件共用的静态资源），注意：放置在assets文件夹；里面的静态资源，在webpack打包，会把静态资源当作一个模块，打包js文件里面

            components文件夹：一般放置的是非路由组件（全局组件）

            App.vue唯一的跟组件
        
        babel.config.js：配置文件（bable相关）

        package.json文件：认为项目的‘身份证’，记录项目叫什么，项目当中的依赖，如何运行

        package-lock.json：缓存性文件

        
        README.md：是说明性文件

2.项目的配置
    1）项目运行起来的时候，让浏览器自动打开 --package.json
      "scripts": {
            "serve": "vue-cli-service serve --open",
            "build": "vue-cli-service build",
            "lint": "vue-cli-service lint"
    
    2)eslint校验工具的关闭 --在根目录下
     创建vue.config.js文件
      module.exports = defineConfig({
                //关闭eslint
                lintOnSave:false
            })
     比如声明变量没有使用eslint校验工具报错

    3）scr文件夹简写方式，配置别名@
     在根目录下创建jsonfig.json配置别名@，【@代表src文件夹】
        
3.项目路由的分析
    前端所谓路由：key键值对
    key:url(地址栏的路径)
    value：相应的路由组件
    注意：项目上中下结构

    路由组件：Home首页路由组件，Search路由组件，login登录路由，Refister注册路由
    非路由组件：
        Hearder【首页，搜索框】
        Footer【首页，搜索框】，登录|注册页面没有

4.完成非路由组件header与Footer业务
    不以HTML，css为主，主要搞业务。逻辑
    开发项目时：
        1.书写静态页面html+css
        2.拆分组件、
        3.获取服务器的数据动态展示
        4.完成相应的动态业务逻辑

        注意1：创建组件的时候组件结构+组件样式+图片资源
        注意2：咱们的项目采用的是less，浏览器不识别less样式，需要通过less less-loader进行处理,npm install --save less less-loader@6
        注意3：如果组件识别less，需要在style标签上加lang='less'
    
    使用组件的步骤（非路由组件）
        -创建或者定义
        -引入
        -注册
        -使用

5.路由组件的搭建
    vue-router
     上面分析，路由组件有四个：Home，Search，Login,Register
     -components文件夹：经常放置非路由组件（共用全局组件）
     -pages|views文件夹：经常放置路由组件
    
    1）配置路由
        项目中配置的路由一般放置在router文件夹中

    2）路由组件和非路由组件区别
        路由组件一般放在pages|views文件夹，非路由组件一般放置components文件夹里面
        路由组件一般需要在reuter文件夹中进行注册（使用的即为组件的名字），非路由组件使用一般使用标签的形式使用
        注册完路由，不管路由组件或非路由组件身上都拥有$route,$router属性
        
        $route:一般获取路由信息【路由、query、params等等】
        $router:一般进行编程式导航进行路由跳转【push|replace】

    3)路由的跳转
        两种方式
        声明式导航router-link,可以进行路由跳转
        编程式导航push|replace,可以进行路由跳转
        区别：声明式导航能做的，编程式导航都能做；编程式导航除了路由跳转，还可进行其他的业务逻辑

6.Footer组件显示和隐藏
    显示|隐藏组件：v-for|v-show
    Footer组件：在Home、Search显示Footer组件
    Footer组件：在登录、注册时候隐藏

    1)根据组件的$route获取当前路由的信息，通过路径判断Footer显示与隐藏（不推荐）
        <Footer v-show="$route.path=='/home'||$route.path=='/search'"></Footer>
    
    2）配置理由。添加路由元信息【meta】，路由需要配置对象，key不能瞎写，胡写，乱写
     {
            path:'/register',
            component:Register,
            meta:{
                show:false
            }
     }
      <Footer v-show="$route.meta.show"></Footer>

7.路由传参
    1)路由传参的几种方式
     比如A->B
     声明式导航：router-link(务必要to属性)，实现路由跳转
     编程式导航：利用组件实例$router.push|replace方法，实现路由跳转（可以写一些自己的业务）

     2）路由传参，参数几种写法
      params参数：属于路径当中的一部分，注意：配置路由需要占位
      query参数：不属于路径的部分，类似Ajax中的queryString /home?k=v&kv=,不需要占位

    3)路由传参面试题
        q1:路由传递参数（对象写法）path是否可以结合params参数一起使用？
            a1:路由传参的时候，对象的写法可以是name,path，但path这种写法不能与params参数使用

        q2:如何指定params参数可传可不传？
          配置路由的时候，占位了（params参数），但路由跳转的时候就不传递，路径会出现问题
                http://localhost:8080/#/?k=ABC
                http://localhost:8080/#/search?k=ABC
            a2: 在占位符后面+？
                 path:'/search/:keyword?',

        q3:params参数可以传递也可以不传递，但如果传递的是空串，如何解决？
            a3:undefined解决
                params:{keyword:''||undefined}

        q4:路由组件能不能传递props数据?
        a4:(router--index.js)
        方法一:布尔值写法:params参数(只能传这个参数)
              props:true,

        方法二:对象写法,额外给路由组件传递一些props
            props:{a:1,b:2},

        方法三:函数写法
            props:($route)=>{
                return {
                    keyword:$route.params.keyword,k:$route.query.k
                }
            },
        
        (Search--index.vue)
          <div>
            <h1>params参数---{{$route.params.keyword}}---------{{keyword}}--{{a}}</h1>
            <h1>query参数---{{$route.query.k}}=={{k}}</h1>
         </div>

         export default {
                props:['keyword','k','a']
                        }