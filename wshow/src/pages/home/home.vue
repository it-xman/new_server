<template>
    <view class="home">
        <h1 class="home_text">小鹰学习社</h1>
        <h3 class="home_text">
            相关文案描述
        </h3>
        <div class="home_text">
            1.__________
            <hr>
            2.__________
        </div>
        <uni-swiper-dot class="home-swiper-dot"
                        :info="banner"
                        :current="current"
                        field="content"
                        mode="default">
            <swiper class="swiper-box"
                    :autoplay="true"
                    @change="change">
                <swiper-item v-for="(item, index) in banner" :key="index">
                    <view class="swiper-item">
                        <img :src="item.src" alt="">
                    </view>
                </swiper-item>
            </swiper>
        </uni-swiper-dot>
    </view>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import uniSwiperDot from '@dcloudio/uni-ui/lib/uni-swiper-dot/uni-swiper-dot.vue';
  @Component({
    components: {
      uniSwiperDot,
    },
  })

  export default class HomeCenter extends Vue {

    banner = [
      {
        src: '/static/img/learn.jpg',
      },
      {
        src: '/static/img/learn.jpg',
      },
      {
        src: '/static/img/learn.jpg',
      },
      {
        src: '/static/img/learn.jpg',
      }
    ];
    current = 0;
    change(e) {
      this.current = e.detail.current;
    }
  }

</script>

<style lang="scss" scoped>
    .home {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;

        h1, h3 {
            margin: 0;
            padding: 0;
        }
        .home_text {
            margin-top: 50rpx;
            font-size: 24px;
        }
        .home-swiper-dot {
            width: 100%;
            margin-top: 80rpx;
            .swiper-box {
                width: 100%;
                height: 230px;
                img{
                    width: 100%;
                }
            }
        }
    }
</style>
