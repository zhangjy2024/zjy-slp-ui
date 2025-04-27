<template>
  <div class="org-notification-container">
    <!-- 头部区域 -->
    <div class="notification-header">
      <el-page-header @back="goBack" content="组织通知" style="width: 100%; height: 60px; background-color: white;"></el-page-header>
      <el-button 
        type="primary" 
        icon="el-icon-plus" 
        @click.native="notifyDialogVisible = true"
      >
        发布通知
      </el-button>
    </div>

    <!-- 通知列表 -->
    <div class="notification-list">
      <template v-if="notifications.length > 0">
        <GroupNotify
          v-for="(item, index) in notifications"
          :key="index"
          :group-notify="item"
          @click.native="showNotifyDetail(item)"
        />
      </template>
      <el-empty v-else description="暂无组织通知"></el-empty>
    </div>

    <!-- 分页 -->
    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="pageSize"
        :current-page="currentPage"
        @current-change="handlePageChange"
      />
    </div>

    <!-- 发布通知对话框 -->
    <publish-notify
      :notifyDialogVisible.sync="notifyDialogVisible"
    ></publish-notify>

    <!-- 通知详情 -->
    <notify-detail
      :visible.sync="dialogVisible"
      :notification="currentNotification"
      @confirm="handleNotificationConfirm"
      @clear="handleNotificationClear"
    ></notify-detail>
  </div>
</template>

<script>
import GroupNotify from '../components/GroupNotify.vue'
import PublishNotify from './PublishNotify.vue';
import NotifyDetail from '@/views/home/components/NotifyDetail.vue';

export default {
  name: 'OrgNotify',
  components: {
    GroupNotify, PublishNotify, NotifyDetail
  },
  data() {
    return {
      notifications: [
        {
          id: 1,
          title: '关于下周项目评审的通知',
          text: '请各位团队成员准备好项目进展报告，下周一上午10点在会议室进行项目中期评审',
          fromUserAvatarSrc: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
          createTime: '2023-06-15 14:30:00'
        },
        {
          id: 2,
          title: '系统维护通知',
          text: '系统将于今晚23:00至次日2:00进行维护升级，期间将无法使用',
          fromUserAvatarSrc: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
          createTime: '2023-06-14 09:15:00'
        }
      ],
      total: 20,
      pageSize: 10,
      currentPage: 1,
      publishDialogVisible: false,
      publishing: false,
      publishForm: {
        title: '',
        content: '',
        sendToAll: true,
        selectedMembers: []
      },
      
      notifyDialogVisible: false,
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
    goBack() {
      this.$router.go(-1);
    },
    showPublishDialog() {
      this.publishForm = {
        title: '',
        content: '',
        sendToAll: true,
        selectedMembers: []
      }
      this.publishDialogVisible = true
      this.$nextTick(() => {
        this.$refs.publishForm?.clearValidate()
      })
    },
    
    handlePageChange(page) {
      this.currentPage = page
      // 这里实际项目中应该是调用API获取对应页的数据
      console.log('切换到页码:', page)
    },

    showNotifyDetail(item) {
      this.dialogVisible = true;
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
  }
}
</script>

<style scoped>
::v-deep .el-page-header__title,::v-deep .el-page-header__content {
  display: flex;
  align-items: center;
}
::v-deep .el-page-header__left {
  padding-left: 15px;
}

.org-notification-container {
  padding: 0px 20px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
}

.notification-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.notification-list {
  min-height: 300px;
}

.pagination {
  margin-top: 20px;
  text-align: center;
}

.member-selector {
  margin-top: 15px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  padding: 10px;
}

/* 调整穿梭框样式 */
::v-deep .el-transfer-panel {
  width: 300px;
  height: 400px;
}

::v-deep .el-transfer-panel__body {
  height: calc(100% - 40px);
}

::v-deep .el-transfer-panel__list {
  height: 100%;
}
</style>