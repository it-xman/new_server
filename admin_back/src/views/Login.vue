<template>
    <div class="login-style">
        <div class="logo">
            <h1>欢迎登录后台管理系统</h1>
        </div>
        <el-form :model="userForm" :rules="loginRules" ref="loginRuleForm" class="login-form">
            <el-form-item label="用户名" prop="username">
                <el-input v-model.trim="userForm.username"></el-input>
            </el-form-item>

            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model.trim="userForm.password"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="login('loginRuleForm')" class="form-big-btn">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component({})
  export default class Login extends Vue {
    userForm = {
      username: '',
      password: '',
    };

    loginRules = {
      username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 3, max: 12, message: '用户名长度在 3 到 12 个字符', trigger: 'blur' },
      ],
      password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 12, message: '密码长度在 5 到 12 个字符', trigger: 'blur' },
      ],
    };

    async login(formName) {
      try {
        let result = await (this.$refs[formName] as Vue & { validate: () => boolean }).validate();
        if (!result) return;
        let response = await this.$http.post('users/login', this.userForm);
        if (response.data.status === 422) {
          this.$message.error('用户名或密码错误，请重新输入');
          return;
        }
        await window.localStorage.setItem('userInfo', JSON.stringify(response.data.data));
        await this.$router.push({
          name: 'welcome', params: {
            userInfo: response.data,
          },
        });
      } catch (e) {
        console.log(e);
      }
    }
  }


</script>

<style lang="scss" scoped>
    .login-style {
        min-width: 720px;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: url("../assets/login_bg.jpg") no-repeat;
        background-size: cover;

        .logo {
            h1 {
                color: #cccccc;
            }
        }

        .login-form {
            width: 324px;

            .form-big-btn {
                width: 100%;
            }

        }
    }
</style>
