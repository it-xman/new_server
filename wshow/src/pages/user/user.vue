<template>
    <div>
        <div class="user-control">
            <image
                    style="width: 160px;
                height: 160px;
                border-radius: 50%;
                background-color: #eeeeee;"
                    src="/static/user/user.png"
            >
            </image>
            <div class="user-text">
                用户中心
            </div>
        </div>

        <div class="user-grid">
            <uni-grid :column="3" :show-border="true" :square="true" v-for="item in menus">
<!--                <uni-grid-item>-->
<!--                    <text class="text">文本</text>-->
<!--                </uni-grid-item>-->
<!--                <uni-grid-item>-->
<!--                    <text class="text">文本</text>-->
<!--                </uni-grid-item>-->
<!--                <uni-grid-item>-->
<!--                    <text class="text">文本</text>-->
<!--                </uni-grid-item>-->
            </uni-grid>
        </div>
    </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component({})
  export default class UserCenter extends Vue {
    menus: string[] = [];


  }

</script>

<style lang="scss" scoped>
    .user-control {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 100rpx;

        .user-text {
            margin-top: 20rpx;
        }

    }

    .user-grid {
        margin-top: 60rpx;
    }

</style>
