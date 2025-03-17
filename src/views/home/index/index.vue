<!-- 首页主页 -->
<template>
  <div class="home-index">
    <el-row :gutter="0">
      <el-col :span="24" style="padding: 0;">
        <div>
          <module-card
            width="100% - 20px"
            height="100px"
            background-color="rgb(217, 236, 255)"
          >
            <template v-slot:body>
              <div style="display: flex; margin-top: 10px;">
                <div class="block"><el-avatar :size="70" :src="circleUrl"></el-avatar></div>
                <div style="width: 400px; padding: 5px;"><h3 style="margin: 5px;">欢迎您：</h3></div>
              </div>
            </template>
          </module-card>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="0">
      <el-col :span="18" style="padding: 0;">
        <module-card title="我的待办" icon="el-icon-s-order" :divider="true" width="100% - 20px" height="325px">
          <el-button slot="header" @click="openTodoDetail" type="text" style="float: right; padding: 5px">更多</el-button>
          <template v-slot:body>
            <div class="todoItems">
              <todo-item
                v-for="item in taskList"
                :group-name="item.groupName"
                :task-designee="item.taskDesignee"
                :task-end-date="item.taskEndDate"
                :task-detail="item.taskDetail"
              ></todo-item>
            </div>
          </template>
        </module-card>
        <table class="moduleTable">
          <tr>
            <td style="width: 50%; overflow: hidden;">
              <module-card title="我的组织" icon="el-icon-office-building" width="95%" height="400px">
                <template v-slot:body>
                  <div class="block">
                    <el-carousel trigger="click" :autoplay="false" style="height: 370px;">
                      <el-carousel-item v-for="item in 4" :key="item" style="height: 370px;">
                        <group-item></group-item>
                      </el-carousel-item>
                    </el-carousel>
                  </div>
                </template>
              </module-card>
            </td>
            <td style="width: 50%; overflow: hidden;">
              <module-card title="我的群聊" icon="el-icon-chat-dot-square" width="95%" height="400px">
                <template v-slot:body>
                  <div style="margin-top: 7px; height: 370px; overflow: hidden; overflow-y: auto;">
                    <div v-for="i in 7" class="chat-room-item">
                      <img src="../img/组织头像.png" alt="群聊头像" style="width: 60px; height: 60px; border-radius: 50%; margin: 10px 7px;">
                      <div>
                        <h3 style="margin: 10px 0px;">群聊名称</h3>
                        <div>最新消息</div>
                      </div>
                      <div style="margin: 15px; margin-left: auto;">
                        <el-badge :value="3" class="item" style="margin-left: 60px;"></el-badge>
                        <div style="color: rgba(0, 0, 0, 0.4);">2025-5-10</div>
                      </div>
                    </div>
                  </div>
                </template>
              </module-card>
            </td>
          </tr>
          <tr>
            <td style="width: 50%; overflow: hidden;">
              <module-card
                title="我的圈子"
                icon="el-icon-discover"
                :divider="true"
                width="95%"
                height="400px">
                <template v-slot:body>
                  <div style="width: 100% - 10px; height: 360px;">
                    <div style="display: flex; padding: 0px 10px 5px;">
                      <img src="../img/组织头像.png" alt="圈子头像" width="70px" height="70px">
                      <div>
                        <h2 style="margin: 5px 10px;">圈子标题</h2>
                        <p style="margin: 5px 12px;">圈子简介</p>
                      </div>
                      <div style="margin-left: auto; height: 100%; padding: 10px 0px; display: flex;">
                        <div style="margin-right: 10px; padding: 0px;">
                          <i class="el-icon-user" style="font-size: 25px; margin: 5px;"></i>
                          15
                          <i class="el-icon-tickets" style="font-size: 25px; margin: 5px;"></i>
                          30
                        </div>
                        <el-button type="primary" plain style="float: right; height: 40px;">签到</el-button>
                      </div>                    
                    </div>
                    <div>
                      <div v-for="i in 4" style="margin: 4px 10px; display: flex; padding: 5px;background: linear-gradient(160deg, rgba(217, 236, 255, 0.8) 0%, rgba(0, 0, 0, 0) 70%)">
                        <img src="../img/组织头像.png" alt="博主头像" width="45px" height="45px" style="margin-right: 5px;">
                        <div style="max-width: 200px;">
                          <h3 style="margin: 0px;">文章标题</h3>
                          <p style="margin: 0px;">文章内容截取</p>
                        </div>
                        <div style="margin-left: auto;">
                          <i class="iconfont icon-like"></i> 12
                          <i class="el-icon-chat-line-square"></i> 24
                        </div>
                      </div>
                      <div style="display: flex; justify-content: center; align-items: center; margin-top: 10px;">
                        <el-link style="font-size: 20px;">----------查看更多----------</el-link>
                      </div>
                    </div>
                  </div>
                </template>
              </module-card>
            </td>
            <td style="width: 50%; overflow: hidden;">
              <module-card title="我的文章" icon="el-icon-document" :divider="true" width="95%" height="400px">
                <template v-slot:body>
                  <div style="width: 100% - 10px; height: 360px; overflow: hidden; overflow-y: auto;">
                    <div v-for="i in 6" style="margin-bottom: 5px; padding: 3px; border-left: 6px solid rgba(217, 236, 255); border-top: 1px solid rgba(217, 236, 255);">
                      <h2 style="margin: 0px 5px;">文章标题</h2>
                      <div style="display: flex;">
                        <el-tag size="small" style="margin: 2px 5px;">文章标签</el-tag>
                        <p style="margin: 0px;">文章内容截取</p>
                      </div>
                    </div>
                  </div>
                </template>
              </module-card>
            </td>
          </tr>
        </table>
      </el-col>
      <el-col :span="6" style="padding: 0; height: 100%;">
        <div
         style="background-color: white;
         width: calc(100% - 10px);
         height: calc(100vh - 150px);
         margin: 5px;
         position: -webkit-sticky;
         position: sticky;
         top: 150px;
         overflow-y: auto;
         border: 1px solid rgba(217, 236, 255);
         ">
          <div class="header" style="width: calc(100% - 22px); height: 50px; display: flex;align-items: center; padding-left: 15px; font-size: 21px; border-left: 6px solid rgba(217, 236, 255);">通知</div>
          <el-collapse class="notification-bar">
            <el-collapse-item title="系统通知" name="1">
              <div class="home-notify-item" style="display: flex;">
                <div class="home-notify-content" style="padding: 10px 0px; padding-left: 10px;">
                  <img src="../img/组织头像.png" alt="系统图片" width="46px" height="46px" style="border-radius: 50%; margin-top: 3px;">
                </div>
                <div class="home-notify-content" style="padding: 10px 0px; padding-right: 10px;">
                  <h3 style="margin: 0px; margin-left: 5px; line-height: 20px;">通知标题</h3>
                  <p style="margin: 0px; margin-left: 5px; line-height: 17px; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden;">
                    &ensp;&ensp;&ensp;&ensp;通知内容啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊
                  </p>
                </div>
              </div>
            </el-collapse-item>
            <el-collapse-item title="组织通知" name="2">
              <div v-for="i in 13" class="home-notify-item" style="display: flex;">
                <div class="home-notify-content" style="padding: 10px 0px; padding-left: 10px;">
                  <img src="../img/组织头像.png" alt="系统图片" width="46px" height="46px" style="border-radius: 50%; margin-top: 3px;">
                </div>
                <div class="home-notify-content" style="padding: 10px 0px; padding-right: 10px;">
                  <h3 style="margin: 0px; margin-left: 5px; line-height: 20px;">通知标题</h3>
                  <p style="margin: 0px; margin-left: 5px; line-height: 17px; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden;">
                    &ensp;&ensp;&ensp;&ensp;通知内容啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊
                  </p>
                </div>
              </div>
            </el-collapse-item>
            <el-collapse-item title="广场通知" name="3">
              <div v-for="i in 14" class="home-notify-item" style="display: flex;">
                <div class="home-notify-content" style="padding: 10px 0px; padding-left: 10px;">
                  <img src="../img/组织头像.png" alt="系统图片" width="46px" height="46px" style="border-radius: 50%; margin-top: 3px;">
                </div>
                <div class="home-notify-content" style="padding: 10px 0px; padding-right: 10px;">
                  <h3 style="margin: 0px; margin-left: 5px; line-height: 20px;">通知标题</h3>
                  <p style="margin: 0px; margin-left: 5px; line-height: 17px; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden;">
                    &ensp;&ensp;&ensp;&ensp;通知内容啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊
                  </p>
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ModuleCard from '@/components/ModuleCard.vue';
import TodoItem from '../components/TodoItem.vue';
import GroupItem from '../components/GroupItem.vue';

export default {
  name: 'HOMEIndex',

  components: { ModuleCard, TodoItem, GroupItem },

  data() {
    return {
      circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      taskList: [
        {
          groupName: '任务一',
          taskDesignee: '张三',
          taskEndDate: '2025-4-10',
          taskDetail: '一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一'
        },
        {
          groupName: '任务二',
          taskDesignee: '张三',
          taskEndDate: '2025-4-10',
          taskDetail: '一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一'
        },
        {
          groupName: '任务三',
          taskDesignee: '张三',
          taskEndDate: '2025-4-10',
          taskDetail: '一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一'
        },
        {
          groupName: '任务三',
          taskDesignee: '张三',
          taskEndDate: '2025-4-10',
          taskDetail: '一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一'
        },
        {
          groupName: '任务三',
          taskDesignee: '张三',
          taskEndDate: '2025-4-10',
          taskDetail: '一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一'
        },
        {
          groupName: '任务三',
          taskDesignee: '张三',
          taskEndDate: '2025-4-10',
          taskDetail: '一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一'
        },
        {
          groupName: '任务三',
          taskDesignee: '张三',
          taskEndDate: '2025-4-10',
          taskDetail: '一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一'
        }
      ],
    }
  },

  methods: {
    openTodoDetail() {
      this.$router.replace('/home/todo')
    },
    
  }
}
</script>

<style>
.home-index {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
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
.block {
  margin: auto 0px;
}
.todoItems {
  height: 90% - 20px;
  padding: 5px;
  display: grid;
  box-sizing: border-box;
  justify-content: space-between;
  grid-template-columns: repeat(auto-fill, minmax(263px, 263px));
}
.moduleTable {
  width: 100%;
  table-layout: fixed;
}
.chat-room-item {
  width: 100% - 10px;
  height: 85px;
  display: flex;
  margin-bottom: -1px;
  border: 1px solid rgba(217, 236, 255);
}
.notification-bar .el-collapse-item__header {
  padding-left: 13px;
}
.el-collapse-item__header {
  font-size: 18px;
}
.home-notify-item:hover .home-notify-content {
  background-color: rgb(236, 245, 255);
}
.notification-bar .el-collapse-item__content {
  padding: 0;
}
</style>