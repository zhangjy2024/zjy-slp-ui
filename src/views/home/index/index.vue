<!-- 首页主页 -->
<template>
  <div class="home-index">
    <el-row :gutter="0">
      <!-- 个人资料 -->
      <el-col :span="24" style="padding: 0;">
        <module-card
          width="100% - 20px"
          height="100px"
          background-color="rgb(217, 236, 255)"
        >
          <template v-slot:body>
            <div style="display: flex; margin-top: 10px;">
              <div class="block"><el-avatar :size="70" :src="avatarSrc"></el-avatar></div>
              <div style="width: 400px; padding: 5px;"><h3 style="margin: 5px;">欢迎您：{{ userName }}</h3></div>
            </div>
          </template>
        </module-card>
      </el-col>
    </el-row>
    <el-row :gutter="0">
      <el-col :span="18" style="padding: 0;">
        <module-card title="我的待办" icon="el-icon-s-order" :divider="true" width="100% - 20px" height="325px" v-loading="myTasksLoading">
          <el-button slot="header" @click="openTodoList" type="text" style="float: right; padding: 5px">更多</el-button>
          <template v-slot:body>
            <div class="todo-items">
              <todo-item
                v-for="task in tasks"
                :key="task.id"
                :task="task"
                @click="toTaskDetail(task.id)"
              ></todo-item>
              <div v-if="tasks.length == 0">
                所有任务都完成啦！
              </div>
            </div>
          </template>
        </module-card>
        <table class="module-table">
          <tr>
            <td style="width: 50%; overflow: hidden;">
              <module-card title="我的组织" icon="el-icon-office-building" width="95%" height="400px">
                <template v-slot:body>
                  <div v-if="groups.length == 0">
                    暂无组织
                  </div>
                  <div v-else v-loading="myGroupsLoading" class="block">
                    <el-carousel trigger="click" :autoplay="false" style="height: 370px;">
                      <el-carousel-item v-for="group in groups" :key="group.id" style="height: 370px;">
                        <group-item :group="group"></group-item>
                      </el-carousel-item>
                    </el-carousel>
                  </div>
                </template>
              </module-card>
            </td>
            <td style="width: 50%; overflow: hidden;">
              <module-card title="我的群聊" icon="el-icon-chat-dot-square" width="95%" height="400px" v-loading="myRoomsLoading">
                <template v-slot:body>
                  <div v-if="rooms.length == 0">
                    暂无群聊
                  </div>
                  <div v-else style="margin-top: 7px; height: 370px; overflow: hidden; overflow-y: auto;">
                    <chat-room-item v-for="room in rooms" :key="room.id" :chatRoom="room"></chat-room-item>
                  </div>
                </template>
              </module-card>
            </td>
          </tr>
          <tr>
            <td style="width: 50%; overflow: hidden;">
              <module-card title="我的圈子" icon="el-icon-discover" :divider="true" width="95%" height="400px" v-loading="myCirclesLoading">
                <template v-slot:body>
                  <div v-if="circles.length == 0">
                    暂无圈子
                  </div>
                  <div v-else style="width: calc(100% - 10px); height: calc(100% - 300px);">
                    <div style="display: flex; padding: 0px 10px 5px;">
                      <img :src="circles[0].circleAvatarSrc" alt="圈子头像" width="70px" height="70px">
                      <div>
                        <h2 style="margin: 5px 10px;">{{ circles[0].name }}</h2>
                        <p style="margin: 5px 12px;">{{ circles[0].description }}</p>
                      </div>
                      <div style="margin-left: auto; height: 100%; padding: 10px 0px; display: flex;">
                        <div style="margin-right: 10px; padding: 0px;">
                          <i class="el-icon-user" style="font-size: 25px; margin: 5px;"></i>
                          {{ circles[0].userNum }}
                          <i class="el-icon-tickets" style="font-size: 25px; margin: 5px;"></i>
                          {{ circles[0].postsNum }}
                        </div>
                        <!-- <el-button type="primary" plain style="float: right; height: 40px;">签到</el-button> -->
                      </div>                    
                    </div>
                    <div>
                      <div v-for="posts in circles[0].postsList" :key="posts.id" style="margin: 4px 10px; display: flex; padding: 5px;background: linear-gradient(160deg, rgba(217, 236, 255, 0.8) 0%, rgba(0, 0, 0, 0) 70%)">
                        <img :src="posts.adminAvatarSrc" alt="博主头像" width="45px" height="45px" style="margin-right: 5px;">
                        <div style="max-width: 200px;">
                          <h3 style="margin: 0px;">{{ posts.title }}</h3>
                          <p style="margin: 0px; font-size: 14px;">{{ posts.postsSummary }}</p>
                        </div>
                        <div style="margin-left: auto;">
                          <i class="iconfont icon-like"></i> {{ posts.likes }}
                          <i class="el-icon-chat-line-square"></i> {{ posts.commentsNum }}
                        </div>
                      </div>
                      <div v-if="circles[0].postsList?.length > 4" style="display: flex; justify-content: center; align-items: center; margin-top: 10px;">
                        <el-link style="font-size: 20px;">----------查看更多----------</el-link>
                      </div>
                    </div>
                  </div>
                  
                </template>
              </module-card>
            </td>
            <td style="width: 50%; overflow: hidden;">
              <module-card title="我的文章" icon="el-icon-document" :divider="true" width="95%" height="400px" v-loading="myPostsLoading">
                <template v-slot:body>
                  <div v-if="postsList.length == 0">
                    暂无文章
                  </div>
                  <div v-else style="width: calc(100% - 10px); height: 350px; overflow: hidden; overflow-y: auto;">
                    <posts-item v-for="posts in postsList" :posts="posts"></posts-item>
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
         border: 1px solid rgba(217, 236, 255);">
          <div class="notification-header">通知</div>
          <el-collapse class="notification-bar">
            <div style="position: relative;">
              <div class="diy-badge" v-if="sysNotifyBadge"></div>
              <el-collapse-item title="系统通知" name="1">
                <notify-item v-for="notify in sysNotifyList" :key="notify.id" :notify="notify" @clearNotify="clearBadge"></notify-item>
              </el-collapse-item>
            </div>
            <div style="position: relative;">
              <div class="diy-badge" v-if="groupNotifyBadge"></div>
              <el-collapse-item title="组织通知" name="2">
                <notify-item v-for="notify in groupNotifyList" :key="notify.id" :notify="notify" @clearNotify="clearBadge"></notify-item>
              </el-collapse-item>
            </div>
            <div style="position: relative;">
              <div  class="diy-badge" v-if="circleNotifyBadge"></div>
              <el-collapse-item title="广场通知" name="3">
                <notify-item v-for="notify in circleNotifyList" :key="notify.id" :notify="notify" @clearNotify="clearBadge"></notify-item>
              </el-collapse-item>
            </div>
          </el-collapse>
        </div>
      </el-col>
    </el-row>
    <notify-detail
      :visible.sync="dialogVisible"
      :notification="currentNotification"
      @confirm="handleNotificationConfirm"
      @clear="handleNotificationClear"
    />
  </div>
</template>

<script>
import ModuleCard from '@/components/ModuleCard/index.vue';
import TodoItem from '../components/TodoItem.vue';
import GroupItem from '../components/GroupItem.vue';
import ChatRoomItem from '../components/ChatRoomItem.vue';
import PostsItem from '../components/PostsItem.vue';
import NotifyItem from '../components/NotifyItem.vue';
import NotifyDetail from '../components/NotifyDetail.vue'
import { getMyGroups } from '@/api/groups/groups';
import { getMyTasks } from '@/api/groups/tasks';
import { getMyRooms } from '@/api/contact/room';
import { getMyCircles } from '@/api/square/circle';
import { getMyPosts } from '@/api/square/posts';
import { getMyNotifies } from '@/api/notify';

export default {
  name: 'HOMEIndex',

  components: { ModuleCard, TodoItem, GroupItem, ChatRoomItem, PostsItem, NotifyItem, NotifyDetail },

  computed: {
    userInfo() {
      return JSON.parse(sessionStorage.getItem('user_info') || '{}');
    },
    userName() {
      return this.userInfo.userName || '您还未登录！';
    },
    avatarSrc() {
      return this.userInfo.avatarSrc;
    },
    sysNotifyBadge() {
      return this.sysNotifyList.some(notify => notify.gotIt === "N");
    },
    groupNotifyBadge() {
      return this.groupNotifyList.some(notify => notify.gotIt === "N");
    },
    circleNotifyBadge() {
      return this.circleNotifyList.some(notify => notify.gotIt === "N");
    },
  },

  data() {
    return {
      myGroupsLoading: true,
      myTasksLoading: true,
      myRoomsLoading: true,
      myCirclesLoading: true,
      myPostsLoading: true,

      tasks: [],
      groups: [],
      rooms: [],
      circles: [{}],
      postsList: [],

      sysNotifyList: [],
      groupNotifyList: [],
      circleNotifyList: [],
      
      dialogVisible: false,
      currentNotification: {
        id: '123',
        type: 'org',
        senderName: '张经理',
        senderAvatar: 'https://example.com/avatar.jpg',
        title: '关于下周项目评审的通知',
        content: '请各位团队成员准备好项目进展报告，下周一上午10点在会议室进行项目中期评审。\n\n需要准备材料：\n1. 项目进度报告\n2. 遇到的问题及解决方案\n3. 下一阶段计划',
        sendTime: new Date(),
        confirmed: false
      }
    }
  },

  methods: {
    openTodoList() {
      this.$router.replace('/home/todo')
    },
    toTaskDetail(taskId) {
      this.$router.push({
        name: 'ToDoDetail',
        query: {
          id: taskId
        },
      });
    },
    handleNotificationConfirm(id, withClear) {
      this.$message.success(`通知${id}已确认${withClear ? '并清除' : ''}`)
      // 这里调用API更新通知状态
      if (withClear) {
        this.dialogVisible = false
      } else {
        this.currentNotification.confirmed = true
      }
    },
    handleNotificationClear(id) {
      this.$message.success(`通知${id}已清除`)
      this.dialogVisible = false
      // 这里调用API清除通知
    },

    clearBadge(notifyId, notifyType) {
      const notifyLists = {
        g: this.groupNotifyList,
        c: this.circleNotifyList,
        s: this.sysNotifyList
      };
      const notifyList = notifyLists[notifyType];
      if (notifyList) {
        const index = notifyList.findIndex(notify => notify.id === notifyId);
        if (index !== -1) {
          this.$set(notifyList[index], 'gotIt', 'Y');
        }
      }
      this.dialogVisible = true
    },

    getMyGroups() {
      this.myGroupsLoading = true;
      getMyGroups().then((res) => {
        this.groups = res.data.data
      }).catch((error) => {
        console.log(error);
      }).finally(() => {
        this.myGroupsLoading = false;
      })
    },
    getMyTasks() {
      this.myTasksLoading = true;
      getMyTasks().then((res) => {
        this.tasks = res.data.data
      }).catch((error) => {
        console.log(error);
      }).finally(() => {
        this.myTasksLoading = false;
      })
    },
    getMyRooms() {
      this.myRoomsLoading = true;
      getMyRooms().then((res) => {
        this.rooms = res.data.data
      }).catch((error) => {
        console.log(error);
      }).finally(() => {
        this.myRoomsLoading = false;
      })
    },
    getMyCircles() {
      this.myCirclesLoading = true;
      getMyCircles().then((res) => {
        this.circles = res.data.data
      }).catch((error) => {
        console.log(error);
      }).finally(() => {
        this.myCirclesLoading = false;
      })
    },
    getMyPosts() {
      this.myPostsLoading = true;
      getMyPosts().then((res) => {
        this.postsList = res.data.data
      }).catch((error) => {
        console.log(error);
      }).finally(() => {
        this.myPostsLoading = false;
      })
    },
    getMyNotifies() {
      getMyNotifies().then((res) => {
        const { sysNotifyList, groupNotifyList, circleNotifyList } = res.data.data.reduce(
          (acc, item) => {
            if (item.groupId) {
              acc.groupNotifyList.push(item);
            } else if (item.circleId) {
              acc.circleNotifyList.push(item);
            } else {
              acc.sysNotifyList.push(item);
            }
            return acc;
          },
          { sysNotifyList: [], groupNotifyList: [], circleNotifyList: [] }
        );

        this.sysNotifyList = sysNotifyList;
        this.groupNotifyList = groupNotifyList;
        this.circleNotifyList = circleNotifyList;
      }).catch((error) => {
        console.log(error);
      })
    },
    
  },

  mounted() {
    this.getMyGroups();
    this.getMyTasks();
    this.getMyRooms();
    this.getMyCircles();
    this.getMyPosts();
    this.getMyNotifies();
  }
}
</script>

<style scoped>
.home-index {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
::v-deep .el-row {
  margin-bottom: 5px;
  &:last-child {
    margin-bottom: 0;
  }
}
::v-deep .el-col {
  padding: 0px;
  border-radius: 4px;
}
.block {
  margin: auto 0px;
}
.todo-items {
  height: 90% - 20px;
  padding: 5px;
  display: grid;
  box-sizing: border-box;
  justify-content: space-between;
  grid-template-columns: repeat(auto-fill, minmax(263px, 263px));
}
.module-table {
  width: 100%;
  table-layout: fixed;
}
.notification-header {
  width: calc(100% - 22px); 
  height: 50px; 
  display: flex;
  align-items: center; 
  padding-left: 15px; 
  font-size: 21px; 
  border-left: 6px solid rgba(217, 236, 255);
}
::v-deep .notification-bar .el-collapse-item__header {
  padding-left: 13px;
}
::v-deep .el-collapse-item__header {
  font-size: 18px;
}
.home-notify-item:hover .home-notify-content {
  background-color: rgb(236, 245, 255);
}
::v-deep .notification-bar .el-collapse-item__content {
  padding: 0;
}
.diy-badge {
  position: absolute; 
  width: 10px; 
  height: 10px; 
  background-color: red; 
  border-radius: 50%; 
  z-index: 99; 
  top: 10px; 
  left: 85px;
}
</style>