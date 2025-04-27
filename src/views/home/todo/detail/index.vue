<template>
  <div class="task-detail-container">
    <el-card shadow="hover" class="task-detail-card">
      <!-- 头部区域 -->
      <div class="task-header">
        <h1 class="task-title">{{ task.taskName }}</h1>
        <el-tag type="info" class="org-tag">{{ task.orgName }}</el-tag>
      </div>

      <!-- 基本信息区域 -->
      <div class="task-meta">
        <div class="assigner-info">
          <el-avatar :size="60" :src="task.designatorAvatarSrc"></el-avatar>
          <div class="assigner-details">
            <p class="meta-label">指派人</p>
            <p class="meta-value">{{ task.designatorName }}</p>
          </div>
        </div>
        
        <div class="deadline-info">
          <p class="meta-label">截止时间</p>
          <p class="meta-value">
            <i class="el-icon-time"></i>
            {{ formatDateTime(task.taskEndDate) }}
          </p>
          <el-progress 
            :percentage="calculateTimeProgress(task.taskEndDate)" 
            :color="progressColor"
            :show-text="false"
            class="time-progress"
          ></el-progress>
        </div>
      </div>

      <!-- 任务目标区域 -->
      <div class="task-section">
        <h3 class="section-title">任务目标</h3>
        <div class="section-content">
          {{ task.taskObjective || '暂无具体目标描述' }}
        </div>
      </div>

      <!-- 任务详情区域 -->
      <div class="task-section">
        <h3 class="section-title">任务详情</h3>
        <div class="section-content">
          {{ task.taskDescription }}
        </div>
      </div>

      <!-- 操作按钮区域 -->
      <div class="task-actions">
        <el-button 
          type="primary" 
          icon="el-icon-check" 
          @click="handleComplete"
          :loading="completing"
        >
          确认完成
        </el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'TaskDetail',
  data() {
    return {
      completing: false,
      task: {
        id: '',
        taskName: '完成项目需求文档编写',
        orgName: '产品研发部',
        designatorName: '张经理',
        designatorAvatarSrc: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
        taskEndDate: '2023-12-31 18:00:00',
        taskObjective: '完成项目需求文档的终版，包括所有功能模块的详细描述和验收标准',
        taskDescription: '1. 整理前期会议记录中的需求点\n2. 与各模块负责人确认功能细节\n3. 编写详细的功能需求文档\n4. 制定验收标准和测试用例\n5. 提交给产品总监审核'
      }
    }
  },
  computed: {
    progressColor() {
      const percentage = this.calculateTimeProgress(this.task.taskEndDate)
      if (percentage > 75) return '#F56C6C'
      if (percentage > 50) return '#E6A23C'
      return '#67C23A'
    }
  },
  methods: {
    formatDateTime(datetime) {
      if (!datetime) return '未设置截止时间'
      return datetime.replace(' ', ' · ')
    },
    calculateTimeProgress(endDate) {
      if (!endDate) return 0
      const now = new Date()
      const end = new Date(endDate)
      const start = new Date(end.getTime() - 7 * 24 * 60 * 60 * 1000) // 假设任务开始于截止前7天
      
      if (now >= end) return 100
      if (now <= start) return 0
      
      const total = end - start
      const passed = now - start
      return Math.round((passed / total) * 100)
    },
    handleComplete() {
      this.completing = true
      // 模拟API调用
      setTimeout(() => {
        this.$message.success('任务已完成!')
        this.completing = false
        // 这里可以添加跳转逻辑
      }, 1000)
    },
    handleDelete() {
      this.$confirm('确定要删除此任务吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message.success('任务已删除')
        // 这里可以添加跳转逻辑
      })
    }
  },
  mounted() {
    this.id = this.$route.query.id
    console.log(this.id)
  }
}
</script>

<style scoped>
.task-detail-container {
  padding-top: 20px;
  max-width: 900px;
  margin: 0 auto;
}

.task-detail-card {
  border-radius: 8px;
  padding: 30px;
}

.task-header {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  border-bottom: 1px solid #ebeef5;
  padding-bottom: 20px;
}

.task-title {
  margin: 0;
  font-size: 24px;
  color: #303133;
}

.org-tag {
  margin-left: 15px;
  height: 28px;
  line-height: 26px;
}

.task-meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 6px;
}

.assigner-info {
  display: flex;
  align-items: center;
}

.assigner-details {
  margin-left: 15px;
}

.deadline-info {
  text-align: right;
}

.meta-label {
  margin: 0 0 5px 0;
  font-size: 14px;
  color: #909399;
}

.meta-value {
  margin: 0;
  font-size: 16px;
  color: #606266;
  display: flex;
  align-items: center;
}

.meta-value i {
  margin-right: 5px;
}

.time-progress {
  margin-top: 10px;
  width: 200px;
}

.task-section {
  margin-bottom: 30px;
}

.section-title {
  color: #303133;
  font-size: 18px;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px dashed #ebeef5;
}

.section-content {
  color: #606266;
  font-size: 15px;
  line-height: 1.8;
  white-space: pre-line;
}

.task-actions {
  margin-top: 40px;
  text-align: center;
}

.task-actions .el-button {
  margin: 0 10px;
  min-width: 120px;
}
</style>