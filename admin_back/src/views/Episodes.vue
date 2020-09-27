<template>
    <div>
        <h3>课时管理</h3>
        <el-button type="primary" size="small" @click="add('courseRef')">创建课时</el-button>
        <el-table :data="tableData.data" border stripe v-loading="tableLoading">
            <el-table-column label="课时名称">
                <template slot-scope="scope">
                    {{scope.row.name}}
                </template>
            </el-table-column>

            <el-table-column label="课程名称">
                <template slot-scope="scope">
                    {{scope.row.course}}
                </template>
            </el-table-column>

            <el-table-column label="课时文件预览">
                <template slot-scope="scope">
                    <el-image
                            style="width: 60px; height: 60px"
                            :src="scope.row.file"
                            fit="scale-down">
                    </el-image>
                </template>
            </el-table-column>

            <el-table-column label="文件类型">
                <template slot-scope="scope">
                    <span>{{scope.row.type}}</span>
                </template>
            </el-table-column>

            <el-table-column label="操作" width="145">
                <template slot-scope="{row}">
                    <el-button type="primary" size="small" @click="edit(row)">编辑</el-button>
                    <el-button type="danger" size="small" @click="del(row)">删除</el-button>
                </template>
            </el-table-column>

        </el-table>

        <div style="display: flex;justify-content: flex-end">
            <el-pagination
                    :small="true"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :page-sizes="pageSizes"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :hide-on-single-page="false"
                    :total="totalSize">
            </el-pagination>
        </div>


        <el-dialog :title="`${operate}课时`"
                   :visible.sync="courseDialogShow"
                   :close-on-click-modal="false"
                   :close-on-press-escape="false">
            <el-form :model="episodesForm" :rules="episodeRules" ref="courseRef" v-loading="submitting">
                <el-form-item label="课程名称" prop="course">
                    <el-select v-model="episodesForm.course" placeholder="请选择">
                        <el-option
                                v-for="item in courses"
                                :key="item.id"
                                :label="item.name"
                                :value="item.name"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="课时名称" prop="name">
                    <el-input v-model.trim="episodesForm.name" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="课时文件">
                    <el-upload
                            class="avatar-uploader"
                            action=""
                            :show-file-list="false"
                            :http-request="overWriteUpload"
                            :before-upload="beforeUpload"
                    >
                        <img v-if="imageUrl" :src="imageUrl" class="avatar" alt="">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="courseDialogShow = false" :disabled="submitting">取 消</el-button>
                <el-button type="primary" @click="confirm('courseRef')" :disabled="submitting">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component({})
  export default class Courses extends Vue {
    tableLoading = true;
    submitting = false;
    // table相关
    tableData = {};
    // dialog相关
    episodesForm = {
      course: '',
      name: '',
      file: '',
      type: '',
    };
    courses = [];
    operate = '';
    courseDialogShow = false;
    imageUrl = '';
    fileRaw;
    editId = '';
    episodeRules = {
      name: [
        { required: true, message: '请输入课时名称', trigger: 'blur' },
        { min: 2, max: 12, message: '课时名称 2 到 12 个字符', trigger: 'blur' },
      ],
      course: [
        {
          required: true, message: '请选择相关课程', trigger: 'change',
        },
      ],
    };

    pageSize = 10;
    totalSize = 1;
    pageSizes = [10, 20, 50, 100];

    query = {
      limit: 6,
      page: 1,
      sort: {
        updatedAt: -1,
      },
    };

    // table相关
    async mounted() {
      try {
        await this.fetch();
        await this.getCourses();
      } catch (e) {
        console.log(e);
      } finally {
        this.tableLoading = false;
      }

    }

    async handleSizeChange(val) {
      this.query.limit = val;
      await this.fetch();
    }

    async handleCurrentChange(val) {
      this.query.page = val;
      await this.fetch();
    }

    // dialog相关
    add(formName) {
      this.operate = '增加';
      this.imageUrl = '';
      this.episodesForm.file = '';
      this.$nextTick(() => {
        (this.$refs[formName] as Vue & { resetFields: () => boolean }).resetFields();
      });
      this.courseDialogShow = true;
    }

    async edit(raw) {
      this.operate = '编辑';
      this.$nextTick(() => {
        (this.$refs['courseRef'] as Vue & { clearValidate: () => boolean }).clearValidate();
      });
      this.courseDialogShow = true;
      let res = await this.$http.get(`episodes/${raw._id}`);
      this.episodesForm.name = res.data.name;
      this.episodesForm.course = res.data.course;
      this.imageUrl = res.data.file;
      this.editId = raw._id;
    }

    // 覆盖upload组件默认的上传行为
    overWriteUpload() {
    }

    async beforeUpload(file) {
      this.episodesForm.type = file.name.split('.').pop();
      return new Promise(((resolve) => {
        this.imageUrl = URL.createObjectURL(file);
        let params = new FormData();
        params.append('file', file);
        this.fileRaw = params;
        resolve();
      }));
    }

    async uploadFile() {
      // let userInfo = JSON.parse(window.localStorage.getItem('userInfo') || '{}');
      // let userFile = `${userInfo.username}-file`;
      try {
        let res = await this.$http.post(`/upload/courses`, this.fileRaw);
        return res.data.url;
      } catch (e) {
        // console.log(e);
      }
    }

    async confirm(formName) {
      try {
        let result = await (this.$refs[formName] as Vue & { validate: () => boolean }).validate();
        if (result) {
          let check = await this.$http.get(`episodes/check/${this.episodesForm.name}`);
          if (this.operate === '增加' && !check.data.create) {
            return this.$message.error(`课时已存在，请重新输入`);
          }
          this.submitting = true;
          if (this.episodesForm.type !== '') {
            this.episodesForm.file = await this.uploadFile();
          }
          let url = this.operate === '增加' ? `episodes/create` : `episodes/${this.editId}`;
          this.operate === '增加' ? await this.$http.post(url, this.episodesForm) : await this.$http.put(url, this.episodesForm);
          await this.fetch();
          this.courseDialogShow = false;
          this.operate === '增加' ? this.$message.success(`课时创建成功`) : this.$message.success(`课时编辑成功`);
        }
      } catch (e) {
        // console.log(e);
      } finally {
        this.submitting = false;
      }
    }

    async del(row) {
      try {
        await this.$confirm(`此操作将删除课时 ${row.name}，数据不可恢复 ，确认删除?`, '删除课时');
      } catch (e) {
        return;
      }
      await this.$http.delete(`/episodes/${row._id}`);
      this.$message.success('删除成功');
      await this.fetch();
    }

    async getCourses() {
      let res = await this.$http.get(`episodes/course`);
      this.courses = res.data;
    }

    async fetch() {
      const response = await this.$http.get('episodes', {
          params: {
            query: this.query,
          },
        },
      );
      this.totalSize = response.data.total;
      this.tableData = response.data;
    }
  }

</script>

<style lang="scss" scoped>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .avatar {
        width: 180px;
        height: 180px;
        display: block;
    }
</style>
