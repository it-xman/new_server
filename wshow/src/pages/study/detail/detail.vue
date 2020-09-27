<template>
    <div>
        <div class="detail-name">
            《{{courseName}}》
        </div>
    </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { API } from '@/framework/api';

  @Component({})
  export default class CourseDetail extends Vue {
    courseName: string = '';

    async onLoad(option) {
      if (option.hasOwnProperty('course')) {
        this.courseName = option.course;
      }
    }

    async mounted() {
      await this.getEpisodes(this.courseName);
    }

    async getEpisodes(coursename) {
      try {
        let [, file]: any = await API.get(`courses/episodes/${coursename}`);
        console.log(file);
      } catch (e) {
        console.log(e);
      } finally {
        uni.hideLoading();
      }
    }


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

</script>

<style lang="scss" scoped>
    .detail-name {
        font-size: 24px;
        text-align: center;
    }
</style>
