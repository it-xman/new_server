<template>
    <view class="home">
        <h1 class="home_text">小鹰学习社</h1>
        <h3 class="home_text">

        </h3>
        <div class="home_text">
            每天学习一点点
<!--            <hr>-->
<!--            口语发音-->
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

        <div class="bottom">
            坚持，是努力把一件事做到极致
        </div>
    </view>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  @Component({
    components: {
    },
  })

  export default class HomeCenter extends Vue {

    banner = [
      {
        src: '/static/img/banner0.jpg',
      },
      {
        src: '/static/img/banner1.jpg',
      },
      {
        src: '/static/img/banner2.jpg',
      },
      {
        src: '/static/img/banner3.jpg',
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
            &:nth-child(1) {
                font-size: 38px;
                color: #3a8ee6;
            }
            color: #3F536E;
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
        .bottom {
            margin: 100rpx;
            color: #3a8ee6;
        }
    }
</style>
