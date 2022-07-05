<template>
  <div class="swiper-container" ref="cur">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="carousel in list" :key="carousel.id">
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "Carousel",
  props: ["list"],
  watch: {
    // 监听bannerList数据的变化，因为数据发生变化，---数组由0变为四个元素
    list: {
      immediate: true,
      handler(newValue, oldValue) {
        // watch监听bannerList属性的变化
        // 若执行handler方法，代表组件实例身上这个属性已经有了【数组，四个元素】
        // 当前函数执行，只能保证bannerList数组已经有了，但不能保证v-for已经执行结束
        // v-for执行完毕，才有结构【现在watch无法保证】
        // nextTick：在下次 DOM 更新循环结束之后（v-for完事）执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。
        this.$nextTick(() => {
          var mySwiper = new Swiper(
            //   document.querySelector('.swiper-container')
            this.$refs.mySwiper,
            {
              loop: true, // 循环模式选项

              // 如果需要分页器
              pagination: {
                el: ".swiper-pagination",
                //   点击小球可以切换
                clickable: true,
              },

              // 如果需要前进后退按钮
              navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              },
            }
          );
        });
      },
    },
  },
};
</script>

<style>
</style>