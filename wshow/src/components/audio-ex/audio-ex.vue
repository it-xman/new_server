<template>
    <div>
        <video id="myVideo" ref="audio" :src="url" @timeupdate="timeupdate"
               @loadedmetadata="loadedmetadata">
        </video>

        <div>
            <text>{{timer}}</text>
        </div>


    </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';

  @Component({})
  export default class AudioEx extends Vue {
    @Prop({ type: String, required: true, default: '' })
    url !: string;
    count !: number;

    // 播放进度变化时触发
    timeupdate({ detail }) {
      console.log(detail);
    }

    // 视频元数据加载完成时触发
    loadedmetadata({ detail }) {
      console.log(detail, 'load');
    }

    formatTime(time) {
      if (time === 0 || typeof time !== 'number') {
        return '00:00';
      }
      let mm: number = Math.floor(time / 60);
      let ss: number = Math.floor(time % 60);
      

    }

    get timer() {
      return 123;
    }


  }

</script>

<style>
</style>
