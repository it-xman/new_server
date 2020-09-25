<template>
    <div class="home-head">
        欢迎使用本平台提供的学习内容
        <audio style="text-align: left" :src="current.src" :poster="current.poster" :name="current.name"
               :author="current.author" :action="audioAction" controls></audio>
        <video id="myVideo" :src="video.src" @error="videoErrorCallback" :danmu-list="danmuList" enable-danmu danmu-btn
               controls></video>

    </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { API } from '@/framework/api';

  @Component({})
  export default class Home extends Vue {
    data = [{
      name: '',
      cover: '',
    }];

    video = {
      src: '',
    };

    danmuList = [{
      text: '第 1s 出现的弹幕',
      color: '#ff0000',
      time: 1,
    },
      {
        text: '第 3s 出现的弹幕',
        color: '#ff00ff',
        time: 3,
      },
    ];
    danmuValue = '';

    current = {
      poster: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/audio/music.jpg',
      name: 'test',
      author: '暂无',
      src: 'http://justjs.ddns.net:9000/courses/%E4%BB%96%E5%8F%AA%E6%98%AF%E7%BB%8F%E8%BF%87%20-%20h3R3.mp3?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=Ce7YgKFL73veLqEeaETGAP%2F20200925%2F%2Fs3%2Faws4_request&X-Amz-Date=20200925T072616Z&X-Amz-Expires=432000&X-Amz-SignedHeaders=host&X-Amz-Signature=21d5ac57b8ec7935dcfcb0045bb820c6946a960e2fe0b4dcfb82c52fe5255444',
    };

    audioAction = {
      method: 'pause',
    };

    onReady() {
      this.videoContext = uni.createVideoContext('myVideo');
    }


    sendDanmu() {
      this.videoContext.sendDanmu({
        text: this.danmuValue,
        color: this.getRandomColor()
      });
      this.danmuValue = '';
    }

    videoErrorCallback() {
      uni.showModal({
        content: e.target.errMsg,
        showCancel: false
      })
    }

    getRandomColor() {
      const rgb = []
      for (let i = 0; i < 3; ++i) {
        let color = Math.floor(Math.random() * 256).toString(16)
        color = color.length == 1 ? '0' + color : color
        rgb.push(color)
      }
      return '#' + rgb.join('')
    }


    async mounted() {
      let [, res]: any = await API.get('courses');
      this.data = res.data;
      this.current.poster = this.data[0].cover;
      this.current.name = this.data[0].name;
      let [, file]: any = await API.get(`courses/${this.current.name}`);
      let files = file.data;
      files.forEach(v => {
        if (v.type === 'mp3') {
          this.current.name = v.name;
          this.current.src = v.file;
        }
        if (v.type === 'mp4') {
            this.video.src = v.file
        }


      });


    }


  }

</script>

<style>
</style>
