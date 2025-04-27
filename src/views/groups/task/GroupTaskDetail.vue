<template>
  <el-dialog
    :title="`任务详情 - ${taskDetail.name}`"
    :visible="detailVisible"
    width="700px"
    :close-on-click-modal="false"
    @close="handleClose"
  >
    <div class="task-detail-content">
      <!-- 基本信息区 -->
      <div class="task-meta">
        <div class="assigner-info">
          <el-avatar :size="60" :src="taskDetail.designator.avatar"></el-avatar>
          <div class="meta-text">
            <p class="meta-label">指派人</p>
            <p class="meta-value">{{ taskDetail.designator.name }}</p>
          </div>
        </div>
        
        <div class="processor-info">
          <div class="meta-text">
            <p class="meta-label">处理人</p>
            <p class="meta-value">{{ taskDetail.processor.name }}</p>
          </div>
        </div>
        
        <div class="deadline-info">
          <div class="meta-text">
            <p class="meta-label">结束时间</p>
            <p class="meta-value">
              <i class="el-icon-time"></i>
              {{ formatDateTime(taskDetail.endTime) }}
            </p>
          </div>
        </div>
        
        <div class="status-info">
          <div class="meta-text">
            <p class="meta-label">任务状态</p>
            <p class="meta-value">
              <el-tag :type="getStatusTagType(taskDetail.status)">
                {{ getStatusText(taskDetail.status) }}
              </el-tag>
            </p>
          </div>
        </div>
      </div>

      <!-- 任务内容区 -->
      <div class="task-body">
        <div class="task-section">
          <h3 class="section-title">任务目标</h3>
          <div class="section-content">
            {{ taskDetail.objective || '暂无任务目标描述' }}
          </div>
        </div>
        
        <div class="task-section">
          <h3 class="section-title">任务描述</h3>
          <div class="section-content">
            {{ taskDetail.description }}
          </div>
        </div>
      </div>
    </div>

    <!-- 操作按钮区 -->
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose">关闭</el-button>
      <el-button
        v-if="taskDetail.status === 'processing'"
        type="primary"
        @click="handleCompleteTask"
        :loading="completing"
      >
        <i class="el-icon-check"></i> 标记为已完成
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'GroupTaskDetail',
  props: {
    taskDialogVisible: { type: Boolean, default: false },
    taskDetail: { type: Object }
  },
  computed: {
    detailVisible: {
      get() {
        return this.taskDialogVisible;
      }
    }
  },
  data() {
    return {
      completing: false,
    }
  },
  methods: {
    // 完成任务
    handleCompleteTask() {
      this.$confirm('确定要标记此任务为已完成吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.completing = true
        // 模拟API调用
        setTimeout(() => {
          this.taskDetail.status = 'completed'
          this.$message.success('任务状态已更新')
          this.completing = false
          this.$emit('update:taskDialogVisible', false);
        }, 800)
      }).catch(() => {
        this.completing = false
      })
    },
    // 格式化时间
    formatDateTime(datetime) {
      if (!datetime) return '未设置'
      const date = new Date(datetime)
      return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
    },
    // 获取状态标签类型
    getStatusTagType(status) {
      const typeMap = {
        processing: 'primary',
        completed: 'success',
        ended: 'info'
      }
      return typeMap[status]
    },
    getStatusText(status) {
      const statusMap = {
        processing: '进行中',
        completed: '已完成',
        ended: '已结束'
      }
      return statusMap[status] || '未知状态'
    },
    handleClose() {
      this.$emit('update:taskDialogVisible', false);
    },
  }
}
</script>

<style scoped>
.task-detail-content {
  padding: 0 20px;
}

.task-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #ebeef5;
}

.assigner-info,
.processor-info,
.deadline-info,
.status-info {
  display: flex;
  align-items: center;
}

.assigner-info {
  min-width: 200px;
}

.processor-info,
.deadline-info,
.status-info {
  min-width: 150px;
}

.meta-text {
  margin-left: 15px;
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

.task-body {
  margin-top: 20px;
}

.task-section {
  margin-bottom: 25px;
}

.section-title {
  color: #303133;
  font-size: 18px;
  margin-bottom: 15px;
  padding-bottom: 8px;
  border-bottom: 1px dashed #ebeef5;
}

.section-content {
  color: #606266;
  font-size: 15px;
  line-height: 1.8;
  white-space: pre-line;
}

.dialog-footer {
  text-align: right;
}

.dialog-footer .el-button {
  margin-left: 10px;
}
</style>