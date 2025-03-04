<template>
  <div class="div-center-flex">
    <el-form
      :module="loginData"
      style="padding: 40px;background-color: white;"
    >
      <el-form-item label="用户名">
        <el-input class="login-input" v-model="loginData.username" placeholder="请输入用户名/手机号/邮箱" clearable />
      </el-form-item>
      <el-form-item label="密码">
        <el-input class="login-input" v-model="loginData.password" placeholder="请输入密码" clearable />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
        <a href="#" @click.prevent="goToRegister" style="float: right;">没有账号?点击注册</a>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { userLoginAsync, currentUserAsync } from "@/api/user";
import { resetRouter } from "@/router";

export default {
  
  name: 'Login',

  data() {
    return {
      loginData: {
        username: "",
        password: "",
        grant_type: "password"
      }
    }
  },

  methods: {
    /**
     * 用户登录方法
     */
    async login() {
      const loginRs = await userLoginAsync(this.loginData).catch((e) => { })
      if (loginRs.data) {
        // 缓存access_token、refresh_token
        sessionStorage.setItem("access_token", loginRs.data.access_token);
      }

      // 获取当前登录用户信息
      const userInfoRs = await currentUserAsync().catch((e) => {
        console.log(e);
      });
      if (userInfoRs && userInfoRs.data) {
        sessionStorage.setItem('user_info', JSON.stringify(userInfoRs.data.data));
      }

      const { query } = this.$route
      if (query && query.redirect_uri) {
        window.location = query.redirect_uri
      } else {
        // 跳转至首页
        this.$router.replace('/index');
      }
    },

    goToRegister() {
      this.$router.replace('/register')
    }
  },

  mounted() {
    resetRouter()
    sessionStorage.clear()
  }
}
</script>

<style>
.div-center-flex {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: rgb(250, 250, 250);
}
.login-input{
  width: 360px;
}
</style>