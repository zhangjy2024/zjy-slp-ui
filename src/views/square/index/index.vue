<template>
  <div class="square-index" style="height: calc(100% - 50px);">
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
      <el-tooltip effect="dark" content="点击发布文章" placement="bottom-end">
        <el-button icon="el-icon-circle-plus-outline" style="margin-top: 13px; margin-right: 20px; font-size: 35px; padding: 0px; border-radius: 50%; background-color: rgba(0, 0, 0, 0); float: right; font-weight: bold;" @click="toAddPosts()"></el-button>
      </el-tooltip>
    </el-menu>
    <div class="backgroud">
      <el-row>
        <el-col :span="19" style="padding: 30px 40PX;">
          <div style="width: 100%; height: 100%; background-color: rgba(255, 255, 255, 0.85);">
            <div class="square-body-header" style="height: 120px; width: calc(100% - 20px); border: 10px solid white; border-bottom: 0px;">
              <div style="width: 100%; height: 120px; display: flex; background-color: rgb(240, 240, 240); border-radius: 10px;">
                <div v-for="i in 3" @click="activeCircle(i)" :class="{ activeCircle: activeCircleIndex === i }" style="width: 90px; height: calc(100% - 24px); background-color: rgba(240, 240, 240); margin: 6px 10px; padding: 6px 10px; border-radius: 6px;">
                  <img src="../../home/img/组织头像.png" alt="圈子头像" style="width: 50px; height: 50px; border-radius: 50%; display: block; margin: 0px auto;">
                  <h5 style="display: block; margin: 6px auto; text-align: center; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden;">圈子名称圈子名称圈子名称圈子名称</h5>
                </div>
              </div>
            </div>
            <div v-loading="false" class="square-body" style="display: flex; justify-content: center; flex-wrap: wrap; width: 100%;">
              <div v-for="i in 5" class="posts-card" style="width: calc(100% - 60px); height: 260px; margin: 10px 5px; box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;">
                <div style="display: flex;">
                  <img src="../../home/img/组织头像.png" alt="发布者头像" style="width: 54px; height: 54px; border-radius: 50%; margin: 12px 12px 0px;">
                  <div>
                    <div style="display: flex;">
                      <h3 style="margin: 5px 5px 0; margin-top: 13px;">发布者名称</h3>
                      <div>图标</div>
                    </div>
                    <div style="display: flex;">
                      <div>图标</div>
                      <p style="margin: 5px;">发布者标签</p>
                    </div>
                  </div>
                  <div style="height: 50px;margin-top: 17px; margin-left: auto; display: flex;">
                    <p style="margin: 10px 0px;">1279</p> <i class="el-icon-view" style="font-size: 24px; margin: 10px 5px; margin-right: 15px;"></i>
                    <p style="margin: 10px 0px;">132</p> <i class="iconfont icon-like" style="font-size: 23px; margin: 10px 5px; margin-right: 15px;"></i>
                    <p style="margin: 10px 0px;">124</p> <i class="el-icon-chat-line-square" style="font-size: 24px; margin: 9px 5px; margin-right: 15px;"></i>
                  </div>
                </div>
                <div style="margin: 0px 15px;">
                  <h2 style="margin: 2px; font-size: 23px;">文章题目</h2>
                  <p style="margin: 2px;">文章简略内容</p>
                </div>
                <div style="height: 130px; width: calc(100% - 30px); display: flex; justify-content: space-between; margin: 0px 15px;">
                  <div v-for="i in 3" style="width: 100%; height: 100%; display: flex; overflow: hidden;">
                    <img src="../../home/img/组织海报图.jpg" alt="文章内图片" style="height: calc(100% - 10px); width: calc(100% - 10px); margin: 5px; object-fit: cover;">
                  </div>
                </div>
              </div>
              <div v-for="i in 4" class="posts-card" style="width: calc(100% - 60px); height: 180px; margin: 10px 5px; box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;">
                <div style="display: flex;">
                  <img src="../../home/img/组织头像.png" alt="发布者头像" style="width: 54px; height: 54px; border-radius: 50%; margin: 12px 12px 0px;">
                  <div>
                    <div style="display: flex;">
                      <h3 style="margin: 5px 5px 0; margin-top: 13px;">发布者名称</h3>
                      <div>图标</div>
                    </div>
                    <div style="display: flex;">
                      <div>图标</div>
                      <p style="margin: 5px;">发布者标签</p>
                    </div>
                  </div>
                  <div style="height: 50px;margin-top: 17px; margin-left: auto; display: flex;">
                    <p style="margin: 10px 0px;">1279</p> <i class="el-icon-view" style="font-size: 24px; margin: 10px 5px; margin-right: 15px;"></i>
                    <p style="margin: 10px 0px;">132</p> <i class="iconfont icon-like" style="font-size: 23px; margin: 10px 5px; margin-right: 15px;"></i>
                    <p style="margin: 10px 0px;">124</p> <i class="el-icon-chat-line-square" style="font-size: 24px; margin: 9px 5px; margin-right: 15px;"></i>
                  </div>
                </div>
                <div style="margin: 0px 15px;">
                  <h2 style="margin: 2px; font-size: 23px;">文章题目</h2>
                  <p style="margin: 2px;">文章简略内容</p>
                </div>
              </div>
              <div style="width: 100%; height: 30px;"></div>
            </div>
          </div>
        </el-col>
        <el-col :span="5" style="height: 400px; padding-top: 30px;">
          <div style="width: calc(100% - 40px); height: 100%; box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset; border-radius: 5px; background-color: rgba(255, 255, 255, 0.85); margin-bottom: 40px;">
            <div class="header" style="padding: 5px 10px; display: flex;">
              <div style="font-size: 20px; font-weight: bold; padding-top: 5px">热门圈子</div> 
              <div style="padding-top: 6px; margin-left: auto; margin-right: 3px;"><el-button icon="el-icon-arrow-right" style="padding: 5px; background-color: rgba(217, 236, 255);"></el-button></div>
            </div>
            <div>
              <table style="width: calc(100% - 10px); margin: 0px 5px 2px; table-layout: fixed;">
                <tr style="flex-wrap: nowrap;">
                  <td style="min-width: 100px; padding-left: 8px; display: flex;">
                    <el-link style="font-size: 18px; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;">圈子名称aaaa啊啊啊啊啊啊啊啊a</el-link>
                    <i class="el-icon-medal-1" style="font-size: 24px; font-weight: bold; color: rgb(231, 168, 34); margin-top: 3px;"></i>
                  </td>
                  <td style="width: 80px; text-align: right; font-size: 17px; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">1234 <i class="iconfont icon-qunzu" style="font-size: 20px; margin-right: 9px;"></i></td>
                </tr>
                <tr>
                  <td style="padding-left: 8px; display: flex;">
                    <el-link style="font-size: 18px; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;">圈子名称啊啊啊啊啊啊啊啊啊啊啊啊啊</el-link>
                    <i class="el-icon-medal" style="font-size: 24px; font-weight: bold; color: rgb(200, 200, 200); margin-top: 3px;"></i>
                  </td>
                  <td style="text-align: right; font-size: 17px; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">1234 <i class="iconfont icon-qunzu" style="font-size: 20px; margin-right: 9px;"></i></td>
                </tr>
                <tr>
                  <td style="padding-left: 8px; display: flex;">
                    <el-link style="font-size: 18px; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;">圈子名称啊啊啊啊啊啊啊啊啊啊啊</el-link>
                    <i class="el-icon-medal" style="font-size: 24px; font-weight: bold; color: rgb(200, 136, 110); margin-top: 3px;"></i>
                  </td>
                  <td style="text-align: right; font-size: 17px; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">1234 <i class="iconfont icon-qunzu" style="font-size: 20px; margin-right: 9px;"></i></td>
                </tr>
                <tr v-for="i in 7">
                  <td style="padding-left: 8px;">
                    <el-link style="font-size: 18px; line-height: 29px; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;">圈子名称啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊</el-link>
                  </td>
                  <td style="text-align: right; font-size: 17px; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">1234 <i class="iconfont icon-qunzu" style="font-size: 20px; margin-right: 9px;"></i></td>
                </tr>
              </table>
            </div>
          </div>
          <div style="width: calc(100% - 40px); height: 100%; box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset; border-radius: 5px; background-color: rgba(255, 255, 255, 0.85);">
            <div class="header" style="padding: 5px 10px; display: flex;">
              <div style="font-size: 20px; font-weight: bold; padding-top: 5px">热门话题</div> 
              <div style="padding-top: 6px; margin-left: auto; margin-right: 3px;"><el-button icon="el-icon-arrow-right" style="padding: 5px; background-color: rgba(217, 236, 255);"></el-button></div>
            </div>
            <table style="width: calc(100% - 10px); margin-bottom: 2px; margin-left: 10px;">
              <tr>
                <td>
                  <el-link style="font-size: 18px; line-height: 29px; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;">#话题名称啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊</el-link>
                </td>
                <td style="text-align: right; font-size: 17px; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">1234 <i class="iconfont icon-icon" style="font-size: 23px; font-weight: bold; margin-right: 14px; color: red;"></i></td>
              </tr>
              <tr>
                <td>
                  <el-link style="font-size: 18px; line-height: 29px; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;">#话题名称啊啊啊啊啊啊啊啊啊啊啊啊</el-link>
                </td>
                <td style="text-align: right; font-size: 17px; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">1234 <i class="iconfont icon-icon" style="font-size: 23px; font-weight: bold; margin-right: 14px; color: rgb(242, 114, 71);"></i></td>
              </tr>
              <tr>
                <td>
                  <el-link style="font-size: 18px; line-height: 29px; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;">#话题名称啊啊啊啊啊啊啊啊啊啊</el-link>
                </td>
                <td style="text-align: right; font-size: 17px; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">1234 <i class="iconfont icon-icon" style="font-size: 23px; font-weight: bold; margin-right: 14px; color: rgb(247, 206, 170);"></i></td>
              </tr>
              <tr v-for="i in 7">
                <td>
                  <el-link style="font-size: 18px; line-height: 29px; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;">#话题名称啊啊啊啊啊啊啊啊啊啊啊</el-link>
                </td>
                <td style="text-align: right; font-size: 17px; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">1234 <i class="iconfont icon-icon" style="font-size: 23px; font-weight: bold; margin-right: 14px; color: rgb(200, 200, 200);"></i></td>
              </tr>
            </table>
          </div>
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
  background-repeat: repeat;
}
.el-submenu__title {
  font-weight: bold;
}
.activeCircle {
  background-color: white !important;
}
.posts-card:hover {
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px !important;
  background-color: white;
}
</style>