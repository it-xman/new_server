<template>
    <div>
        <h3>课程管理</h3>
        <el-button type="primary" size="small" @click="add('courseRef')">创建课程</el-button>
        <el-table :data="tableData.data" border stripe>
            <el-table-column label="ID">
                <template slot-scope="scope">
                    {{scope.row._id}}
                </template>
            </el-table-column>

            <el-table-column label="课程名称">
                <template slot-scope="scope">
                    {{scope.row.name}}
                </template>
            </el-table-column>

            <el-table-column label="封面图" width="82">
                <template slot-scope="scope">
                    <el-image
                            style="width: 60px; height: 60px"
                            :src="scope.row.cover"
                            fit="scale-down">
                    </el-image>
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


        <el-dialog :title="`${operate}课程`"
                   :visible.sync="courseDialogShow"
                   :close-on-click-modal="false"
                   :close-on-press-escape="false">
            <el-form :model="courseForm" :rules="courseRules" ref="courseRef">
                <el-form-item label="课程名称" prop="name">
                    <el-input v-model.trim="courseForm.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="课程封面">
                    <el-upload
                            class="avatar-uploader"
                            action=""
                            :show-file-list="false"
                            :http-request="overWriteUpload"
                            :before-upload="beforeUpload"
                    >
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="courseDialogShow = false">取 消</el-button>
                <el-button type="primary" @click="confirm('courseRef')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component({})
  export default class Courses extends Vue {
    // 上传文件type
    fileType = '';
    // table相关
    tableData = {};
    fields = {
      _id: {
        label: 'ID',
      },
      name: {
        label: '课程名称',
      },
      cover: {
        label: '课程封面图',
      },
    };

    // dialog相关
    courseForm = {
      name: '',
      cover: '',
    };
    operate = '';
    courseDialogShow = false;
    imageUrl = '';
    fileRaw;
    editId = '';
    courseRules = {
      name: [
        { required: true, message: '请输入课程名称', trigger: 'blur' },
        { min: 2, max: 12, message: '课程名称 2 到 12 个字符', trigger: 'blur' },
      ],
    };

    pageSize = 6;
    totalSize = 1;
    pageSizes = [6, 12, 18, 24];

    query = {
      limit: 6,
      page: 1,
      sort: {
        updatedAt: -1,
      },
    };

    // table相关
    mounted() {
      this.fetch();
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
      this.fileType = '';
      this.courseForm.cover = '';
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
      let res = await this.$http.get(`courses/${raw._id}`);
      this.courseForm.name = res.data.name;
      this.imageUrl = res.data.cover;
      this.editId = raw._id;
    }

    // 覆盖upload组件默认的上传行为
    overWriteUpload() {
    }

    async beforeUpload(file) {
      this.fileType = file.type;
      return new Promise(((resolve, reject) => {
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG && !isPNG) {
          this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!');
          reject();
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
          reject();
        }
        this.imageUrl = URL.createObjectURL(file);
        let params = new FormData();
        params.append('file', file);
        this.fileRaw = params;
        resolve();
      }));
    }

    async uploadFile() {
      let userInfo = JSON.parse(window.localStorage.getItem('userInfo') || '{}');
      let userFile = `${userInfo.username}-${userInfo.id}`;
      try {
        let res = await this.$http.post(`/upload/${userFile}`, this.fileRaw);
        return res.data.url;
      } catch (e) {
        // console.log(e);
      }
    }

    async confirm(formName) {
      try {
        let result = await (this.$refs[formName] as Vue & { validate: () => boolean }).validate();
        if (result) {
          let check = await this.$http.get(`courses/check/${this.courseForm.name}`);
          if (this.operate === '增加') {
            if (!check.data.create) {
              return this.$message.error(`课程已存在，请重新输入`);
            }
          }
          let url = this.operate === '增加' ? `courses/create` : `courses/${this.editId}`;
          if (this.fileType === '') {
            this.operate === '增加' ? await this.$http.post(url, this.courseForm) : await this.$http.put(url, this.courseForm);
            await this.fetch();
            this.courseDialogShow = false;
            return this.operate === '增加' ? this.$message.success(`课程创建成功`) : this.$message.success(`课程编辑成功`);
          } else if (this.fileType !== 'image/jpeg' && this.fileType !== 'image/png') {
            return this.$message.error(`请上传符合规范的jpg或png图片`);
          } else {
            this.courseForm.cover = await this.uploadFile();
            this.operate === '增加' ? await this.$http.post(url, this.courseForm) : await this.$http.put(url, this.courseForm);
            await this.fetch();
            this.courseDialogShow = false;
            return this.operate === '增加' ? this.$message.success(`课程创建成功`) : this.$message.success(`课程编辑成功`);
          }
        }
      } catch (e) {
        // console.log(e);
      }
    }

    async del(row) {
      try {
        await this.$confirm(`此操作将删除课程 ${row.name}，数据不可恢复 ，确认删除?`, '删除课程');
      } catch (e) {
        return;
      }
      await this.$http.delete(`/courses/${row._id}`);
      this.$message.success('删除成功');
      await this.fetch();
    }

    async fetch() {
      const response = await this.$http.get('courses', {
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
