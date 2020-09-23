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

            <el-table-column label="课程封面图" width="82">
                <template slot-scope="scope">
                    <el-image
                            style="width: 60px; height: 60px"
                            :src="scope.row.cover"
                            fit="scale-down">
                    </el-image>
                </template>
            </el-table-column>


            <el-table-column label="操作">
                <template slot-scope="{row}">
                    <el-button type="primary" size="small" @click="edit(row)">编辑</el-button>
                    <el-button type="danger" size="small" @click="del(row)">删除</el-button>
                </template>
            </el-table-column>

        </el-table>

        <div style="display: flex;justify-content: flex-end">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="1"
                    :page-sizes="[100, 200, 300, 400]"
                    :page-size="100"
                    layout="total, sizes, prev, pager, next, jumper"
                    :hide-on-single-page="true"
                    :total="400">
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
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :show-file-list="false"
                            :http-request="uploadFile"
                            :before-upload="beforeUpload"
                            :on-success="uploadSuccess"
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

    courseRules = {
      name: [
        { required: true, message: '请输入课程名称', trigger: 'blur' },
        { min: 2, max: 12, message: '课程名称 2 到 12 个字符', trigger: 'blur' },
      ],
    };

    // table相关
    created() {
      this.fetch();
    }

    async fetch() {
      const response = await this.$http.get('courses');
      this.tableData = response.data;
    }

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    }

    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }


    // dialog相关
    add(formName) {
      this.operate = '增加';
      this.$nextTick(() => {
        (this.$refs[formName] as Vue & { resetFields: () => boolean }).resetFields();
      });
      this.courseDialogShow = true;
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

    edit() {
      this.operate = '编辑';
      this.courseDialogShow = true;

    }

    async beforeUpload(file) {
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
        this.courseForm.cover = res.data.url;
      } catch (e) {
        // console.log(e);
      }
    }

    uploadSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    }

    async confirm(formName) {
      try {
        let result = await (this.$refs[formName] as Vue & { validate: () => boolean }).validate();
        console.log(this.courseForm);
        if (result) {
          let res = await this.$http.post(`courses/create`, this.courseForm);
          console.log(res);
        }
      } catch (e) {
        console.log(e);
      }
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
        width: 178px;
        height: 178px;
        display: block;
    }
</style>
