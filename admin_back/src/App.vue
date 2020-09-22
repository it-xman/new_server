<template>
    <div id="app" :key="uuid">
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { v4 as uuidv4 } from 'uuid';

  @Component({})
  export default class App extends Vue {
    uuid = uuidv4();
  }

</script>

<style lang="scss">
    body {
        margin: 0;
        padding: 0;
    }
</style>
