<template>
  <el-container>
    <el-aside class="left-content" width="200px">
      <!-- 左侧菜单栏 -->
      <sidebar></sidebar>
    </el-aside>
    <el-main>
      <!-- 右侧内容 -->
      <app-main></app-main>
    </el-main>
  </el-container>
</template>

<script>
import { AppMain, Sidebar } from './components'

export default {
  name: 'Layout',
  components: { AppMain, Sidebar },
  
}

</script>

<style scoped>
.left-content {
  overflow: hidden;
}
.el-main {
  padding: 0px;
}
</style>