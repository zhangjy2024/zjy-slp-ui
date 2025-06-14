<template>
  <div class="task-list-container">
    <el-page-header @back="goBack" content="组织任务" style="width: 100%; height: 60px; background-color: white;"></el-page-header>
    <!-- 筛选和排序区域 -->
    <div class="filter-bar">
      <el-form :inline="true" :model="filterForm" class="filter-form">
        <el-form-item label="处理人">
          <el-select
            v-model="filterForm.processor"
            placeholder="请选择处理人"
            clearable
            filterable
          >
            <el-option
              v-for="member in memberList"
              :key="member.id"
              :label="member.name"
              :value="member.id"
            >
              <div style="display: flex; align-items: center;">
                <el-avatar :size="24" :src="member.avatar" style="margin-right: 8px;"></el-avatar>
                <span>{{ member.name }}</span>
              </div>
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="指派人">
          <el-select
            v-model="filterForm.designator"
            placeholder="请选择指派人"
            clearable
            filterable
          >
            <el-option
              v-for="member in memberList"
              :key="member.id"
              :label="member.name"
              :value="member.id"
            >
              <div style="display: flex; align-items: center;">
                <el-avatar :size="24" :src="member.avatar" style="margin-right: 8px;"></el-avatar>
                <span>{{ member.name }}</span>
              </div>
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态">
          <el-select
            v-model="filterForm.status"
            placeholder="请选择状态"
            clearable
          >
            <el-option label="进行中" value="processing"></el-option>
            <el-option label="已完成" value="completed"></el-option>
            <el-option label="已结束" value="ended"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="handleFilter">筛选</el-button>
          <el-button @click="resetFilter">重置</el-button>
        </el-form-item>

        <el-form-item label="排序" style="margin-left: 40px;">
          <el-radio-group v-model="sortOrder" @change="handleSortChange">
            <el-radio-button label="asc">按结束时间升序</el-radio-button>
            <el-radio-button label="desc">按结束时间降序</el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-button 
          type="primary" 
          @click="handlePublish"
          :loading="publishing"
          style="margin-top: -20px; margin-left: 20px;"
        >
          发布任务
        </el-button>
      </el-form>
    </div>

    <!-- 任务列表 -->
    <div class="task-list">
      <el-card
        v-for="task in filteredTasks"
        :key="task.id"
        class="task-item"
        shadow="hover"
        @click.native="showTaskDetail(task)"
      >
        <div class="task-header">
          <div class="task-title">
            <h3>{{ task.name }}</h3>
            <el-tag :type="getStatusTagType(task.status)" size="small">
              {{ getStatusText(task.status) }}
            </el-tag>
          </div>
          <div class="task-meta">
            <span class="deadline">
              <i class="el-icon-time"></i>
              截止: {{ formatDate(task.endTime) }}
            </span>
          </div>
        </div>

        <div class="task-content">
          <div class="task-assign">
            <div class="assign-info">
              <el-avatar :size="40" :src="task.designator.avatar"></el-avatar>
              <div class="assign-detail">
                <p class="assign-role">指派人</p>
                <p class="assign-name">{{ task.designator.name }}</p>
              </div>
            </div>
            <div class="assign-info">
              <el-avatar :size="40" :src="task.processor.avatar"></el-avatar>
              <div class="assign-detail">
                <p class="assign-role">处理人</p>
                <p class="assign-name">{{ task.processor.name }}</p>
              </div>
            </div>
          </div>

          <div class="task-description">
            <p>{{ task.description }}</p>
          </div>
        </div>
      </el-card>

      <el-empty v-if="filteredTasks.length === 0" description="暂无任务"></el-empty>
    </div>

    <group-task-detail :taskDialogVisible.sync="detailVisible" :taskDetail="taskDetail"></group-task-detail>

    <el-dialog
      title="发布任务"
      :visible.sync="publishVisible"
      width="700px"
      :close-on-click-modal="false"
    >
      <div class="task-detail-content">
        <!-- 基本信息区 -->
        <div class="task-meta">
          <div class="assigner-info">
            <el-avatar :size="60" :src="taskDetail.designator.avatar"></el-avatar>
            <div class="meta-text">
              <p class="meta-label">指派人</p>
              <p class="meta-value">{{ "管理员姓名" }}</p>
            </div>
          </div>
          
          <div class="processor-info">
            <div class="meta-text">
              <p class="meta-label">处理人</p>
              <el-select
                v-model="taskDetail.processor.name"
                placeholder="请选择处理人"
                clearable
                filterable
              >
                <el-option
                  v-for="member in memberList"
                  :key="member.id"
                  :label="member.name"
                  :value="member.id"
                >
                  <div style="display: flex; align-items: center;">
                    <el-avatar :size="24" :src="member.avatar" style="margin-right: 8px;"></el-avatar>
                    <span>{{ member.name }}</span>
                  </div>
                </el-option>
              </el-select>
            </div>
          </div>
          
          <div class="deadline-info">
            <div class="meta-text">
              <p class="meta-label">
                结束时间
                <el-date-picker
                  v-model="taskDetail.endTime"
                  type="date"
                  placeholder="选择日期"
                  :picker-options="pickerOptions"
                  style="margin-left: 20px;">
                </el-date-picker>
              </p>
            </div>
          </div>
        </div>

        <!-- 任务内容区 -->
        <div class="task-body">
          <div class="task-section">
            <h3 class="section-title">任务名称</h3>
            <div class="section-content">
              <el-input type="text" ></el-input>
            </div>
          </div>

          <div class="task-section">
            <h3 class="section-title">任务目标</h3>
            <div class="section-content">
              <el-input type="text" ></el-input>
            </div>
          </div>
          
          <div class="task-section">
            <h3 class="section-title">任务描述</h3>
            <div class="section-content">
              <el-input type="textarea" :rows="6"></el-input>
            </div>
          </div>
        </div>
      </div>

      <!-- 操作按钮区 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="publishVisible = false">关闭</el-button>
        <el-button
          v-if="taskDetail.status === 'processing'"
          type="primary"
          @click=""
          :loading="publishing"
        >
          <i class="el-icon-check"></i> 发布
        </el-button>
      </div>
    </el-dialog>

    <!-- 分页 -->
    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="totalTasks"
        :page-size="pageSize"
        :current-page="currentPage"
        @current-change="handlePageChange"
      />
    </div>
  </div>
</template>

<script>
import GroupTaskDetail from './GroupTaskDetail.vue';

export default {
  name: 'OrgTaskList',
  components: {
    GroupTaskDetail
  },
  data() {
    return {
      filterForm: {
        processor: '',
        designator: '',
        status: ''
      },
      sortOrder: 'asc',
      currentPage: 1,
      pageSize: 10,
      totalTasks: 0,
      publishing: false,
      memberList: [
        {
          id: 1,
          name: '张三',
          avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
        },
        {
          id: 2,
          name: '李四',
          avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
        },
        {
          id: 3,
          name: '王五',
          avatar: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'
        }
      ],
      taskList: [
        {
          id: 1,
          name: '完成项目需求文档',
          description: '完成项目的前期需求调研和文档编写工作，包括功能清单和原型设计',
          status: 'processing',
          endTime: '2023-12-31 18:00:00',
          designator: {
            id: 1,
            name: '张三',
            avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
          },
          processor: {
            id: 2,
            name: '李四',
            avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
          }
        },
        {
          id: 2,
          name: '用户反馈处理',
          description: '处理上周收集的用户反馈，分类整理并分配给相应团队',
          status: 'completed',
          endTime: '2023-12-15 14:00:00',
          designator: {
            id: 3,
            name: '王五',
            avatar: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'
          },
          processor: {
            id: 1,
            name: '张三',
            avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
          }
        },
        {
          id: 3,
          name: '系统维护升级',
          description: '执行系统定期维护，升级到最新版本，预计需要2小时停机时间',
          status: 'ended',
          endTime: '2023-12-10 23:00:00',
          designator: {
            id: 2,
            name: '李四',
            avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
          },
          processor: {
            id: 3,
            name: '王五',
            avatar: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'
          }
        }
      ],
      detailVisible: false,
      completing: false,
      taskDetail: {
        id: '',
        name: '',
        designator: {
          name: '',
          avatar: ''
        },
        processor: {
          name: ''
        },
        endTime: '',
        status: 'processing', // processing/completed/ended
        objective: '',
        description: ''
      },
      publishVisible: false,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      },
    }
  },
  computed: {
    filteredTasks() {
      let tasks = [...this.taskList]
      
      // 筛选处理
      if (this.filterForm.processor) {
        tasks = tasks.filter(task => task.processor.id === this.filterForm.processor)
      }
      if (this.filterForm.designator) {
        tasks = tasks.filter(task => task.designator.id === this.filterForm.designator)
      }
      if (this.filterForm.status) {
        tasks = tasks.filter(task => task.status === this.filterForm.status)
      }
      
      // 排序处理
      tasks.sort((a, b) => {
        const timeA = new Date(a.endTime).getTime()
        const timeB = new Date(b.endTime).getTime()
        return this.sortOrder === 'asc' ? timeA - timeB : timeB - timeA
      })
      
      // 分页处理
      this.totalTasks = tasks.length
      const start = (this.currentPage - 1) * this.pageSize
      const end = start + this.pageSize
      return tasks.slice(start, end)
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    handleFilter() {
      this.currentPage = 1
      // 实际项目中这里应该是调用API获取筛选后的数据
    },
    resetFilter() {
      this.filterForm = {
        processor: '',
        designator: '',
        status: ''
      }
      this.currentPage = 1
      // 实际项目中这里应该是调用API重置筛选
    },
    handleSortChange() {
      // 排序变化时重新排序
    },
    handlePageChange(page) {
      this.currentPage = page
      // 实际项目中这里应该是调用API获取对应页的数据
    },
    formatDate(dateStr) {
      if (!dateStr) return ''
      const date = new Date(dateStr)
      return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
    },
    getStatusText(status) {
      const statusMap = {
        processing: '进行中',
        completed: '已完成',
        ended: '已结束'
      }
      return statusMap[status] || '未知状态'
    },
    getStatusTagType(status) {
      const typeMap = {
        processing: 'primary',
        completed: 'success',
        ended: 'info'
      }
      return typeMap[status] || ''
    },
    // 显示任务详情
    showTaskDetail(task) {
      this.taskDetail = {
        id: task.id,
        name: task.name,
        designator: {
          name: task.designator.name,
          avatar: task.designator.avatar
        },
        processor: {
          name: task.processor.name
        },
        endTime: task.endTime,
        status: task.status,
        objective: task.objective,
        description: task.description
      }
      this.detailVisible = true
    },
    
    // 格式化时间
    formatDateTime(datetime) {
      if (!datetime) return '未设置'
      const date = new Date(datetime)
      return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
    },
    
    // 获取状态文本
    getStatusText(status) {
      const statusMap = {
        processing: '进行中',
        completed: '已完成',
        ended: '已结束'
      }
      return statusMap[status] || '未知状态'
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
          this.$emit('task-completed', this.taskDetail.id)
        }, 800)
      }).catch(() => {
        this.completing = false
      })
    },

    handlePublish() {
      this.publishVisible = true;
    }
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

::v-depp .el-card{
  padding: 10px;
}

::v-deep .el-page-header__title,::v-deep .el-page-header__content {
  display: flex;
  align-items: center;
}
::v-deep .el-page-header__left {
  padding-left: 15px;
}

.task-list-container {
  padding: 0px 20px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
}

.filter-bar {
  margin-bottom: 20px;
}

.filter-form {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.task-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 16px;
  margin-bottom: 20px;
}

.task-item {
  margin-bottom: 16px;
  transition: all 0.3s;
}

.task-item:hover {
  transform: translateY(-3px);
}

.task-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid #ebeef5;
}

.task-title {
  display: flex;
  align-items: center;
}

.task-title h3 {
  margin: 0;
  margin-right: 10px;
  font-size: 16px;
}

.task-meta {
  color: #909399;
  font-size: 13px;
}

.task-content {
  display: flex;
}

.task-assign {
  width: 200px;
  padding-right: 20px;
  border-right: 1px dashed #ebeef5;
}

.task-description {
  flex: 1;
  padding-left: 20px;
  color: #606266;
  font-size: 14px;
  line-height: 1.6;
}

.assign-info {
  display: flex;
  margin-bottom: 15px;
}

.assign-info:last-child {
  margin-bottom: 0;
}

.assign-detail {
  margin-left: 10px;
}

.assign-role {
  margin: 0;
  font-size: 12px;
  color: #909399;
}

.assign-name {
  margin: 0;
  font-size: 14px;
  color: #303133;
}

.pagination {
  margin-top: 20px;
  text-align: center;
}
</style>