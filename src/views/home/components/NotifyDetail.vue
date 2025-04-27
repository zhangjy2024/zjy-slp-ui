<template>
  <el-dialog
    :title="`通知详情 - ${formatMessageType(notification.type)}`"
    :visible.sync="dialogVisible"
    width="600px"
    :before-close="handleClose"
  >
    <!-- 通知内容区域 -->
    <div class="notification-content">
      <div class="notification-header">
        <el-avatar :size="40" :src="notification.senderAvatar || ''">
          {{ notification.senderName?.charAt(0) || '系' }}
        </el-avatar>
        <div class="sender-info">
          <p class="sender-name">发送人: {{ notification.senderName || '系统' }}</p>
          <p class="send-time">时间: {{ formatTime(notification.sendTime) }}</p>
        </div>
      </div>

      <div class="notification-body">
        <h3 class="notification-title">{{ notification.title }}</h3>
        <div class="notification-text">
          {{ notification.content }}
        </div>
      </div>
    </div>

    <!-- 按钮组区域 -->
    <div slot="footer" class="dialog-footer">
      <template v-if="!notification.confirmed">
        <el-button 
          type="danger" 
          icon="el-icon-delete" 
          @click="handleConfirm(true)"
        >
          确认收到并清除
        </el-button>
        <el-button 
          type="success" 
          icon="el-icon-check" 
          @click="handleConfirm(false)"
        >
          确认收到
        </el-button>
      </template>
      <el-button 
        v-else 
        type="danger" 
        icon="el-icon-delete" 
        @click="handleClear"
      >
        清除通知
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'NotifyDetail',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    notification: {
      type: Object,
      default: () => ({
        id: '',
        type: 'system', // system | org | square
        senderName: '',
        senderAvatar: '',
        title: '',
        content: '',
        sendTime: new Date(),
        confirmed: false
      })
    }
  },
  data() {
    return {
      dialogVisible: this.visible
    }
  },
  watch: {
    visible(newVal) {
      this.dialogVisible = newVal
    }
  },
  methods: {
    // 格式化消息类型
    formatMessageType(type) {
      const typeMap = {
        system: '系统通知',
        org: '组织通知',
        square: '广场通知'
      }
      return typeMap[type] || '未知类型'
    },
    
    // 格式化时间
    formatTime(time) {
      if (!time) return ''
      const date = new Date(time)
      return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
    },
    
    // 处理关闭
    handleClose(done) {
      this.$emit('update:visible', false)
      done()
    },
    
    // 确认通知
    handleConfirm(withClear) {
      this.$emit('confirm', this.notification.id, withClear)
      
    },
    
    // 清除通知
    handleClear() {
      this.$emit('clear', this.notification.id)
    }
  }
}
</script>

<style scoped>
.notification-content {
  padding: 0 20px;
}

.notification-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #ebeef5;
}

.sender-info {
  margin-left: 15px;
}

.sender-name {
  margin: 0;
  font-size: 16px;
  color: #303133;
}

.send-time {
  margin: 5px 0 0 0;
  font-size: 13px;
  color: #909399;
}

.notification-title {
  margin: 0 0 15px 0;
  color: #303133;
  font-size: 18px;
}

.notification-text {
  color: #606266;
  font-size: 14px;
  line-height: 1.6;
  white-space: pre-line;
}

.dialog-footer {
  text-align: right;
}

.dialog-footer .el-button {
  margin-left: 10px;
}
</style>