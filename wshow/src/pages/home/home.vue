<template>
    <div v-for="item in data">
        <span>课程{{item.name}}</span>
        <img :src="item.cover" alt="123" style="width: 80px;height: 80px">
    </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { API } from '@/framework/api';
  @Component({})
  export default class Home extends Vue {

    data = []

    async mounted() {
      let [err, res] = await API.get('courses');
      this.data = res.data
    }
  }

</script>

<style>
</style>
