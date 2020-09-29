<template>
    <div>
        <div class="detail-name">
            《{{courseName}}》
        </div>

        <uni-collapse v-for="item in files" :key="item.file" :showAnimation="true" :accordion="true">
            <uni-collapse-item :title="item.name" :open="false" :thumb="cover">
                <div v-if="item.file===undefined">暂无课程文件</div>
                <div class="detail-video">
                    <video
                            :title="item.name"
                            class="video-self"
                            :src="item.file"
                            v-if="item.file.length>0
                            && item.type!=='jpg'
                            && item.type!=='png'
                            && item.type!=='gif'
                            && item.type!=='svg'
                            && item.type!=='webp'"
                            controls>
                    </video>
                </div>
            </uni-collapse-item>
        </uni-collapse>
    </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { API } from '@/framework/api';

  @Component({})
  export default class CourseDetail extends Vue {
    courseName: string = '';
    cover: string = '';
    files: [] = [];

    async onLoad(option) {
      let that = this;
      if (option.hasOwnProperty('course')) {
        this.courseName = option.course;
      }
      await uni.getStorage({
        key: 'cover',
        success(res) {
          that.cover = res.data
        },
      });
    }

    async mounted() {
      await this.getEpisodes(this.courseName);
    }

    async getEpisodes(coursename) {
      try {
        let [, file]: any = await API.get(`courses/episodes/${coursename}`);
        this.files = file.data;
      } catch (e) {
        console.log(e);
      } finally {
        uni.hideLoading();
      }
    }
  }

</script>

<style lang="scss" scoped>
    .detail-name {
        width: 100%;
        height: 150rpx;
        line-height: 150rpx;
        font-size: 24px;
        text-align: center;
        border-bottom: 1px solid #cccccc;
    }

    .detail-video {
        display: flex;
        justify-content: center;
    }

    .video-self {
        width: 100%;
        height: 400rpx;
    }

</style>
