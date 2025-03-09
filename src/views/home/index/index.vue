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
                    </div>
                  </div>
                </template>
              </module-card>
            </td>
          </tr>
          <tr>
            <td style="width: 50%; overflow: hidden;">
              <module-card title="我的圈子" icon="el-icon-discover" :divider="true" width="95%" height="400px">

              </module-card>
            </td>
            <td style="width: 50%; overflow: hidden;">
              <module-card title="我的文章" icon="el-icon-document" :divider="true" width="95%" height="400px">

              </module-card>
            </td>
          </tr>
        </table>
      </el-col>
      <el-col :span="6" style="padding: 0;"><div class="grid-content bg-purple"></div></el-col>
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
  padding: 5px;
  margin-bottom: -1px;
  background-color: antiquewhite;
  border: 1px solid black;
}
</style>