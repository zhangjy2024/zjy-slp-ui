<template>
  <div class="left-sidebar">
    <el-col :span="12">
      <el-menu
        :router="true"
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose">
        <el-menu-item index="/home">
          <img src="../../../assets/logo.png" width="100%"/>
        </el-menu-item>
        <el-menu-item index="/home/todo">
          <i class="el-icon-menu"></i>
          <span slot="title">导航二</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-document"></i>
          <span slot="title">导航三</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">导航四</span>
        </el-menu-item>
        <el-menu-item index="5">
          <i class="el-icon-setting"></i>
          <span slot="title">设置</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',

  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style scoped>
.left-sidebar {
  height: 100vh;
}

.el-menu-vertical-demo {
  width: 200px;
  height: 100vh;
  background-color: rgb(217, 236, 255);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.el-menu-item {
  height: 120px;
}

.el-menu-item:first-child {
  height: 300px;
  margin-bottom: 60px;
}

.el-menu-item:last-child {
  height: 90px;
  margin-top: auto;
}
</style>
