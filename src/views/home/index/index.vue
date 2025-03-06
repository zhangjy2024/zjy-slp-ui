<template>
  <!-- 首页主页 -->
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
        <module-card title="我的待办" :divider="true" width="100% - 20px" height="340px">
          <el-button slot="header" @click="openTodoDetail" type="text" style="float: right; padding: 5px">更多</el-button>
          <template v-slot:body>
            <todo-item
              v-for="item in taskList"
              :group-name="item.groupName"
              :task-designee="item.taskDesignee"
              :task-end-date="item.taskEndDate"
              :task-detail="item.taskDetail"
            ></todo-item>
          </template>
        </module-card>
      </el-col>
      <el-col :span="6" style="padding: 0;"><div class="grid-content bg-purple"></div></el-col>
    </el-row>
  </div>
</template>

<script>
import ModuleCard from '@/components/ModuleCard.vue';
import TodoItem from '../components/TodoItem.vue';

export default {
  name: 'HOMEIndex',

  components: { ModuleCard, TodoItem },

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
        }
      ]
    }
  },

  methods: {
    openTodoDetail() {
      this.$router.replace('/home/todo')
    }
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

.table:hover {
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
}
</style>