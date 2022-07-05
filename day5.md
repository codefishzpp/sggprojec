1.floor轮播图
    1）写api-index.js
        服务器发送请求
    2）三连环-store/home.js
        获取floor数据，
    3)父亲-home/index.vue 派发action的时候，得在home的index。vue的mounted内派发action
    4)父传子props --list
        书写Swiper在mounted内书写
    5）最完美的方案，解决轮播图
        watch + nextTick：数据监听，监听已有的数据变化
         $nextTick：在下次 DOM 更新(有数据后) 循环结束之后（v-for执行完毕）执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。

2.v-for可以在自定义标签上使用-Home/index。vue

3.组件通信有哪些？
    自定义属性:父子组件通信 ----props
    自定义事件：子给父通信 ----@on $emit
    全局时间总线:$Bus ---- 全能
    pubsub-js:vue当中几乎不用----全能
    插槽
    vuex

4.轮播图拆分共用组件
    某一组件很多地方都使用，把他变成全局组件，注册一次，可在任意地方使用，共用组件|非组件放components文件夹中
    1）新建文件夹Carousel、index.vue，把轮播图部分放入，
    2）在main.js里面注册全局组件
    3）在floor/banner写<Carousel/>并遍历

5.Search组件
    1）先静态页面+静态组件拆分出来
    2）发请求（api/index.js)
    3）vuex(三连环)--Search/index.js   Search/index.vue
    4）组件获取仓库数据，动态展示数据--  Search/index.vue
