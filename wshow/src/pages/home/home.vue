<template>
    <view class="van-hairline--surround">

    </view>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { API } from '@/framework/api';

  @Component({})
  export default class Home extends Vue {
    courseData;

    async mounted() {
      let [, res]: any = await API.get('courses');
      this.courseData = res.data;
      console.log(this.courseData);
      // this.current.poster = this.data[0].cover;
      // this.current.name = this.data[0].name;
      // let [, file]: any = await API.get(`courses/${this.current.name}`);
      // let files = file.data;
      // console.log(this.data);
      // console.log(files);
      // files.forEach(v => {
      //   if (v.type === 'mp3' || v.type === 'm4a' ) {
      //     this.current.name = v.name;
      //     this.current.src = v.file;
      //   }
      //   if (v.type === 'mp4') {
      //       this.video.src = v.file
      //   }
      //
      //
      // });


    }


  }

</script>

<style lang="scss" scoped>
    /deep/ .audio, .video {
        display: flex;
        justify-content: center;
    }
</style>
