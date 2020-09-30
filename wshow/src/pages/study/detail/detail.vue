<template>
    <div>
        <div class="detail-name">
            《{{courseName}}》
        </div>

        <uni-collapse v-for="item in files" :key="item.file" class="detail-control">

            <div v-if="item.file===undefined">暂无课程文件</div>

            <uni-collapse-item :title="`${item.name}`" :open="false" :thumb="cover" v-if="item.file.length>0">
                <div class="detail-video-radio">
                    <!--                    <audio :src="item.file"-->
                    <!--                           :name="item.name"-->
                    <!--                           author="小鹰学习社"-->
                    <!--                           :poster="cover"-->
                    <!--                           controls-->
                    <!--                           class="audio-self"-->
                    <!--                           v-if="item.type==='mp3'-->
                    <!--                           || item.type==='m4a'-->
                    <!--                           || item.type==='wav'-->
                    <!--                           || item.type==='aac'">-->
                    <!--                    </audio>-->

                    <audio-ex :url="item.file"
                              v-if="item.type==='mp3'
                           || item.type==='m4a'
                           || item.type==='wav'
                           || item.type==='aac'">
                    </audio-ex>


                    <video :src="item.file"
                           :title="item.name"
                           class="video-self"
                           controls
                           :poster="cover"
                           v-if="item.type==='mp4'
                            || item.type==='3gp'
                            || item.type==='avi'
                            || item.type==='m4v'
                            || item.type==='m3u8'">
                    </video>
                </div>
            </uni-collapse-item>
        </uni-collapse>
    </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { API } from '@/framework/api';
  import AudioEx from '@/components/audio-ex/audio-ex.vue';

  @Component({
    components: {
      AudioEx,
    },
  })
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
          that.cover = res.data;
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


    .detail-control {
        .detail-video-radio {
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .audio-self {
            width: 300rpx;
            height: 140rpx;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .video-self {
            width: 100%;
            height: 400rpx;
        }
    }


</style>
