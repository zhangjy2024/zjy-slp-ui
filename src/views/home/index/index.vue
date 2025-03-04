<template>
  <!-- 首页主页 -->
  <div class="home-index">
    <el-row :gutter="20">
      <el-col :span="24">
        <div>
          
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="18"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
    </el-row>
  </div>
</template>



<style scoped>
.home-index {
  width: 100%;
}
.el-row {
  margin-bottom: 5px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  padding: 0px;
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>