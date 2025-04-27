<template>
  <div class="todo-page-container">
    <el-row :gutter="20">
      <!-- 左侧待办列表区域 (8/12) -->
      <el-col :span="19">
        <div class="todo-list-container">
          <h2 class="todo-title">我的待办</h2>
          <div class="todo-items-wrapper">
            <!-- 使用您提供的TodoItem组件 -->
            <TodoItem 
              v-for="(task, index) in todoList" 
              :key="index" 
              :task="task" 
              class="todo-item-card"
              @click=""
            />
          </div>
          <!-- 分页控件 -->
          <el-pagination
            class="todo-pagination"
            background
            layout="prev, pager, next"
            :total="totalTasks"
            :page-size="pageSize"
            :current-page="currentPage"
            @current-change="handlePageChange"
          />
        </div>
      </el-col>
      
      <!-- 右侧空白区域 (3/12) -->
      <el-col :span="5">
        <div class="right-side-placeholder">
          <el-card shadow="never" class="placeholder-card">
            <div class="placeholder-content">
              <ul>
                <li>任务筛选</li>
                <li>快速操作</li>
                <li>统计信息</li>
              </ul>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import TodoItem from '@/views/home/components/TodoItem.vue'

export default {
  name: 'TodoPage',
  components: {
    TodoItem
  },
  data() {
    return {
      todoList: [
        {
          taskName: '完成项目评审报告',
          designatorName: '张经理',
          designatorAvatarSrc: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
          taskEndDate: '2023-12-15 18:00:00',
          taskDescription: '完成项目最终评审报告，包括所有功能模块的测试结果和验收标准'
        },
        {
          taskName: '用户反馈处理',
          designatorName: '李主管',
          designatorAvatarSrc: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
          taskEndDate: '2023-12-10 14:00:00',
          taskDescription: '整理并回复上周收集的用户反馈，优先级高的需要当天处理完毕'
        },
        {
          taskName: '系统维护升级',
          designatorName: '王技术',
          designatorAvatarSrc: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
          taskEndDate: '2023-12-20 23:00:00',
          taskDescription: '执行系统定期维护，升级到最新版本，预计需要2小时停机时间'
        },
        {
          taskName: '团队周会准备',
          designatorName: '赵总监',
          designatorAvatarSrc: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
          taskEndDate: '2023-12-08 10:00:00',
          taskDescription: '准备本周团队会议材料，包括项目进度、问题和下周计划'
        }
      ],
      totalTasks: 15,
      pageSize: 4,
      currentPage: 1
    }
  },
  methods: {
    handlePageChange(page) {
      this.currentPage = page
      // 这里实际项目中应该是调用API获取对应页的数据
      console.log('切换到页码:', page)
    }
  }
}
</script>

<style scoped>
.todo-page-container {
  padding: 20px;
  background-color: #f5f7fa;
  min-height: calc(100vh - 40px);
}

.todo-list-container {
  background: #fff;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
}

.todo-title {
  color: #303133;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ebeef5;
}

.todo-items-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
  margin-bottom: 20px;
}

.todo-item-card {
  transition: transform 0.3s;
}

.todo-item-card:hover {
  transform: translateY(-3px);
}

.todo-pagination {
  margin-top: 20px;
  text-align: center;
}

.right-side-placeholder {
  height: 100%;
}

.placeholder-card {
  border: none;
  height: 100%;
}

.placeholder-content {
  color: #909399;
  font-size: 14px;
  line-height: 1.8;
}

.placeholder-content ul {
  padding-left: 20px;
  margin: 10px 0;
}
</style>