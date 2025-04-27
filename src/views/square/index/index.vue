<template>
  <div class="square-index" style="height: calc(100% - 150px);">
    <el-menu style="background-color: rgba(217, 236, 255); width: calc(100vw - 167px); border-left: 5px solid rgba(64, 158, 255);" class="el-menu-demo" mode="horizontal" @select="handleSelect" :router="true">
      <el-menu-item index="/square/index" style="font-weight: bold">等级图标</el-menu-item>
      <el-submenu index="2">
        <template slot="title" style="font-weight: bold">消息</template>
        <el-menu-item index="2-1">收到的赞</el-menu-item>
        <el-menu-item index="2-2">评论</el-menu-item>
        <el-menu-item index="2-3">系统通知</el-menu-item>
      </el-submenu>
      <el-menu-item index="/square/favorites" style="font-weight: bold">收藏</el-menu-item>
      <el-menu-item index="/square/history" style="font-weight: bold">历史</el-menu-item>
      <el-tooltip effect="dark" content="点击发布文章" placement="bottom-end">
        <el-button icon="el-icon-circle-plus-outline" style="margin-top: 13px; margin-right: 20px; font-size: 35px; padding: 0px; border-radius: 50%; background-color: rgba(0, 0, 0, 0); float: right; font-weight: bold;" @click="toAddPosts()"></el-button>
      </el-tooltip>
    </el-menu>
    <div style="height: calc(100% - 60px)">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      // console.log(key, keyPath);
    },
    activeCircle(i) {
      this.activeCircleIndex = i
    },
    toAddPosts(){
      this.$router.replace('/square/addPosts')
    }
  }
}
</script>

<style scoped>
::v-deep .el-menu--popup {
  min-width: 100px;
  border-radius: 10px;
}
::v-deep .el-menu-demo li:first-child {
  margin-right: calc(100vw - 700px);
}
::v-deep .el-submenu__title {
  font-weight: bold;
}
</style>