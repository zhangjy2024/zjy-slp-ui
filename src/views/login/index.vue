<template>
  <el-form :inline="true" class="demo-form-inline">
    <el-form-item label="用户名">
      <el-input v-model="username" placeholder="请输入用户名/手机号/邮箱" clearable />
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="password" placeholder="请输入密码" clearable />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="login">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { userLoginAsync } from "@/api/user";
import { resetRouter } from "@/router";

export default {
  
  name: 'Login',

  data() {
    return {
      username: "",
      password: "",
    }
  },

  methods: {
    async login() {
      const data = {
        grant_type: "password",
        username: this.username,
        password: this.password
      }
      const loginRs = await userLoginAsync(data).catch((e) => {
        
      }).finally(() => {

      })
      if (loginRs.data) {
        // 缓存access_token、refresh_token
        sessionStorage.setItem("access_token", loginRs.data.access_token);
      }

      // 获取当前登录用户信息
      // const userInfoRs = await currentUserAsync().catch((e) => {
      //   console.log(e);
      // });
      // if (userInfoRs && userInfoRs.data) {
      //   sessionStorage.setItem('user_info', JSON.stringify(userInfoRs.data.data));
      // }

      const { query } = this.$route
      if (query && query.redirect_uri) {
        window.location = query.redirect_uri
      } else {
        // 跳转至首页
        this.$router.replace('/index');
      }
    }
  },

  mounted() {
    resetRouter()
    sessionStorage.clear()
  }
}
</script>