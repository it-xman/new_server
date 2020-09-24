<template>
    <div style="display: flex; justify-content: center;" class="welcome-bgc">
        <h1 style="font-size: 36px;margin-top: 220px;color: #cccccc">欢迎 {{user}} 使用后台管理系统</h1>
    </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component({})
  export default class Welcome extends Vue {
    user = '';

    mounted() {
      let userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
      this.user = userInfo.username
    }
  }

</script>

<style lang="scss" scoped>
    .welcome-bgc {
        height: 100vh;
        margin: 0;
        padding: 0;
        background: url("../assets/login_bg.jpg") no-repeat;
        background-size: cover;
    }
</style>
