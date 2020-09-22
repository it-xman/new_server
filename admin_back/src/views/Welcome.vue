<template>
    <div>
        欢迎 {{user}} 使用后台管理系统
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

<style>
</style>
