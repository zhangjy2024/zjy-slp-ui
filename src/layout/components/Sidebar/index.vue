<template>
  <div class="left-sidebar">
    <el-menu
      :router="true"
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse">
      <el-menu-item index="/home">
        <img src="../../../assets/logo.png" width="100%"/>
      </el-menu-item>
      <el-menu-item index="/groups" style="padding: 10px 5px;">
        <i class="iconfont icon-yuangongguanlizhengjianxueshengzhenggongzuozheng" style="font-size: 53px; margin: 0px 38px;"></i>
        <span slot="title" style="display: block; font-size: 20px; text-align: center; margin-left: -24px; line-height: 24px;">组织</span>
      </el-menu-item>
      <el-menu-item index="/contact" style="padding: 10px 5px;">
        <i class="iconfont icon-qunzu" style="font-size: 40px; margin: 0px 43px;"></i>
        <span slot="title" style="display: block; font-size: 20px; text-align: center; margin-left: -24px; line-height: 24px;">关系</span>
      </el-menu-item>
      <el-menu-item index="/square" style="padding: 10px 5px;">
        <i class="iconfont icon-pengyouquan" style="font-size: 42px; margin: 0px 43px;"></i>
        <span slot="title" style="display: block; font-size: 20px; text-align: center; margin-left: -24px; line-height: 24px;">广场</span>
      </el-menu-item>
      <el-menu-item index="/set" style="padding: 10px 5px;">
        <i class="el-icon-setting" style="font-size: 40px; margin: 0px 42px;"></i>
        <span slot="title" style="display: block; font-size: 20px; text-align: center; margin-left: -24px; line-height: 24px;">设置</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',

  data() {
    return {
      isCollapse: false
    }
  },

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
  position: fixed;
}

.el-menu-vertical-demo {
  width: 160px;
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
  height: 180px;
  margin-bottom: 90px;
}

.el-menu-item:last-child {
  height: 110px;
  margin-top: auto;
}
</style>
