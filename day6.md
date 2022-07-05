search-index。vue
1.动态发开面包屑的分类名
    1)v-if
         <!-- 分类的面包屑 -->
            <li class="with-x" v-if='searchParams.categoryName'>{{searchParams.categoryName}}<i @click='removeCategoryName'>×</i></li>
    2)动态绑定删除分类的名字
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

2.动态发开面包屑中的关键字
    当面包屑中关键字清除，需要兄弟组件header的关键字清除-$bus
    1)配置全局事件总线-main.js new里面
        // 配置全局事件总线$bus
        beforeCreate(){
        Vue.prototype.$bus=this;
        }

    2)通知兄弟清除关键字
    removeKeyword(){
        // 把keyword置空
      this.searchParams.keyword=undefined;
         // 再次发请求
      this.getData()
         // 通知兄弟组件清除关键字
      this.$bus.$emit("clear");
        // 进行路由跳转
        if(this.$route.query)
        { 
        this.$router.push({
            name:'search',query:this.$route.query
        })
        }
    },

    3)mounted(){
    // 通过全局事件总线清除关键字
    this.$bus.$on('clear',()=>{
        this.keyword='';
    })
    }

3.动态发开面包屑中品牌
    1）trademark-父子传值
    父：index
         <!-- 品牌-->
            <li class="with-x" v-if='searchParams.trademark'>{{searchParams.trademark.split(':')[1]}}<i @click='removeTradeMark'>×</i></li>
             <SearchSelector @trademarkInfo='trademarkInfo'  @attrInfo='attrInfo'/>
                      // 自定义事件回调
                trademarkInfo(trademark)
                {
                this.searchParams.trademark=`${trademark.tmId}:${trademark.tmName}`
                //  再次发送请求
                this.getData();
                },
                    // 删除品牌信息
                removeTradeMark(){
                this.searchParams.trademark=undefined;
                // 再次发请求
                this.getData()
                },

    子：SearchSelector.vue
          <!-- 品牌地方 -->
        <ul class="logo-list">
          <li
            v-for="trademark in trademarkList"
            :key="trademark.tmId"
            @click="trademarkHandler(trademark)"
          >
            {{ trademark.tmName }}
          </li>
        </ul>

     methods: {
        // 父组件发请求
        // 因为父组件中searchParams参数是带给服务器参数,子组件点击的品牌的信息,需要给父组件传过去
        trademarkHandler(trademark) {
        this.$emit("trademarkInfo", trademark);
        },
            }
4.动态发开面包屑中平台属性
    1）props
父：
     <!-- 平台售卖属性的属性值 -->
            <li class="with-x" v-for='(attrValue,index) in searchParams.props' :key='index' >{{attrValue.split(':')[1]}}<i @click='removeAttr(index)'>×</i></li>
            <SearchSelector @trademarkInfo='trademarkInfo'  @attrInfo='attrInfo'/>
             // 删除品牌信息
        removeAttr(index){
        // 在index位置删除1 个  
        this.searchParams.props.splice(index,1);
        // 再次发请求
        this.getData()
        },

             // 自定义事件的回调
        attrInfo(attr,attrValue){
        let props=`${attr.attrId}:${attrValue}:${attr.attrName}`
        // 数组去重
        if(this.searchParams.props.indexOf(props)==-1)
        this.searchParams.props.push(props);
        // 再次发起Ajax请求
        this.getData();
        }
子：
            // 平台售卖属性值的点击事件
    attrInfo(attr, attrValue) {
      this.$emit('attrInfo',attr,attrValue)
    },
5.中小重点：排序操作-index.vue
    1）1.综合 2.价格 asc:升序 desc:降序
        q1:order排序多少种可能?
        1.desc 1.asc 2.desc 2.asc

        q2:谁应该有类名--点击在哪?
        通过order属性值当中包含1（综合）还是2（价格）
            :class="{active:isOne}"
         isOne(){
                    // indexOf()==-1表示没有这个数或者字符串
                    return this.searchParams.order.indexOf('1')!=-1;
                    },

        q3:升序降序标-两个默认都是降序？---阿里图标
            class=' iconfont icon-arrdown ' :class="{'icon-arrdown':isAsc, 'icon-down-copy':isDesc}"
            isAsc(){
            return this.searchParams.order.indexOf('asc')!=-1;
            },
        q4:点击同一个地方切换升降标？
            绑定点击事件，分别传值，绑定事件内判断同一li里切换标
            <li :class="{active:isOne}" @click="changeOrder('1')">
                  <a >综合<span v-show="isOne" class=' iconfont icon-arrdown ' :class="{'icon-arrdown':isAsc, 'icon-down-copy':isDesc}"></span></a>
                </li>
            <li :class="{active:isTwo}" @click="changeOrder('2')"   >
                  <a >价格<span v-show="isTwo" class='iconfont icon-arrdown' :class="{'icon-arrdown':isAsc, 'icon-down-copy':isDesc}"></span></a>
            </li>
            changeOrder(flag)



