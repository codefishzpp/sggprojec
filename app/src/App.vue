<template>
  <div id="app">

    <Header></Header>
    <!--路由组件出口的地方 -->
    <router-view></router-view>
    <!-- Home、Search显示，登录注册隐藏 -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
export default {
  name: 'App',
  components: {
    Header,Footer
  }
  ,
  mounted(){
    // 派发action||获取商品分类的数据
    this.$store.dispatch('categoryList')
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
