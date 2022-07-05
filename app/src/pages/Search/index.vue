<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类的面包屑 -->
            <li class="with-x" v-if='searchParams.categoryName'>{{searchParams.categoryName}}<i @click='removeCategoryName'>×</i></li>
            <!-- 关键字的面包屑 -->
            <li class="with-x" v-if='searchParams.keyword'>{{searchParams.keyword}}<i @click='removeKeyword'>×</i></li>
             <!-- 品牌-->
            <li class="with-x" v-if='searchParams.trademark'>{{searchParams.trademark.split(':')[1]}}<i @click='removeTradeMark'>×</i></li>
            <!-- 平台售卖属性的属性值 -->
            <li class="with-x" v-for='(attrValue,index) in searchParams.props' :key='index' >{{attrValue.split(':')[1]}}<i @click='removeAttr(index)'>×</i></li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @trademarkInfo='trademarkInfo'  @attrInfo='attrInfo'/>

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{active:isOne}" @click="changeOrder('1')">
                  <a >综合<span v-show="isOne" class=' iconfont icon-arrdown ' :class="{'icon-arrdown':isAsc, 'icon-down-copy':isDesc}"></span></a>
                </li>
                <li :class="{active:isTwo}" @click="changeOrder('2')"   >
                  <a >价格<span v-show="isTwo" class='iconfont icon-arrdown' :class="{'icon-arrdown':isAsc, 'icon-down-copy':isDesc}"></span></a>
                </li>

              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- 路由跳转需要写good的id（params)参数 -->
                    <router-link :to='`/detail/${good.id}`'>
                      <img :src="good.defaultImg">
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i> {{ good.price }}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ good.title }})</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
         <Pagination　
         :pageNo='searchParams.pageNo' 
         :pageSize='searchParams.pageSize' 
         :total='total' 
         :continues='5' 
         @getPageNo='getPageNo'/>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import SearchSelector from "./SearchSelector/SearchSelector";
export default {
  name: "Search",
  props: ["keyword", "k"],
  components: {
    SearchSelector,
  },
  data() {
    return {
      searchParams: {
        // 一级分类
        category1Id: "",
        category2Id: "",
        category3Id: "",
        // 分类名字
        categoryName: "",
        // 关键字
        keyword: "",
        // 排序:初始状态应该是综合|降序
        order: "1:desc",
        // 分页器：代表当前第几页
        pageNo: 1,
        // 代表每一页展示数组
        pageSize: 10,
        // 平台售卖属性参数
        props: [],
        // 品牌
        trademark: "",
      },
    };
  },
  // ---------存在bug,自己出来结果，且只能打印一次
  beforeMount(){
  //   // 复杂写法
  // this.searchParams.category1Id=this.$route.query.category1Id,
  // this.searchParams.category2Id=this.$route.query.category2Id,
  // this.searchParams.category3Id=this.$route.query.category3Id,
  // object.assign:ES6新增的语法，合并对象
  Object.assign(this.searchParams,this.$route.query,this.$route.params);
  //  console.log(this.searchParams)
  },
  // 组件挂载完毕执行一次【仅仅只执行一次】------解决方案：监听数据变化
  mounted() {
    // 发请求之前，把searchParams参数发生变化时有数组值带给服务器
    // 先测试接口返回的数据类型
    // 传值至少是个空对象
    this.getData();
  },
  // 方法一
  // 方法二:在search.js内，getter写下面内容
  // computed:{
  //   ...mapState({
  //     goodsList:state=>state.search.searchList.goodsList
  //   })
  // }
  computed: {
    //mapGetters里面的写法：传递的数组，因为getters计算是没有划分模块的【home,search】
    ...mapGetters(["goodsList"]),
    isOne(){
      // indexOf()==-1表示没有这个数或者字符串
      return this.searchParams.order.indexOf('1')!=-1;
    },
    isTwo(){
      return this.searchParams.order.indexOf('2')!=-1;
    },
    isAsc(){
      return this.searchParams.order.indexOf('asc')!=-1;
    },
    isDesc(){
      return this.searchParams.order.indexOf('desc')!=-1
    },
    ...mapState({ 
      total:state=>state.search.searchList.total
    })
  },
  // 向服务器发请求获取search模块数据，根据参数不同，返回不同的数据进行展示
  methods: {
    getData() {
      // 把参数写data里面
      // this.$store.dispatch('getSearchList',{})
      this.$store.dispatch("getSearchList",this.searchParams);
      console.log('我成功了');
    },
    // 删除分类的名字
    removeCategoryName(){
      // 把服务器参数置空，还需要向服务器发请求
    // 带给服务器参数可有可无:若属性值为空的字符串还是会把相应的字段带给服务器
    // 但是把相应的字段变为undefined,当前这个字段不会带来服务器
      this.searchParams.categoryName=undefined,
      this.searchParams.category1Id=undefined,
      this.searchParams.category2Id=undefined,
      this.searchParams.category3Id=undefined,
      this.getData();
      if(this.$route.params){
        this.$router.push({name:'search',params:this.$route.params})
      }
      

    },
    // 删除关键字
    removeKeyword(){
      // 把keyword置空
      this.searchParams.keyword=undefined;
      // 再次发请求
      this.getData()
      // 通知兄弟组件清楚关键字
      this.$bus.$emit("clear");
      // 进行路由跳转
if(this.$route.query)
{ 
  this.$router.push({
    name:'search',query:this.$route.query
  })
}
    },
    // 删除品牌信息
    removeTradeMark(){
       this.searchParams.trademark=undefined;
      // 再次发请求
      this.getData()
    },
    // 删除品牌信息
    removeAttr(index){
      // 在index位置删除1 个  
       this.searchParams.props.splice(index,1);
      // 再次发请求
      this.getData()
    },
    // 自定义事件回调
    trademarkInfo(trademark)
    {
     this.searchParams.trademark=`${trademark.tmId}:${trademark.tmName}`
    //  再次发送请求
    this.getData();
    },
    // 自定义事件的回调
    attrInfo(attr,attrValue){
      let props=`${attr.attrId}:${attrValue}:${attr.attrName}`
      // 数组去重
      if(this.searchParams.props.indexOf(props)==-1)
      this.searchParams.props.push(props);
      // 再次发起Ajax请求
      this.getData();
    },
    // 排序的操作
  changeOrder(flag){
    // flag形参，是一个标志，代表用户点击的是综合1还是价格2[用户点击的时候传递进来的]
    let originOrder=this.searchParams.order;
    let originFlag=this.searchParams.order.split(':')[0];
    let originSort=this.searchParams.order.split(':')[1];
    let newOrder='';
    // console.log("没变化前flag="+flag+',originFlag='+originFlag);
    // 这个语句表示点击的是综合
    if(flag == originFlag){
      newOrder=`${originFlag}:${originSort=="desc"?"asc":"desc"}`;
      // console.log("没变化前"+newOrder);
    }
    else{
      // 点击的是价格
      newOrder=`${flag}:${'desc'}`;
      // console.log('变化后flag='+flag+','+'originFlag='+originFlag);
      //  console.log("变化后"+newOrder); 
    }
    // 将新数赋值给order
    this.searchParams.order=newOrder;
    this.getData();
  }, 
  // 分页器上下页切换
  getPageNo(pageNo){
    this.searchParams.pageNo=pageNo;
    this.getData();
  }

  },
  // 数据监听：监听组件实例身上的属性的属性值变化
  watch:{
    // 监听路由的信息是否发生变化，如果发生，再次发起请求
    $route(newValue,oldValue){
      // 再次发请求整理之前，整理带给服务器参数
Object.assign(this.searchParams,this.$route.params,this.$route.query)
// 再次发起Ajax请求
this.getData();
//每请求完毕，应该把相应的1，2，3级分类的id置空，接受下一个1，2，3id
this.searchParams.category1Id='',
this.searchParams.category2Id='',
this.searchParams.category3Id=''
    }
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      
    }
  }
}
</style>