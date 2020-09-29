<template>
    <div>
        <div v-if="courseData.length === 0"
             style="font-size: 36px;display: flex;
             justify-content: center;
             margin-top: 520rpx;"
        >
            暂无课程
        </div>

        <div v-if="courseData.length !== 0">
            <uni-card
                    @click="detail(item)"
                    :key="index"
                    v-for="(item, index) in courseData"
                    :title="`《${item.name}》`"
                    mode="title"
                    :is-shadow="true"
                    :thumbnail="item.cover"
                    :extra="item.createTime.split('T')[0]"
            >
                <span>查看课程 《{{item.name}}》 详情</span>
            </uni-card>
            <div class="page-fix">
                <uni-pagination
                        :total="total"
                        @change="changePage"
                        :pageSize="pageSize"
                        :current="current">
                </uni-pagination>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { API } from '@/framework/api';

  @Component({
    components: {},
  })
  export default class StudyCenter extends Vue {
    courseData: string[] = [];
    total = 0;
    pageSize = 5;
    current = 1;
    query = {
      limit: 5,
      page: 1,
      sort: {
        updatedAt: -1,
      },
    };

    async onShow() {
      await this.getSystemInfo();
      await this.fetch();
    }

    // 根据屏幕可用高度设置显示数量
    async getSystemInfo() {
      let [, info]: any = await uni.getSystemInfo({});
      if (info.windowHeight <= 456) {
        this.query.limit = 3;
        return;
      } else if (info.windowHeight <= 624) {
        this.query.limit = 4;
        return;
      } else if (info.windowHeight <= 726) {
        this.query.limit = 5;
      } else {
        this.query.limit = 6;
      }
    }

    async fetch() {
      try {
        let [, res]: any = await API.get(`courses/${JSON.stringify(this.query)}`);
        this.courseData = res.data.data;
        this.total = res.data.total;
      } catch (e) {
        console.log(e);
      } finally {
        uni.hideLoading();
      }
    }

    async changePage(e) {
      this.query.page = e.current;
      await this.fetch();
    }

    async detail(course) {
      uni.setStorage({
        key: 'cover',
        data: course.cover,
      });

      uni.navigateTo({
        url: `/pages/study/detail/detail?course=${course.name}`,
      });
    }
  }

</script>

<style lang="scss" scoped>
    .page-fix {
        position: absolute;
        left: 50%;
        transform: translate(-50%, -50%);
        bottom: 0;
    }

</style>
