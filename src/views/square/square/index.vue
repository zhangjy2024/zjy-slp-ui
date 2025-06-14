<template>
  <div class="backgroud">
    <el-row>
      <el-col :span="19" style="padding: 30px 40PX;">
        <div style="width: 100%; height: 100%; background-color: rgba(255, 255, 255, 0.85);">
          <div class="square-body-header" style="height: 120px; width: calc(100% - 20px); border: 10px solid white; border-bottom: 0px;">
            <div style="width: 100%; height: 120px; display: flex; background-color: rgb(240, 240, 240); border-radius: 10px;">
              <div @click="activeCircle(0)" :class="{ activeCircle: activeCircleIndex === 0 }" style="width: 90px; height: calc(100% - 24px); background-color: rgba(240, 240, 240); margin: 6px 10px; padding: 6px 10px; border-radius: 6px;">
                <img src="../../home/img/组织头像.png" alt="圈子头像" style="width: 50px; height: 50px; border-radius: 50%; display: block; margin: 0px auto;">
                <h5 style="display: block; margin: 6px auto; text-align: center; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden;">广场主页</h5>
              </div>
              <div @click="activeCircle(i)" :class="{ activeCircle: activeCircleIndex === i }" style="width: 90px; height: calc(100% - 24px); background-color: rgba(240, 240, 240); margin: 6px 10px; padding: 6px 10px; border-radius: 6px;">
                <img src="../../home/img/组织头像.png" alt="圈子头像" style="width: 50px; height: 50px; border-radius: 50%; display: block; margin: 0px auto;">
                <h5 style="display: block; margin: 6px auto; text-align: center; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden;">前端开发交流</h5>
              </div>
            </div>
          </div>
          <div v-loading="false" class="square-body" style="display: flex; justify-content: center; flex-wrap: wrap; width: 100%;">
            <posts-item></posts-item>
            <div class="posts-card" style="width: calc(100% - 60px); height: 180px; margin: 10px 5px; box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;">
              <div style="display: flex;">
                <img src="../../home/img/组织头像.png" alt="发布者头像" style="width: 54px; height: 54px; border-radius: 50%; margin: 12px 12px 0px;">
                <div>
                  <div style="display: flex;">
                    <h3 style="margin: 5px 5px 0; margin-top: 13px;">testUser</h3>
                    <!-- <div>图标</div> -->
                  </div>
                  <div style="display: flex;">
                    <!-- <div>图标</div> -->
                    <p style="margin: 5px;">前端开发交流</p>
                  </div>
                </div>
                <div style="height: 50px;margin-top: 17px; margin-left: auto; display: flex;">
                  <p style="margin: 10px 0px;">1279</p> <i class="el-icon-view" style="font-size: 24px; margin: 10px 5px; margin-right: 15px;"></i>
                  <p style="margin: 10px 0px;">132</p> <i class="iconfont icon-like" style="font-size: 23px; margin: 10px 5px; margin-right: 15px;"></i>
                  <p style="margin: 10px 0px;">124</p> <i class="el-icon-chat-line-square" style="font-size: 24px; margin: 9px 5px; margin-right: 15px;"></i>
                </div>
              </div>
              <div style="margin: 0px 15px;">
                <h2 style="margin: 2px; font-size: 23px;">前端开发交流圈建立啦，快来加入我们吧！</h2>
                <p style="margin: 2px;">每天分享前端开发经验，助力知识共享共同进步！</p>
              </div>
            </div>
            <div style="width: 100%; height: 30px;"></div>
          </div>
        </div>
      </el-col>
      <el-col :span="5" style="height: 400px; padding-top: 30px;">
        <!-- 热门圈子 -->
        <div style="width: calc(100% - 40px); height: 100%; box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset; border-radius: 5px; background-color: rgba(255, 255, 255, 0.85); margin-bottom: 40px;">
          <div class="header" style="padding: 5px 10px; display: flex;">
            <div style="font-size: 20px; font-weight: bold; padding-top: 5px">热门圈子</div> 
            <div style="padding-top: 6px; margin-left: auto; margin-right: 3px;"><el-button @click="toCircleIndex" icon="el-icon-arrow-right" style="padding: 5px; background-color: rgba(217, 236, 255);"></el-button></div>
          </div>
          <div>
            <table style="width: calc(100% - 10px); margin: 0px 5px 2px; table-layout: fixed;">
              <tr style="flex-wrap: nowrap;">
                <td style="min-width: 100px; padding-left: 8px; display: flex;">
                  <el-tooltip class="item" effect="light" :content="circleList[0].name" placement="top" :key="circleList[0].id">
                    <el-link @click="handleCircleRowClick(circleList[0])" style="font-size: 18px; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;">{{ circleList[0].name }}</el-link>
                  </el-tooltip>
                  <i class="el-icon-medal-1" style="font-size: 24px; font-weight: bold; color: rgb(231, 168, 34); margin-top: 3px;"></i>
                </td>
                <td style="width: 80px; text-align: right; font-size: 17px; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">{{ circleList[0].memberNum }} <i class="iconfont icon-qunzu" style="font-size: 20px; margin-right: 9px;"></i></td>
              </tr>
              <tr>
                <td style="padding-left: 8px; display: flex;">
                  <el-tooltip class="item" effect="light" :content="circleList[1].name" placement="top" :key="circleList[1].id">
                    <el-link @click="handleCircleRowClick(circleList[1])" style="font-size: 18px; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;">{{ circleList[1].name }}</el-link>
                  </el-tooltip>
                  <i class="el-icon-medal" style="font-size: 24px; font-weight: bold; color: rgb(200, 200, 200); margin-top: 3px;"></i>
                </td>
                <td style="text-align: right; font-size: 17px; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">{{ circleList[1].memberNum }} <i class="iconfont icon-qunzu" style="font-size: 20px; margin-right: 9px;"></i></td>
              </tr>
              <tr>
                <td style="padding-left: 8px; display: flex;">
                  <el-tooltip class="item" effect="light" :content="circleList[2].name" placement="top" :key="circleList[2].id">
                    <el-link @click="handleCircleRowClick(circleList[2])" style="font-size: 18px; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;">{{ circleList[2].name }}</el-link>
                  </el-tooltip>
                  <i class="el-icon-medal" style="font-size: 24px; font-weight: bold; color: rgb(200, 136, 110); margin-top: 3px;"></i>
                </td>
                <td style="text-align: right; font-size: 17px; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">{{ circleList[2].memberNum }} <i class="iconfont icon-qunzu" style="font-size: 20px; margin-right: 9px;"></i></td>
              </tr>
              <!-- <tr v-for="item in circleList.slice(3)" :key="item.id">
                <td style="padding-left: 8px;">
                  <el-tooltip class="item" effect="light" :content="item.name" placement="top">
                    <el-link @click="handleCircleRowClick(item)" style="font-size: 18px; line-height: 29px; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;">{{ item.name }}</el-link>
                  </el-tooltip>
                </td>
                <td style="text-align: right; font-size: 17px; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">{{ item.memberNum }} <i class="iconfont icon-qunzu" style="font-size: 20px; margin-right: 9px;"></i></td>
              </tr> -->
            </table>
          </div>
        </div>
        <!-- 热门话题 -->
        <div style="width: calc(100% - 40px); height: 100%; box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset; border-radius: 5px; background-color: rgba(255, 255, 255, 0.85);">
          <div class="header" style="padding: 5px 10px; display: flex;">
            <div style="font-size: 20px; font-weight: bold; padding-top: 5px">热门话题</div> 
            <div style="padding-top: 6px; margin-left: auto; margin-right: 3px;"><el-button @click="toTopicIndex" icon="el-icon-arrow-right" style="padding: 5px; background-color: rgba(217, 236, 255);"></el-button></div>
          </div>
          <table style="width: calc(100% - 10px); margin-bottom: 2px; margin-left: 10px;">
            <tr>
              <td>
                <el-tooltip class="item" effect="light" :content="topicList[0].name" placement="top">
                  <el-link @click="handleTopicRowClick(topicList[0])" style="font-size: 18px; line-height: 29px; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;">#{{ topicList[0].name }}</el-link>
                </el-tooltip>
              </td>
              <td style="text-align: right; font-size: 17px; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">{{ topicList[0].postsNum }} <i class="iconfont icon-icon" style="font-size: 23px; font-weight: bold; margin-right: 14px; color: red;"></i></td>
            </tr>
            <tr>
              <td>
                <el-tooltip class="item" effect="light" :content="topicList[1].name" placement="top">
                  <el-link @click="handleTopicRowClick(topicList[1])" style="font-size: 18px; line-height: 29px; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;">#{{ topicList[1].name }}</el-link>
                </el-tooltip>
              </td>
              <td style="text-align: right; font-size: 17px; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">{{ topicList[1].postsNum }} <i class="iconfont icon-icon" style="font-size: 23px; font-weight: bold; margin-right: 14px; color: rgb(242, 114, 71);"></i></td>
            </tr>
            <tr>
              <td>
                <el-tooltip class="item" effect="light" :content="topicList[2].name" placement="top">
                  <el-link @click="handleTopicRowClick(topicList[2])" style="font-size: 18px; line-height: 29px; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;">#{{ topicList[2].name }}</el-link>
                </el-tooltip>
              </td>
              <td style="text-align: right; font-size: 17px; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">{{ topicList[2].postsNum }} <i class="iconfont icon-icon" style="font-size: 23px; font-weight: bold; margin-right: 14px; color: rgb(247, 206, 170);"></i></td>
            </tr>
            <tr v-for="item in topicList.slice(3)">
              <td>
                <el-tooltip class="item" effect="light" :content="item.name" placement="top">
                  <el-link @click="handleTopicRowClick(item)" style="font-size: 18px; line-height: 29px; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;">#{{ item.name }}</el-link>
                </el-tooltip>
              </td>
              <td style="text-align: right; font-size: 17px; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">{{ item.postsNum }} <i class="iconfont icon-icon" style="font-size: 23px; font-weight: bold; margin-right: 14px; color: rgb(200, 200, 200);"></i></td>
            </tr>
          </table>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PostsItem from '@/views/square/components/PostsItem.vue';

export default {
  components: {
    PostsItem,
  },
  data() {
    return {
      activeCircleIndex: 0,
      circleList: [
        {
          id: 1,
          name: '前端开发交流',
          memberNum: 1245
        },
        {
          id: 2,
          name: '产品经理俱乐部',
          memberNum: 892
        },
        {
          id: 3,
          name: '设计师交流圈',
          memberNum: 765
        },
      ],
      topicList: [
        {
          id: 1,
          name: 'Vue.js',
          postsNum: 1245
        },
        {
          id: 1,
          name: 'React',
          postsNum: 987
        },
        {
          id: 1,
          name: '前端性能优化',
          postsNum: 765
        },
        {
          id: 1,
          name: 'TypeScript',
          postsNum: 543
        },
        {
          id: 1,
          name: 'Node.js',
          postsNum: 423
        },
        {
          id: 1,
          name: 'WebPack',
          postsNum: 312
        },
      ]
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    activeCircle(i) {
      this.activeCircleIndex = i
    },
    toAddPosts() {
      this.$router.replace('/square/addPosts')
    },
    toCircleIndex() {
      this.$router.replace('/square/circle/index')
    },
    toTopicIndex() {
      this.$router.replace('/square/topic/index')
    },
    handleCircleRowClick(row) {
      this.$router.push({
        name: 'CircleDetail',
        query: {
          id: row.id
        },
      });
    },
    handleTopicRowClick(row) {
      this.$router.push({
        name: 'TopicDetail',
        query: {
          id: row.id
        },
      });
    }
  }
}
</script>

<style>
.backgroud {
  overflow: auto;
  width: 100%;
  height: 100%;
  background-color: rgb(245, 245, 245);
  background-image: url("../img/background.png");
  background-size: 100% auto;
  background-position: top center;
  background-repeat: repeat;
}
.activeCircle {
  background-color: white !important;
}
.posts-card:hover {
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px !important;
  background-color: white;
}
</style>