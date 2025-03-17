<template>
  <div class="square-index">
    <el-menu style="background-color: rgba(217, 236, 255); position: fixed; z-index: 99; top: 0px; left: 160px; width: calc(100vw - 185px); border-left: 5px solid rgba(64, 158, 255);" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="0" style="font-weight: bold">等级图标</el-menu-item>
      <el-submenu index="2">
        <template slot="title" style="font-weight: bold">消息</template>
        <el-menu-item index="2-1">收到的赞</el-menu-item>
        <el-menu-item index="2-2">评论</el-menu-item>
        <el-menu-item index="2-3">系统通知</el-menu-item>
      </el-submenu>
      <el-menu-item index="1" style="font-weight: bold">收藏</el-menu-item>
      <el-menu-item index="3" style="font-weight: bold">历史</el-menu-item>
      <el-button icon="el-icon-circle-plus-outline" style="margin-top: 13px; margin-right: 20px; font-size: 35px; padding: 0px; border-radius: 50%; background-color: rgba(0, 0, 0, 0); float: right; font-weight: bold;" @click="toAddPosts()"></el-button>
      <p style="float: right; font-size: 14px; margin-top: 21px;">点击发布文章&nbsp;</p>
    </el-menu>
    <div class="backgroud">
      <el-row>
        <el-col :span="18" style="padding: 30px 40PX;">
          <div style="width: 100%; height: 100%; background-color: white;">
            <div class="square-body-header" style="height: 120px; width: calc(100% - 20px); border: 10px solid white; border-bottom: 0px;">
              <div style="width: 100%; height: 120px; display: flex; background-color: rgb(240, 240, 240); border-radius: 10px;">
                <div v-for="i in 3" @click="activeCircle(i)" :class="{ activeCircle: activeCircleIndex === i }" style="width: 90px; height: calc(100% - 24px); background-color: rgba(240, 240, 240); margin: 6px 10px; padding: 6px 10px; border-radius: 6px;">
                  <img src="../../home/img/组织头像.png" alt="圈子头像" style="width: 50px; height: 50px; border-radius: 50%; display: block; margin: 0px auto;">
                  <h5 style="display: block; margin: 6px auto; text-align: center; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden;">圈子名称圈子名称圈子名称圈子名称</h5>
                </div>
              </div>
            </div>
            <div class="square-body" style="display: flex; justify-content: center; flex-wrap: wrap; width: 100%;">
              <div v-for="i in 6" style="width: calc(100% - 60px); height: 260px; margin: 10px 5px; border: 1px solid rgba(64, 158, 255);">
                <img src="../../home/img/组织头像.png" alt="发布者头像" style="width: 50px; height: 50px; border-radius: 50%; margin: 15px;">

              </div>
              <div style="width: 100%; height: 30px;"></div>
            </div>
          </div>
        </el-col>
        <el-col :span="6" style="height: 400px; padding-top: 30px;">
          <div style="width: calc(100% - 40px); height: 100%; background-color: aquamarine; margin-bottom: 40px; display: flex;">
            
          </div>
          <div style="width: calc(100% - 40px); height: 100%; background-color: aquamarine;"></div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1',
      activeCircleIndex: 1,
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
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

<style>
.el-menu--popup {
  min-width: 100px;
  border-radius: 10px;
}
.el-menu-demo li:first-child {
  margin-right: calc(100vw - 700px);
}
.backgroud {
  width: 100%;
  margin-top: 50px;
  background-color: rgb(245, 245, 245);
  background-image: url("../img/background.png");
  background-size: 100% auto;
  background-position: top center;
  background-repeat: no-repeat;
}
.el-submenu__title {
  font-weight: bold;
}
.activeCircle {
  background-color: white !important;
}
</style>